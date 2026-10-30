import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { approachProgressLabels } from '@/features/map/constants/approach-stages';

type ApproachProgressProps = {
  title: string;
  hint: string;
  /** 0: 멀리·흐림, 1: 다가가는 중, 2: 거의 열림 */
  progressIndex: number;
};

const almostOpenIndex = 2;

/** 남은 거리와 3칸 진행 막대. 지나온 칸은 검정, 지금 칸은 강조색. 거의 열림이면 상자 전체를 강조한다. */
export function ApproachProgress({ title, hint, progressIndex }: ApproachProgressProps) {
  const isAlmostOpen = progressIndex === almostOpenIndex;

  return (
    <View style={[styles.box, isAlmostOpen && styles.almostBox]}>
      <View style={styles.header}>
        <AppText variant="subtitle03">{title}</AppText>
        <AppText variant="caption04" color={isAlmostOpen ? 'textPrimary' : 'textTertiary'}>
          {hint}
        </AppText>
      </View>

      <View style={styles.segments}>
        {approachProgressLabels.map((label, index) => (
          <View
            key={label}
            style={[
              styles.segment,
              index < progressIndex && styles.passed,
              index === progressIndex && styles.current,
            ]}
          />
        ))}
      </View>

      <View style={styles.labels}>
        {approachProgressLabels.map((label, index) => {
          const isCurrent = index === progressIndex;
          const text = isAlmostOpen && index === almostOpenIndex ? '거의 열림' : label;
          return (
            <AppText
              key={label}
              variant={isCurrent ? 'caption03' : 'caption04'}
              color={isCurrent ? 'textPrimary' : 'textTertiary'}>
              {text}
            </AppText>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.background02,
  },
  almostBox: {
    backgroundColor: colors.selectedBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  segments: {
    flexDirection: 'row',
    gap: spacing.xxs,
  },
  segment: {
    flex: 1,
    height: 5,
    borderRadius: radius.full,
    backgroundColor: colors.disabledBackground,
  },
  passed: {
    backgroundColor: colors.textPrimary,
  },
  current: {
    backgroundColor: colors.primary,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
