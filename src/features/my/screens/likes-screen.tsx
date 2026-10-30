import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { AreaMapView } from '@/components/area-map-view';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { SegmentedToggle } from '@/components/segmented-toggle';
import { spacing } from '@/constants/layout';
import { mockLikedAreas, mockLikedSpots, mockMyStats } from '@/mock/my-activity';

const viewModes = ['리스트', '지도'] as const;
type ViewMode = (typeof viewModes)[number];

/** 와이어프레임 ③ 마이 탭: 좋아요 내역. 좋아요는 공개 경쟁이 없어서 나만 볼 수 있다. */
export function LikesScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('리스트');
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);

  return (
    <ScreenContainer
      withBottomInset={false}
      header={
        <ScreenHeader
          title="좋아요 내역"
          right={<SegmentedToggle options={viewModes} selected={viewMode} onSelect={setViewMode} />}
        />
      }>
      <AppText variant="caption04" color="textTertiary" style={styles.caption}>
        내가 좋아요한 자리는 나만 볼 수 있어요 · {mockMyStats.likedCount}곳
      </AppText>

      {viewMode === '리스트' ? (
        <View style={styles.grid}>
          {mockLikedSpots.map((spot) => (
            <Pressable key={spot.spotId} style={styles.gridItem} onPress={() => router.push(`/map/opened/${spot.spotId}`)}>
              <PhotoPlaceholder width="100%" height={210} />
              <AppText variant="subtitle04">{spot.hashtags.join(' ')}</AppText>
              <AppText variant="caption04" color="textTertiary">
                {spot.placeLabel}
              </AppText>
            </Pressable>
          ))}
        </View>
      ) : (
        <AreaMapView areas={mockLikedAreas} selectedAreaId={selectedAreaId} onSelectArea={setSelectedAreaId} />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  caption: {
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: spacing.lg,
    columnGap: spacing.sm,
  },
  // 간격 때문에 50%는 한 줄에 두 개가 안 들어가서 48%로 잡고 남는 폭은 flexGrow로 채운다
  gridItem: {
    width: '48%',
    flexGrow: 1,
    gap: spacing.xxs,
  },
});
