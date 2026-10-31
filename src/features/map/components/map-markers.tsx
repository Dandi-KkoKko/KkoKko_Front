import { Pressable, StyleSheet, View, type DimensionValue } from 'react-native';

import { AppText } from '@/components/app-text';
import { Badge } from '@/components/badge';
import { Icon } from '@/components/icon';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

/** 지도 위 위치. 진짜 지도에서는 위도·경도로 바뀐다. */
export type MarkerPosition = { top: DimensionValue; left: DimensionValue };

type PhotoMarkerProps = MarkerPosition & {
  hashtag?: string;
  /** 맛보기: 흐리지 않게 보여주는 인기 사진 / 곧 열려요: 열림 반경 안 */
  status?: 'preview' | 'opening';
  onPress?: () => void;
};

/** 흐린 사진 하나 */
export function PhotoMarker({ top, left, hashtag, status, onPress }: PhotoMarkerProps) {
  return (
    <Pressable style={[styles.marker, { top, left }]} onPress={onPress}>
      <PhotoPlaceholder width={56} height={56} bordered highlighted={status === 'opening'} />
      {status === 'preview' && <Badge label="맛보기" tone="highlight" />}
      {status === 'opening' && <Badge label="곧 열려요" tone="dark" />}
      {hashtag && <Badge label={hashtag} />}
    </Pressable>
  );
}

type ClusterMarkerProps = MarkerPosition & {
  /** 없으면 사진 묶음만 보여준다 (묶음 목록 화면 위 지도 등) */
  label?: string;
  moreCount?: number;
  /** 맨 앞 사진 테두리 강조 (내 주변 묶음) */
  highlighted?: boolean;
  /** 선택된 상태 (묶음 목록을 열었을 때) */
  selected?: boolean;
  onPress?: () => void;
};

/** 가까운 사진끼리 묶인 표시. 맨 앞은 좋아요가 가장 많은 사진. 지도를 확대하면 풀린다. */
export function ClusterMarker({ top, left, label, moreCount, highlighted, selected, onPress }: ClusterMarkerProps) {
  return (
    <Pressable style={[styles.marker, { top, left }]} onPress={onPress}>
      <View style={selected && styles.selectedRing}>
        <View style={styles.stack}>
          <PhotoPlaceholder width={48} height={48} bordered style={styles.stackBack} />
          <PhotoPlaceholder width={48} height={48} bordered style={styles.stackMiddle} />
          <PhotoPlaceholder width={48} height={48} bordered highlighted={highlighted} />
        </View>
      </View>
      {label && <AppText variant="caption03">{label}</AppText>}
      {moreCount !== undefined && (
        <AppText variant="caption04" color="textTertiary">
          +{moreCount}개 더
        </AppText>
      )}
    </Pressable>
  );
}

type EmptySpotMarkerProps = MarkerPosition & {
  /** 선택된 상태 (빈 자리 상세에서 강조) */
  selected?: boolean;
  showLabel?: boolean;
  onPress?: () => void;
};

/** 아직 아무도 남기지 않은 자리. 첫 기록을 유도한다. */
export function EmptySpotMarker({ top, left, selected = false, showLabel = true, onPress }: EmptySpotMarkerProps) {
  return (
    <Pressable style={[styles.emptyMarker, { top, left }]} onPress={onPress}>
      <View style={selected && styles.selectedRing}>
        <View style={styles.emptyCircle}>
          <Icon name="plus" size={18} />
        </View>
      </View>
      {showLabel && (
        <AppText variant="caption04" color="textSecondary">
          {'아직 아무도 정을\n남기지 않은 자리'}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  stack: {
    width: 64,
    height: 56,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  stackBack: {
    position: 'absolute',
    left: 0,
    top: 4,
    transform: [{ rotate: '-8deg' }],
  },
  stackMiddle: {
    position: 'absolute',
    left: 6,
    top: 0,
  },
  emptyMarker: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  selectedRing: {
    padding: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.selectedBackground,
  },
  emptyCircle: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    backgroundColor: colors.background01,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
