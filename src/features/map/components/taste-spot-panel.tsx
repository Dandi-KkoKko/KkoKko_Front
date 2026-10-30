import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { BottomPanel } from '@/features/map/components/bottom-panel';

type TasteSpotPanelProps = {
  spotId: string;
  hashtags: string[];
  placeName: string;
  distanceMeters: number;
  walkMinutes: number;
  onWalk: () => void;
};

/** 맛보기 자리: 사진은 선명하게 보여주고, 남긴 사람의 한 줄은 가까이 가야 열린다 */
export function TasteSpotPanel({ spotId, hashtags, placeName, distanceMeters, walkMinutes, onWalk }: TasteSpotPanelProps) {
  return (
    <BottomPanel>
      <PhotoPlaceholder width="100%" height={280}>
        <View style={styles.photoBadge}>
          <Badge label="맛보기 · 이 구역 대표 사진" tone="highlight" />
        </View>
      </PhotoPlaceholder>

      <View style={styles.hashtags}>
        {hashtags.map((hashtag) => (
          <Badge key={hashtag} label={hashtag} tone="muted" />
        ))}
      </View>

      <View style={styles.locked}>
        <Icon name="lock" size={18} color="textTertiary" />
        <View style={styles.lockedTexts}>
          <View style={styles.hiddenLine} />
          <AppText variant="caption04" color="textSecondary">
            남긴 사람의 한 줄은 가까이 가야 열려요
          </AppText>
        </View>
      </View>

      <View style={styles.distanceRow}>
        <AppText variant="subtitle03">
          {placeName} · {distanceMeters}m
        </AppText>
        <AppText variant="caption04" color="textTertiary">
          도보 약 {walkMinutes}분
        </AppText>
      </View>

      <View style={styles.buttons}>
        <Pressable
          accessibilityLabel="신고"
          style={styles.reportButton}
          onPress={() => router.push(`/report/${spotId}`)}>
          <Icon name="report" size={20} />
        </Pressable>
        <Button label="걸어서 가 보기" variant="primary" style={styles.walkButton} onPress={onWalk} />
      </View>
    </BottomPanel>
  );
}

const styles = StyleSheet.create({
  photoBadge: {
    padding: spacing.sm,
  },
  hashtags: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  locked: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.background02,
  },
  lockedTexts: {
    flex: 1,
    gap: spacing.xs,
  },
  // 잠긴 한 줄 자리를 회색 막대로 보여준다
  hiddenLine: {
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.disabledBackground,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  reportButton: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderDeactivated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walkButton: {
    flex: 1,
  },
});
