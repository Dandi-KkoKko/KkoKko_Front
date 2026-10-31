import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { termsSections } from '@/features/my/constants/terms-sections';

/**
 * 이용약관·개인정보 처리방침. 회원가입 약관 화살표와 설정에서 같이 들어온다.
 * 로그인 전(회원가입)에도 열려야 해서 마이 탭 안이 아니라 최상위 주소(/terms)에 둔다.
 */
export function TermsScreen() {
  return (
    <ScreenContainer background="gray" header={<ScreenHeader title="이용약관 · 개인정보 처리방침" />}>
      <View style={styles.sections}>
        {termsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <AppText variant="subtitle03">{section.title}</AppText>
            <AppText variant="body02" color="textSecondary">
              {section.body}
            </AppText>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sections: {
    gap: spacing.sm,
  },
  section: {
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.background01,
  },
});
