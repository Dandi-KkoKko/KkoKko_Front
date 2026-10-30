import { router } from 'expo-router';
import { useState } from 'react';

import { Button } from '@/components/button';
import { ScreenContainer } from '@/components/screen-container';
import { PlaceStep } from '@/features/auth/components/place-step';
import { RelationStep } from '@/features/auth/components/relation-step';
import { SurveyDone } from '@/features/auth/components/survey-done';
import { SurveyHeader } from '@/features/auth/components/survey-header';
import { WalkStep } from '@/features/auth/components/walk-step';
import { minPlaceCount, type SurveyAnswers } from '@/features/auth/constants/survey-options';

const totalSteps = 3;

// 백엔드 연결 전 임시 값. 로그인한 사용자 닉네임과 근처 자리 수 API로 바꾼다.
const mockNickname = '벤치지킴이';
const mockNearbySpotCount = 12;

/**
 * 시작: 온보딩 설문.
 * 1/3~3/3과 완료 화면을 한 화면에서 단계(step)만 바꿔 보여준다. step이 totalSteps보다 크면 완료 화면.
 */
export function SurveyScreen() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<SurveyAnswers>({ places: [], walkTimes: [] });

  const isDone = step > totalSteps;
  const canGoNext =
    (step === 1 && answers.relation !== undefined) ||
    (step === 2 && answers.places.length >= minPlaceCount) ||
    step === 3;

  const goToMap = () => router.replace('/map');
  const goBack = () => (step === 1 ? router.back() : setStep(step - 1));
  const update = (patch: Partial<SurveyAnswers>) => setAnswers({ ...answers, ...patch });

  if (isDone) {
    return (
      <ScreenContainer footer={<Button label="지도 열기" variant="primary" onPress={goToMap} />}>
        <SurveyDone answers={answers} nickname={mockNickname} nearbySpotCount={mockNearbySpotCount} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      header={<SurveyHeader step={step} totalSteps={totalSteps} onBack={goBack} onSkip={goToMap} />}
      footer={
        <Button
          label={step === totalSteps ? '완료' : '다음'}
          variant="primary"
          disabled={!canGoNext}
          onPress={() => setStep(step + 1)}
        />
      }>
      {step === 1 && <RelationStep value={answers.relation} onChange={(relation) => update({ relation })} />}
      {step === 2 && <PlaceStep value={answers.places} onChange={(places) => update({ places })} />}
      {step === 3 && (
        <WalkStep
          walkTimes={answers.walkTimes}
          walkDuration={answers.walkDuration}
          onChangeWalkTimes={(walkTimes) => update({ walkTimes })}
          onChangeWalkDuration={(walkDuration) => update({ walkDuration })}
        />
      )}
    </ScreenContainer>
  );
}
