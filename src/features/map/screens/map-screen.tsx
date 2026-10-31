import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { screenPaddingX, spacing } from '@/constants/layout';
import { AiBadge } from '@/features/map/components/ai-badge';
import { ExploreModeToggle } from '@/features/map/components/explore-mode-toggle';
import { ExploreSheet } from '@/features/map/components/explore-sheet';
import { LocationPermissionCard } from '@/features/map/components/location-permission-card';
import { MapActionButtons } from '@/features/map/components/map-action-buttons';
import { MapSearchBar } from '@/features/map/components/map-search-bar';
import { SelectedResultCard } from '@/features/map/components/selected-result-card';
import { openRadiusMeters } from '@/features/map/constants/map-config';
import { useHomeMapMarkers } from '@/features/map/hooks/use-home-map-markers';
import { useHomePlace } from '@/features/map/hooks/use-home-place';
import { useMyLocation } from '@/features/map/hooks/use-my-location';
import { usePlaceRoute } from '@/features/map/hooks/use-place-route';
import { useResultsMap, type ResultsMapView } from '@/features/map/hooks/use-results-map';
import { KakaoMapView } from '@/features/map/kakao-map/kakao-map-view';
import type { MapMarker } from '@/features/map/types/home-map-marker';
import { openNavigation, openRecord } from '@/features/map/utils/open-search-result';

/** 장소를 고르지 않았을 때 useResultsMap에 넘기는 빈 상태 */
const noPlaceView: ResultsMapView = { mode: 'list', items: [] };

function openMarker(marker: MapMarker) {
  if (marker.kind === 'cluster') router.push(`/map/cluster/${marker.id}`);
  else if (marker.kind === 'photo') openRecord(marker.id);
}

/**
 * Figma '지도 홈 화면 UI'. 카카오맵 위에 사진 마커, 검색창, 탐색 모드 스위치, 남기기 버튼을 올린다.
 * 탐색 모드를 켜면 내 위치 둘레에 열림 반경을 그리고, 아래 패널에서 가장 가까운 기록을 보여준다.
 * 해시태그 검색에서 장소를 넘겨받으면 그 장소 카드를 띄우고, 경로 추천을 받을 수 있다 (Figma '지도 해시태그 검색 시 경로 추천 UI').
 * 위치 권한이 없으면 지도 위에 권한 안내를 덮는다.
 */
export function MapScreen() {
  const insets = useSafeAreaInsets();
  const { isChecking, isGranted, location, request } = useMyLocation();
  const { markers, nearestPhoto } = useHomeMapMarkers(location);
  const [isExploring, setIsExploring] = useState(false);
  // 탐색 모드를 켜면 바로 가장 가까운 기록이 보이도록 펼친 상태로 시작한다.
  const [isSheetExpanded, setIsSheetExpanded] = useState(true);
  const [isBrowsing, setIsBrowsing] = useState(false);

  const { place, clearPlace } = useHomePlace(location);
  const placeRoute = usePlaceRoute(place, location);
  const [cardHeight, setCardHeight] = useState(0);
  const placeMap = useResultsMap(placeRoute.mapView ?? noPlaceView, cardHeight);
  // 홈 마커는 그대로 두고, 고른 장소의 핀을 위에 더한다.
  const mapMarkers = useMemo<MapMarker[]>(
    () => (place ? [...markers, ...placeMap.markers] : markers),
    [place, markers, placeMap.markers],
  );

  const showPermissionCard = !isChecking && !isGranted && !isBrowsing;
  const isRecordVisible = isExploring && isSheetExpanded;

  const changeExploring = (next: boolean) => {
    setIsExploring(next);
    if (next) setIsSheetExpanded(true);
  };

  /** 카드의 X: 경로를 보고 있으면 장소 카드로, 아니면 장소 고르기를 끝낸다. */
  const closePlaceCard = () => (placeRoute.routePlan ? placeRoute.closeRoute() : clearPlace());

  const walkThisRoute = () => {
    const plan = placeRoute.routePlan;
    if (!plan) return;
    openNavigation({
      destinationName: plan.destinationName,
      destination: plan.destination,
      stopIds: placeRoute.stops.map(({ id }) => id),
    });
  };

  return (
    <View style={styles.screen}>
      <KakaoMapView
        markers={mapMarkers}
        myLocation={location}
        openRadiusMeters={isExploring ? openRadiusMeters : null}
        focus={place ? placeMap.focus : undefined}
        routePath={placeMap.routePath}
        onMarkerPress={openMarker}
      />

      <View style={[styles.top, { paddingTop: insets.top + spacing.xs }]}>
        <MapSearchBar />
        <View style={styles.toggle}>
          <ExploreModeToggle value={isExploring} onChange={changeExploring} />
        </View>
        {placeRoute.routePlan && <AiBadge label="AI 추천 경로" />}
      </View>

      {placeRoute.card ? (
        <SelectedResultCard
          state={placeRoute.card}
          cardHeight={cardHeight}
          onLayout={({ nativeEvent }) => setCardHeight(Math.round(nativeEvent.layout.height))}
          onClose={closePlaceCard}
          onRecommend={placeRoute.recommendRoute}
          onRouteExpandedChange={placeRoute.setIsRouteExpanded}
          onWalk={walkThisRoute}
        />
      ) : (
        <View style={[styles.bottom, isExploring && styles.bottomWithSheet]}>
          <View style={styles.actions}>
            <MapActionButtons showCamera={!isRecordVisible} />
          </View>
          {isExploring && (
            <ExploreSheet
              nearestPhoto={nearestPhoto}
              isExpanded={isSheetExpanded}
              onExpandedChange={setIsSheetExpanded}
            />
          )}
        </View>
      )}

      {showPermissionCard && <LocationPermissionCard onRequest={request} onBrowse={() => setIsBrowsing(true)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  // 지도를 끌 수 있도록 검색창·버튼이 없는 빈 곳의 터치는 아래 지도로 넘긴다.
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: screenPaddingX,
    gap: spacing.sm,
    pointerEvents: 'box-none',
  },
  toggle: {
    alignSelf: 'flex-end',
  },
  bottom: {
    position: 'absolute',
    left: screenPaddingX,
    right: screenPaddingX,
    bottom: spacing.lg,
    gap: spacing.md,
    pointerEvents: 'box-none',
  },
  // Figma에서 패널은 탭 바 바로 위에 붙어 있다.
  bottomWithSheet: {
    bottom: spacing.xs,
  },
  actions: {
    alignSelf: 'flex-end',
  },
});
