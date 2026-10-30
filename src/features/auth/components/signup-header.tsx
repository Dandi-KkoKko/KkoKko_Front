import { AppText } from '@/components/app-text';
import { ScreenHeader } from '@/components/screen-header';
import { StepProgress } from '@/features/auth/components/step-progress';

type SignupHeaderProps = {
  step: number;
  totalSteps: number;
  onBack: () => void;
};

/** 회원가입 위쪽: 뒤로, 가운데 '회원가입', 오른쪽 단계(1/4), 진행 막대 */
export function SignupHeader({ step, totalSteps, onBack }: SignupHeaderProps) {
  return (
    <>
      <ScreenHeader
        center={<AppText variant="subtitle03">회원가입</AppText>}
        onBack={onBack}
        right={
          <AppText variant="subtitle04" color="textTertiary">
            {`${step}/${totalSteps}`}
          </AppText>
        }
      />
      <StepProgress step={step} totalSteps={totalSteps} />
    </>
  );
}
