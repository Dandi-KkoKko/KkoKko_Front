import { Link, router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { ScreenContainer } from '@/components/screen-container';
import { TextField } from '@/components/text-field';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/layout';
import { SocialLoginButton } from '@/features/auth/components/social-login-button';

/**
 * 와이어프레임 ⓪ 시작: 로그인.
 * 아직 백엔드가 없어서 어떤 버튼을 눌러도 권한 요청 화면으로 넘어간다.
 */
export function LoginScreen() {
  const goNext = () => router.push('/permission');

  return (
    <ScreenContainer
      footer={
        <AppText variant="caption04" color="textTertiary" style={styles.center}>
          신고와 내 사진 관리는 로그인한 사용자만 할 수 있어요
        </AppText>
      }>
      <View style={styles.title}>
        <AppText variant="heading01">「가까이」</AppText>
        <AppText variant="heading03">{'다가가야 보이는 지도,\n로그인하고 시작해요'}</AppText>
      </View>

      <View style={styles.socialButtons}>
        <SocialLoginButton provider="kakao" onPress={goNext} />
        <SocialLoginButton provider="google" onPress={goNext} />
      </View>

      <View style={styles.divider}>
        <View style={styles.line} />
        <AppText variant="caption04" color="textTertiary">
          또는 이메일로
        </AppText>
        <View style={styles.line} />
      </View>

      <View style={styles.form}>
        <TextField
          label="이메일"
          placeholder="example@yu.ac.kr"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextField label="비밀번호" placeholder="비밀번호" isPassword />
        <Button label="로그인" onPress={goNext} style={styles.loginButton} />
      </View>

      <View style={styles.links}>
        <AppText variant="button04" color="textSecondary">
          비밀번호 찾기
        </AppText>
        <AppText variant="button04" color="borderDeactivated">
          |
        </AppText>
        <Link href="/signup">
          <AppText variant="button03">이메일로 회원가입</AppText>
        </Link>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.xxxl,
    gap: spacing.xs,
  },
  socialButtons: {
    marginTop: spacing.xxl,
    gap: spacing.sm,
  },
  divider: {
    marginVertical: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.disabledBackground,
  },
  form: {
    gap: spacing.md,
  },
  loginButton: {
    marginTop: spacing.xxs,
  },
  links: {
    marginTop: 'auto',
    paddingTop: spacing.xxl,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  center: {
    textAlign: 'center',
  },
});
