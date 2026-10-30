import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Badge } from '@/components/badge';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { spacing } from '@/constants/layout';
import type { ClusterSpot } from '@/features/map/constants/preview-cluster';

const columns = 3;

/** 묶음 안의 자리들을 세 칸 격자로. 대표 사진은 맛보기 배지, 나머지는 거리 표시. */
export function ClusterSpotGrid({ spots }: { spots: ClusterSpot[] }) {
  return (
    <View style={styles.grid}>
      {spots.map((spot) => (
        <Pressable key={spot.spotId} style={styles.item} onPress={() => router.push(`/map/spot/${spot.spotId}`)}>
          <PhotoPlaceholder width="100%" height={110} highlighted={spot.isRepresentative}>
            <View style={styles.overlay}>
              {spot.isRepresentative ? (
                <Badge label="대표 · 맛보기" tone="highlight" />
              ) : (
                <Badge label={`${spot.distanceMeters}m`} style={styles.distance} />
              )}
            </View>
          </PhotoPlaceholder>
          <AppText variant="caption04">{spot.hashtag}</AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: spacing.md,
    columnGap: spacing.xs,
  },
  // 세 칸 사이 간격 두 개(폰 너비의 약 6%)를 뺀 너비를 셋으로 나눈다
  item: {
    width: `${(100 - 6) / columns}%`,
    gap: spacing.xxs,
  },
  overlay: {
    flex: 1,
    padding: spacing.xxs,
  },
  distance: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
  },
});
