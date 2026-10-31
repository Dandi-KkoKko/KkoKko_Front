import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { screenPaddingX, spacing } from '@/constants/layout';
import { AiBadge } from '@/features/map/components/ai-badge';
import { CameraButton } from '@/features/map/components/map-action-buttons';
import { MapBottomSheet } from '@/features/map/components/map-bottom-sheet';
import { NavigationBanner } from '@/features/map/components/navigation-banner';
import { RecordList } from '@/features/map/components/record-list';
import { openRadiusMeters } from '@/features/map/constants/map-config';
import { useMyLocation } from '@/features/map/hooks/use-my-location';
import { useWalkNavigation } from '@/features/map/hooks/use-walk-navigation';
import { KakaoMapView } from '@/features/map/kakao-map/kakao-map-view';
import type { MapMarker } from '@/features/map/types/home-map-marker';
import { openRecord } from '@/features/map/utils/open-search-result';

/** 펼친 목록은 화면의 이만큼을 차지한다. */
const expandedSheetRatio = 0.4;
/** 접었을 때 남는 손잡이와 제목 높이 */
const collapsedSheetHeight = 84;
/** 위쪽 안내 띠 높이. 지도를 맞출 때 띠에 가리지 않게 비운다. */
const bannerHeight = 64;

function getBannerMessage(progress: ReturnType<typeof useWalkNavigation>['progress']) {
  if (!progress) return '경로를 찾는 중이에요';
  if (progress.hasArrived) return '목적지에 도착했어요';
  return `${progress.isHeadingToDestination ? '목적지' : '다음 자리'}까지 ${progress.minutesToTarget}분`;
}

/**
 * Figma '지도 길안내 UI'. '이 길로 걷기'를 누르면 온다.
 * 지도에는 걸어온 길(회색)과 남은 길(주황), 내 열림 반경, 목적지를 그리고,
 * 위쪽 띠에 다음 자리까지 남은 시간을, 아래 패널에 열림 반경 안의 기록('범위 내 기록들')을 보여준다.
 */
export function NavigationScreen() {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const { location } = useMyLocation();
  const navigation = useWalkNavigation(location);
  const [isSheetExpanded, setIsSheetExpanded] = useState(true);

  const sheetHeight = Math.round(windowHeight * expandedSheetRatio);
  const bottomInset = isSheetExpanded ? sheetHeight : collapsedSheetHeight;

  const markers = useMemo<MapMarker[]>(
    () =>
      navigation.destination
        ? [{ kind: 'pin', id: 'destination', coordinate: navigation.destination, label: navigation.destinationName }]
        : [],
    [navigation.destination, navigation.destinationName],
  );
  // 경로를 받으면 한 번 전체 경로가 보이게 맞춘다. 걷는 동안 계속 맞추면 지도를 둘러볼 수 없다.
  const focus = useMemo(
    () =>
      navigation.fullPath
        ? {
            coordinates: navigation.fullPath,
            padding: { top: bannerHeight + spacing.xl, right: spacing.xl, bottom: bottomInset + spacing.xl, left: spacing.xl },
          }
        : undefined,
    [navigation.fullPath, bottomInset],
  );

  return (
    <View style={styles.screen}>
      <KakaoMapView
        markers={markers}
        myLocation={location}
        openRadiusMeters={openRadiusMeters}
        focus={focus}
        routePath={navigation.progress?.remainingPath ?? navigation.fullPath}
        walkedPath={navigation.progress?.walkedPath ?? null}
        onMarkerPress={() => {}}
      />

      <View style={[styles.banner, { top: insets.top + spacing.xs }]}>
        <NavigationBanner message={getBannerMessage(navigation.progress)} onEnd={() => router.dismissTo('/map')} />
      </View>

      {/* Figma: 목록을 접으면 카메라 버튼이 목록 위에 나온다. */}
      {!isSheetExpanded && (
        <View style={[styles.camera, { bottom: collapsedSheetHeight + spacing.md }]}>
          <CameraButton />
        </View>
      )}

      <MapBottomSheet
        height={sheetHeight}
        isExpanded={isSheetExpanded}
        onExpandedChange={setIsSheetExpanded}
        label="범위 내 기록들"
        header={
          <View style={styles.titleRow}>
            <AppText variant="subtitle01">범위 내 기록들</AppText>
            <AiBadge label="AI 추천순" />
          </View>
        }>
        {navigation.recordsInRange.length > 0 ? (
          <RecordList records={navigation.recordsInRange} onPress={(record) => openRecord(record.id)} />
        ) : (
          <AppText variant="caption01" color="textTertiary" style={styles.empty}>
            지금 열림 반경 안에 남겨진 기록이 없어요
          </AppText>
        )}
      </MapBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  banner: {
    position: 'absolute',
    left: screenPaddingX,
    right: screenPaddingX,
  },
  camera: {
    position: 'absolute',
    right: screenPaddingX,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  empty: {
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
});
