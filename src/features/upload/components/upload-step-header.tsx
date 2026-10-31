import { AppText } from '@/components/app-text';
import { ScreenHeader } from '@/components/screen-header';

type UploadStepHeaderProps = {
  title: string;
  step: number;
};

const totalSteps = 3;

/** 남기기 2·3단계 위쪽: 뒤로, 가운데 제목, 오른쪽 단계(2/3) */
export function UploadStepHeader({ title, step }: UploadStepHeaderProps) {
  return (
    <ScreenHeader
      center={<AppText variant="subtitle03">{title}</AppText>}
      right={<AppText variant="subtitle03">{`${step}/${totalSteps}`}</AppText>}
    />
  );
}
