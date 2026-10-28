import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { Chip } from '@/components/chip';
import { IconButton } from '@/components/icon-button';
import { MapPlaceholder } from '@/components/map-placeholder';
import { screenPaddingX, spacing } from '@/constants/layout';
import { BottomPanel } from '@/features/map/components/bottom-panel';
import { ClusterSpotGrid } from '@/features/map/components/cluster-spot-grid';
import { ClusterMarker } from '@/features/map/components/map-markers';
import { previewCluster } from '@/features/map/constants/preview-cluster';

type SortOrder = 'preference' | 'distance';

/**
 * 와이어프레임 ①-A: 묶음 마커를 누르면 그 묶음의 자리들을 격자로 보여준다.
 * '내 취향 순'은 AI 취향 분석이 붙으면 서버가 정렬해 준다. 지금은 받은 순서 그대로다.
 */
export function ClusterScreen() {
  const insets = useSafeAreaInsets();
  const [sortOrder, setSortOrder] = useState<SortOrder>('preference');
  const cluster = previewCluster;

  const spots = useMemo(
    () =>
      sortOrder === 'distance'
        ? [...cluster.spots].sort((a, b) => a.distanceMeters - b.distanceMeters)
        : cluster.spots,
    [cluster.spots, sortOrder],
  );

  return (
    <View style={styles.screen}>
      <MapPlaceholder>
        <ClusterMarker top={70} left="62%" selected />
      </MapPlaceholder>

      <View style={[styles.top, { paddingTop: insets.top + spacing.xs }]}>
        <IconButton icon="back" accessibilityLabel="뒤로" onPress={() => router.back()} />
      </View>

      <BottomPanel height="74%">
        <View style={styles.titleRow}>
          <AppText variant="heading03">이 묶음의 자리 {cluster.spots.length}개</AppText>
          <AppText variant="caption02" color="textTertiary">
            {cluster.areaLabel} · 약 {cluster.distanceMeters}m
          </AppText>
        </View>
        <View style={styles.sortRow}>
          <Chip label="내 취향 순" selected={sortOrder === 'preference'} onPress={() => setSortOrder('preference')} />
          <Chip label="가까운 순" selected={sortOrder === 'distance'} onPress={() => setSortOrder('distance')} />
        </View>
        <ScrollView contentContainerStyle={styles.gridContent}>
          <ClusterSpotGrid spots={spots} />
        </ScrollView>
      </BottomPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: screenPaddingX,
    alignItems: 'flex-start',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sortRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  gridContent: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.xl,
  },
});
