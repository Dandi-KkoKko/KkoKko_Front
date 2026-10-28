import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

type SocialProvider = 'kakao' | 'google';

const providerLabel: Record<SocialProvider, string> = {
  kakao: '카카오로 시작하기',
  google: '구글로 시작하기',
};

type SocialLoginButtonProps = {
  provider: SocialProvider;
  onPress: () => void;
};

/** 카카오·구글 로그인 버튼. 각 서비스 로고는 브랜드 가이드 파일을 받으면 회색 자리에 넣는다. */
export function SocialLoginButton({ provider, onPress }: SocialLoginButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.base, styles[provider], pressed && styles.pressed]}>
      <View style={[styles.logo, provider === 'google' && styles.googleLogo]} />
      <AppText variant="button01">{providerLabel[provider]}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  kakao: {
    backgroundColor: colors.kakao,
  },
  google: {
    borderWidth: 1,
    borderColor: colors.borderDeactivated,
  },
  pressed: {
    opacity: 0.8,
  },
  logo: {
    width: 20,
    height: 20,
    borderRadius: radius.xs,
    backgroundColor: colors.warning,
  },
  googleLogo: {
    borderRadius: radius.full,
    backgroundColor: colors.placeholderBox,
  },
});
