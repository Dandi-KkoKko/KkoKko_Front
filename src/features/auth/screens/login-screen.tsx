import { Link, router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { ScreenContainer } from '@/components/screen-container';
import { TextField } from '@/components/text-field';
import { sectionGap, spacing } from '@/constants/layout';

/**
 * 시작: 이메일 로그인.
 * 아직 백엔드가 없어서 무엇을 입력해도 권한 안내로 넘어간다.
 * 서버가 붙으면 틀렸을 때 칸을 빨갛게 하고 '이메일 또는 비밀번호가 일치하지 않습니다' 알림을 띄운다 (Figma 로그인 오류 화면).
 */
export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScreenContainer>
      <AppText variant="heading01">로그인</AppText>

      <View style={styles.form}>
        <TextField
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <TextField
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChangeText={setPassword}
          isPassword
          autoComplete="current-password"
        />
      </View>

      <Link href="/signup" style={styles.signupLink}>
        <AppText variant="button04" color="textTertiary" style={styles.underline}>
          아직 회원이 아니신가요?
        </AppText>
      </Link>

      {/* 키보드가 올라와도 가려지지 않게 GUI처럼 버튼을 입력칸 바로 아래에 둔다 */}
      <Button label="로그인" variant="primary" onPress={() => router.push('/permission')} style={styles.loginButton} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: sectionGap,
    gap: spacing.xl,
  },
  signupLink: {
    marginTop: spacing.xxl,
    alignSelf: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  loginButton: {
    marginTop: sectionGap,
  },
});
