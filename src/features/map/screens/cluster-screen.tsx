import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { IconButton } from '@/components/icon-button';
import { screenPaddingX, spacing } from '@/constants/layout';
import { AiBadge } from '@/features/map/components/ai-badge';
import { ClusterRecordList } from '@/features/map/components/cluster-record-list';
import { MapBottomSheet } from '@/features/map/components/map-bottom-sheet';
import { getPreviewClusterRecords } from '@/features/map/constants/preview-cluster';
import { useHomeMapMarkers } from '@/features/map/hooks/use-home-map-markers';
import { useMyLocation } from '@/features/map/hooks/use-my-location';
import { KakaoMapView } from '@/features/map/kakao-map/kakao-map-view';
import type { HomeMapMarker } from '@/features/map/types/home-map-marker';
import { openRecord } from '@/features/map/utils/open-search-result';

/** Figma에서 위쪽 지도는 화면의 약 3분의 1이고, 나머지를 기록 목록이 차지한다. */
const expandedSheetRatio = 0.62;
/** 접었을 때 남는 손잡이와 제목 높이 */
const collapsedSheetHeight = 84;

/**
 * Figma '지도 묶음 기록 표시 UI'. 지도 홈에서 사진 묶음을 누르면 온다.
 * 위쪽 지도에는 고른 묶음을 주황 원으로 표시하고, 아래 패널에 묶음 안의 기록을 AI 추천순으로 보여준다.
 */
export function ClusterScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const { location } = useMyLocation();
  // 지도 홈과 같은 마커에서 묶음을 찾아야 홈에서 누른 자리와 같은 곳이 보인다.
  const { markers } = useHomeMapMarkers(location);
  const [isSheetExpanded, setIsSheetExpanded] = useState(true);

  const records = getPreviewClusterRecords(id);
  const cluster = markers.find((marker) => marker.kind === 'cluster' && marker.id === id);
  const sheetHeight = Math.round(windowHeight * expandedSheetRatio);

  const mapMarkers = useMemo<HomeMapMarker[]>(() => (cluster ? [{ ...cluster, isSelected: true }] : []), [cluster]);
  const focus = useMemo(
    () => ({
      coordinates: cluster ? [cluster.coordinate] : [],
      padding: { top: 0, right: 0, bottom: isSheetExpanded ? sheetHeight : collapsedSheetHeight, left: 0 },
    }),
    [cluster, isSheetExpanded, sheetHeight],
  );

  return (
    <View style={styles.screen}>
      <KakaoMapView markers={mapMarkers} myLocation={location} focus={focus} onMarkerPress={() => setIsSheetExpanded(true)} />

      <View style={[styles.back, { top: insets.top + spacing.xs }]}>
        <IconButton icon="back" accessibilityLabel="뒤로" size={48} onPress={() => router.back()} />
      </View>

      <MapBottomSheet
        height={sheetHeight}
        isExpanded={isSheetExpanded}
        onExpandedChange={setIsSheetExpanded}
        label="묶음 기록"
        header={
          <View style={styles.titleRow}>
            <AppText variant="subtitle01">이 묶음의 기록 {records.length}개</AppText>
            {/* AI 취향 정렬은 서버가 맡는다. 받은 순서가 곧 추천순이라 고르는 버튼 없이 표시만 한다. */}
            <AiBadge label="AI 추천순" />
          </View>
        }>
        {records.length > 0 ? (
          <ClusterRecordList records={records} onPress={(record) => openRecord(record.id)} />
        ) : (
          <AppText variant="caption01" color="textTertiary" style={styles.empty}>
            이 묶음의 기록을 찾지 못했어요
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
  back: {
    position: 'absolute',
    left: screenPaddingX,
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
