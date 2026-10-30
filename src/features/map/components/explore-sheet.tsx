import { router } from 'expo-router';
import { useMemo } from 'react';
import { PanResponder, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { colors } from '@/constants/colors';
import { floatingShadow, radius, spacing } from '@/constants/layout';
import type { PhotoMarker } from '@/features/map/types/home-map-marker';

type ExploreSheetProps = {
  nearestPhoto: PhotoMarker | null;
  isExpanded: boolean;
  onExpandedChange: (isExpanded: boolean) => void;
};

/** 손가락을 이만큼(px) 밀어야 펼치기·접기로 본다. 살짝 건드린 것까지 잡으면 지도를 끌다가 패널이 움직인다. */
const swipeThreshold = 24;

/**
 * 탐색 모드의 아래 패널. Figma '가장 가까운 기록 표시 / 미표시' 두 상태다.
 * 손잡이를 누르거나 위아래로 밀어서 펼치고 접는다.
 */
export function ExploreSheet({ nearestPhoto, isExpanded, onExpandedChange }: ExploreSheetProps) {
  const swipe = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > spacing.xs,
        onPanResponderRelease: (_, { dy }) => {
          if (dy < -swipeThreshold) onExpandedChange(true);
          if (dy > swipeThreshold) onExpandedChange(false);
        },
      }),
    [onExpandedChange],
  );

  return (
    <View style={styles.sheet} {...swipe.panHandlers}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isExpanded ? '가장 가까운 기록 접기' : '가장 가까운 기록 펼치기'}
        hitSlop={spacing.sm}
        onPress={() => onExpandedChange(!isExpanded)}
        style={styles.handleArea}>
        <View style={styles.handle} />
      </Pressable>
      {isExpanded && <NearestRecord photo={nearestPhoto} />}
    </View>
  );
}

function NearestRecord({ photo }: { photo: PhotoMarker | null }) {
  if (!photo) {
    return (
      <AppText variant="caption01" color="textTertiary" style={styles.empty}>
        근처에 남겨진 기록이 아직 없어요
      </AppText>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`가장 가까운 기록 ${photo.hashtags.join(' ')}`}
      onPress={() => router.push(`/map/spot/${photo.id}`)}
      style={styles.record}>
      <PhotoPlaceholder width={60} height={60} />
      <View style={styles.texts}>
        <AppText variant="caption01" color="textTertiary">
          가장 가까운 기록
        </AppText>
        <View style={styles.hashtags}>
          {photo.hashtags.map((hashtag) => (
            <AppText key={hashtag} variant="button03">
              {hashtag}
            </AppText>
          ))}
        </View>
      </View>
      <Icon name="forward" size={24} color="textDeactivated" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sheet: {
    ...floatingShadow,
    paddingBottom: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.background01,
  },
  handleArea: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  handle: {
    width: 44,
    height: spacing.xxs,
    borderRadius: radius.full,
    backgroundColor: colors.borderDeactivated,
  },
  record: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxs,
  },
  texts: {
    flex: 1,
    gap: spacing.xxs,
  },
  hashtags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  empty: {
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
});
