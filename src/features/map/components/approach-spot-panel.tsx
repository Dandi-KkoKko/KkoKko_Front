import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { ApproachProgress } from '@/features/map/components/approach-progress';
import { BottomPanel } from '@/features/map/components/bottom-panel';
import type { ApproachStage, ApproachStageInfo } from '@/features/map/constants/approach-stages';

type ApproachSpotPanelProps = {
  spotId: string;
  stage: ApproachStage;
  info: ApproachStageInfo;
  hashtags: string[];
  /** 다음 단계로 (진짜 위치를 붙이면 거리가 줄어들 때 자동으로 바뀐다) */
  onNext: () => void;
};

/** 흐린 자리에 다가가는 중: 흐린 사진, 보이는 만큼의 해시태그, 남은 거리 */
export function ApproachSpotPanel({ spotId, stage, info, hashtags, onNext }: ApproachSpotPanelProps) {
  const isAlmostOpen = stage === 'almost';

  return (
    <BottomPanel>
      <View style={styles.summary}>
        <PhotoPlaceholder width={120} height={150} style={isAlmostOpen ? styles.lighterPhoto : undefined}>
          <View style={styles.photoCenter}>
            <Icon name="lock" size={isAlmostOpen ? 16 : 22} color="textInverse" />
          </View>
        </PhotoPlaceholder>

        <View style={styles.texts}>
          <AppText variant="caption04" color="textTertiary">
            {info.caption}
          </AppText>
          <View style={styles.hashtags}>
            {hashtags.slice(0, info.visibleHashtagCount).map((hashtag) => (
              <Badge key={hashtag} label={hashtag} tone="muted" />
            ))}
          </View>
          {info.message ? (
            <AppText variant="body02" color="textSecondary">
              {info.message}
            </AppText>
          ) : (
            <View style={styles.lockedLine}>
              <Icon name="lock" size={14} color="textTertiary" />
              <View style={styles.hiddenLine} />
            </View>
          )}
        </View>
      </View>

      <ApproachProgress
        title={isAlmostOpen ? `${info.distanceMeters}m · 조금만 더!` : `${info.distanceMeters}m 남았어요`}
        hint={info.hint}
        progressIndex={info.progressIndex}
      />

      <View style={styles.buttons}>
        <Pressable accessibilityLabel="신고" style={styles.reportButton} onPress={() => router.push(`/report/${spotId}`)}>
          <Icon name="report" size={20} />
        </Pressable>
        {isAlmostOpen ? (
          <Button label="가까이 가면 자동으로 열려요" disabled style={styles.mainButton} />
        ) : (
          // 진짜 길 안내를 붙이기 전까지 첫 단계에서는 이 버튼이 다음 단계로 넘긴다
          <Button
            label="걸어서 길 안내"
            variant="primary"
            style={styles.mainButton}
            onPress={stage === 'far' ? onNext : undefined}
          />
        )}
      </View>

      {info.demoNextLabel && (
        <Pressable hitSlop={8} onPress={onNext} style={styles.demoLink}>
          <AppText variant="caption04" color="textTertiary" style={styles.underline}>
            {info.demoNextLabel}
          </AppText>
        </Pressable>
      )}
    </BottomPanel>
  );
}

const styles = StyleSheet.create({
  summary: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  lighterPhoto: {
    backgroundColor: colors.placeholderBox,
  },
  photoCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    gap: spacing.xs,
  },
  hashtags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xxs,
  },
  lockedLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  hiddenLine: {
    flex: 1,
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.disabledBackground,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.xs,
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
  mainButton: {
    flex: 1,
  },
  demoLink: {
    alignSelf: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
