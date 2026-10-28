import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Checkbox } from '@/components/checkbox';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

export const requiredTerms = ['이용약관', '개인정보 수집·이용', '위치기반 서비스 이용'] as const;
export type TermName = (typeof requiredTerms)[number];

type TermsAgreementProps = {
  agreed: TermName[];
  onChange: (agreed: TermName[]) => void;
};

/** 회원가입의 약관 동의 상자. 전체 동의를 누르면 모든 항목이 같이 바뀐다. */
export function TermsAgreement({ agreed, onChange }: TermsAgreementProps) {
  const allAgreed = agreed.length === requiredTerms.length;

  const toggleAll = () => onChange(allAgreed ? [] : [...requiredTerms]);
  const toggle = (term: TermName) =>
    onChange(agreed.includes(term) ? agreed.filter((item) => item !== term) : [...agreed, term]);

  return (
    <View style={styles.box}>
      <AppText variant="caption02" color="textTertiary">
        약관 동의
      </AppText>

      <Pressable style={[styles.row, styles.allRow]} onPress={toggleAll}>
        <Checkbox checked={allAgreed} size={24} />
        <AppText variant="subtitle03">전체 동의</AppText>
      </Pressable>

      {requiredTerms.map((term) => (
        <Pressable key={term} style={styles.row} onPress={() => toggle(term)}>
          <Checkbox checked={agreed.includes(term)} />
          <AppText variant="body02" style={styles.termLabel}>
            [필수] {term}
          </AppText>
          <AppText variant="caption02" color="textTertiary" style={styles.underline}>
            보기
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.disabledBackground,
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  allRow: {
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.disabledBackground,
  },
  termLabel: {
    flex: 1,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
