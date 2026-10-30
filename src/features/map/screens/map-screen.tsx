import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { screenPaddingX, spacing } from '@/constants/layout';
import { ExploreModeToggle } from '@/features/map/components/explore-mode-toggle';
import { LocationPermissionCard } from '@/features/map/components/location-permission-card';
import { MapActionButtons } from '@/features/map/components/map-action-buttons';
import { MapSearchBar } from '@/features/map/components/map-search-bar';
import { useMyLocation } from '@/features/map/hooks/use-my-location';
import { usePreviewHomeMarkers } from '@/features/map/hooks/use-preview-home-markers';
import { KakaoMapView } from '@/features/map/kakao-map/kakao-map-view';
import type { HomeMapMarker } from '@/features/map/types/home-map-marker';

function openMarker(marker: HomeMapMarker) {
  if (marker.kind === 'cluster') router.push(`/map/cluster/${marker.id}`);
  else router.push(`/map/spot/${marker.id}`);
}

/**
 * Figma '지도 홈 화면 UI (비탐색 모드)'. 카카오맵 위에 사진 마커, 검색창, 탐색 모드 스위치, 남기기 버튼을 올린다.
 * 위치 권한이 없으면 지도 위에 권한 안내를 덮는다.
 */
export function MapScreen() {
  const insets = useSafeAreaInsets();
  const { isChecking, isGranted, location, request } = useMyLocation();
  const markers = usePreviewHomeMarkers(location);
  // 탐색 모드 화면(가장 가까운 기록 카드 등)은 다음 단계에서 붙인다. 지금은 스위치 상태만 가진다.
  const [isExploring, setIsExploring] = useState(false);
  const [isBrowsing, setIsBrowsing] = useState(false);

  const showPermissionCard = !isChecking && !isGranted && !isBrowsing;

  return (
    <View style={styles.screen}>
      <KakaoMapView markers={markers} myLocation={location} onMarkerPress={openMarker} />

      <View style={[styles.top, { paddingTop: insets.top + spacing.xs }]}>
        <MapSearchBar />
        <View style={styles.toggle}>
          <ExploreModeToggle value={isExploring} onChange={setIsExploring} />
        </View>
      </View>

      <View style={styles.bottom}>
        <MapActionButtons />
      </View>

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
    right: screenPaddingX,
    bottom: spacing.lg,
  },
});
