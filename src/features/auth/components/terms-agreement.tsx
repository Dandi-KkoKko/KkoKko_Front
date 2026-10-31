import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { Radio } from '@/components/radio';
import { spacing } from '@/constants/layout';

export const requiredTerms = ['이용약관', '개인정보 수집·이용', '위치기반 서비스 이용', '만 14세 이상이에요'] as const;
export type TermName = (typeof requiredTerms)[number];

type TermsAgreementProps = {
  agreed: TermName[];
  onChange: (agreed: TermName[]) => void;
};

/**
 * 회원가입 마지막 단계의 약관 동의 목록. 모두 필수라 전부 골라야 다음으로 간다.
 * 줄을 누르면 동의가 바뀌고, 오른쪽 화살표를 누르면 약관 전문(/terms)을 본다.
 */
export function TermsAgreement({ agreed, onChange }: TermsAgreementProps) {
  const toggle = (term: TermName) =>
    onChange(agreed.includes(term) ? agreed.filter((item) => item !== term) : [...agreed, term]);

  return (
    <View>
      {requiredTerms.map((term) => {
        const selected = agreed.includes(term);
        return (
          <View key={term} style={styles.row}>
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected }}
              onPress={() => toggle(term)}
              style={styles.label}>
              <Radio selected={selected} />
              <AppText variant="body01" color={selected ? 'textPrimary' : 'textTertiary'}>
                [필수] {term}
              </AppText>
            </Pressable>
            <Pressable accessibilityLabel={`${term} 보기`} hitSlop={12} onPress={() => router.push('/terms')}>
              <Icon name="forwardSmall" />
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  label: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
});
