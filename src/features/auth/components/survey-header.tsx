import { Pressable } from 'react-native';

import { AppText } from '@/components/app-text';
import { ScreenHeader } from '@/components/screen-header';
import { StepProgress } from '@/features/auth/components/step-progress';

type SurveyHeaderProps = {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onSkip: () => void;
};

/** 설문 위쪽: 뒤로, 단계(1/3), 건너뛰기, 진행 막대 */
export function SurveyHeader({ step, totalSteps, onBack, onSkip }: SurveyHeaderProps) {
  return (
    <>
      <ScreenHeader
        center={
          <AppText variant="subtitle04" color="textTertiary">
            {`${step}/${totalSteps}`}
          </AppText>
        }
        onBack={onBack}
        right={
          <Pressable hitSlop={12} onPress={onSkip}>
            <AppText variant="subtitle04" color="textTertiary">
              건너뛰기
            </AppText>
          </Pressable>
        }
      />
      <StepProgress step={step} totalSteps={totalSteps} />
    </>
  );
}
