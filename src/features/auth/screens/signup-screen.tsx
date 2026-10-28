import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { TextField } from '@/components/text-field';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import {
  requiredTerms,
  TermsAgreement,
  type TermName,
} from '@/features/auth/components/terms-agreement';

/**
 * 와이어프레임 ⓪ 시작: 이메일로 가입하기.
 * 입력값 검사와 이메일 인증은 백엔드 API가 나오면 붙인다. 지금은 약관 동의만 확인한다.
 */
export function SignupScreen() {
  const [agreedTerms, setAgreedTerms] = useState<TermName[]>([]);
  const canSubmit = agreedTerms.length === requiredTerms.length;

  return (
    <ScreenContainer
      header={<ScreenHeader title="이메일로 가입하기" />}
      footer={
        <Button
          label={canSubmit ? '가입하기' : '필수 약관에 동의해 주세요'}
          disabled={!canSubmit}
          onPress={() => router.push('/permission')}
        />
      }>
      <View style={styles.form}>
        <TextField
          label="이메일"
          placeholder="example@yu.ac.kr"
          keyboardType="email-address"
          autoCapitalize="none"
          accessory={
            <Pressable style={styles.verifyButton}>
              <AppText variant="button05">인증 요청</AppText>
            </Pressable>
          }
        />
        <TextField label="비밀번호" placeholder="비밀번호" secureTextEntry helper="영문·숫자 포함 8자 이상" />
        <TextField label="비밀번호 확인" placeholder="비밀번호 확인" secureTextEntry />
        <TextField
          label="닉네임"
          placeholder="벤치지킴이"
          helper="내 화면에서만 보여요. 남긴 사진은 늘 익명이에요"
        />
        <TermsAgreement agreed={agreedTerms} onChange={setAgreedTerms} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.lg,
  },
  verifyButton: {
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.disabledBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
