import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { ScreenContainer } from '@/components/screen-container';
import { TextField } from '@/components/text-field';
import { spacing } from '@/constants/layout';
import { SignupHeader } from '@/features/auth/components/signup-header';
import { StepTitle } from '@/features/auth/components/step-title';
import { requiredTerms, TermsAgreement, type TermName } from '@/features/auth/components/terms-agreement';

const totalSteps = 4;

type SignupForm = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  agreedTerms: TermName[];
};

/**
 * 시작: 회원가입 4단계 (이메일 → 비밀번호 → 닉네임 → 약관).
 * 입력 규칙(이메일 형식, 비밀번호 길이·일치, 이미 가입된 이메일, 닉네임 중복)은 백엔드 API와 같이 정하기로 해서,
 * 지금은 칸이 비어 있지 않으면 다음으로 넘어간다. 규칙이 생기면 TextField의 error·helper로 보여준다.
 */
export function SignupScreen() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<SignupForm>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    agreedTerms: [],
  });

  const update = (patch: Partial<SignupForm>) => setForm({ ...form, ...patch });
  const goBack = () => (step === 1 ? router.back() : setStep(step - 1));

  const canGoNext =
    (step === 1 && form.email.length > 0) ||
    (step === 2 && form.password.length > 0 && form.passwordConfirm.length > 0) ||
    (step === 3 && form.nickname.length > 0) ||
    (step === 4 && form.agreedTerms.length === requiredTerms.length);

  const handleNext = () => {
    if (step === totalSteps) {
      router.push('/permission');
      return;
    }
    setStep(step + 1);
  };

  return (
    <ScreenContainer
      header={<SignupHeader step={step} totalSteps={totalSteps} onBack={goBack} />}
      footer={<Button label="다음" variant="primary" disabled={!canGoNext} onPress={handleNext} />}>
      {step === 1 && (
        <>
          <StepTitle title="이메일을 알려주세요" />
          <TextField
            label="이메일"
            placeholder="이메일을 입력해 주세요"
            value={form.email}
            onChangeText={(email) => update({ email })}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </>
      )}

      {step === 2 && (
        <>
          <StepTitle title="비밀번호를 만들어 주세요" />
          <View style={styles.fields}>
            <TextField
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요"
              value={form.password}
              onChangeText={(password) => update({ password })}
              isPassword
              autoComplete="new-password"
            />
            <TextField
              label="비밀번호 확인"
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              value={form.passwordConfirm}
              onChangeText={(passwordConfirm) => update({ passwordConfirm })}
              isPassword
              autoComplete="new-password"
            />
          </View>
        </>
      )}

      {step === 3 && (
        <>
          <StepTitle
            title="어떻게 불러드릴까요?"
            description={'닉네임은 내 화면에서만 보여요.\n남긴 사진은 늘 익명으로 건네져요.'}
          />
          <TextField
            label="닉네임"
            placeholder="닉네임을 입력해 주세요"
            value={form.nickname}
            onChangeText={(nickname) => update({ nickname })}
          />
        </>
      )}

      {step === 4 && (
        <>
          <StepTitle title="약관에 동의해 주세요" description="위치 기반 서비스라 꼭 필요한 동의가 있어요" />
          <TermsAgreement agreed={form.agreedTerms} onChange={(agreedTerms) => update({ agreedTerms })} />
        </>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  fields: {
    gap: spacing.xl,
  },
});
