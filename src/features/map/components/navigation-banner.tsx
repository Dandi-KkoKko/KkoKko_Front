import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors, palette } from '@/constants/colors';
import { floatingShadow, radius, spacing } from '@/constants/layout';

type NavigationBannerProps = {
  message: string;
  onEnd: () => void;
};

/** 길안내 화면 위쪽의 어두운 안내 띠: '다음 자리까지 3분'과 '길안내 종료' */
export function NavigationBanner({ message, onEnd }: NavigationBannerProps) {
  return (
    <View style={styles.banner}>
      <AppText variant="subtitle02" color="textInverse" style={styles.message}>
        {message}
      </AppText>
      <Pressable accessibilityRole="button" onPress={onEnd} style={styles.endButton}>
        <AppText variant="button03" color="textInverse">
          길안내 종료
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // Figma 띠 색(#313131)은 용도별 색 이름에 없어서 팔레트 값을 쓴다. 지도 위에서 글자가 잘 보이도록 어둡게 둔다.
  banner: {
    ...floatingShadow,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: palette.gray[800],
  },
  message: {
    flex: 1,
  },
  endButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
  },
});
