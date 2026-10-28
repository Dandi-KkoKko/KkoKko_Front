import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { ScreenHeader } from '@/components/screen-header';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/layout';

type SurveyHeaderProps = {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onSkip: () => void;
};

/** 설문 위쪽: 뒤로, 단계(1 / 3), 건너뛰기, 진행 막대 */
export function SurveyHeader({ step, totalSteps, onBack, onSkip }: SurveyHeaderProps) {
  const progress = `${(step / totalSteps) * 100}%` as const;

  return (
    <View>
      <ScreenHeader
        centerText={`${step} / ${totalSteps}`}
        onBack={onBack}
        right={
          <Pressable hitSlop={12} onPress={onSkip}>
            <AppText variant="caption01" color="textTertiary">
              건너뛰기
            </AppText>
          </Pressable>
        }
      />
      <View style={styles.track}>
        <View style={[styles.fill, { width: progress }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 4,
    borderRadius: radius.full,
    backgroundColor: colors.disabledBackground,
  },
  fill: {
    height: 4,
    borderRadius: radius.full,
    backgroundColor: colors.textPrimary,
  },
});
