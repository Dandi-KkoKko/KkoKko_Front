import type { ReactNode } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { typography } from '@/constants/typography';

type TextFieldProps = TextInputProps & {
  label: string;
  /** 입력창 아래 작은 안내 문구 */
  helper?: string;
  /** 입력창 오른쪽에 붙는 버튼 등 (예: 인증 요청) */
  accessory?: ReactNode;
  /** maxLength와 함께 쓰면 오른쪽 아래에 '22/40'처럼 글자 수를 보여준다 */
  showCount?: boolean;
};

export function TextField({ label, helper, accessory, showCount = false, style, ...rest }: TextFieldProps) {
  const count = showCount && rest.maxLength ? `${rest.value?.length ?? 0}/${rest.maxLength}` : undefined;

  return (
    <View style={styles.container}>
      <AppText variant="subtitle04">{label}</AppText>
      <View style={styles.row}>
        <TextInput
          placeholderTextColor={colors.textPlaceholder}
          style={[styles.input, style]}
          {...rest}
        />
        {accessory}
      </View>
      {(helper || count) && (
        <View style={styles.bottomRow}>
          <AppText variant="caption02" color="textTertiary" style={styles.helper}>
            {helper}
          </AppText>
          {count && (
            <AppText variant="caption02" color="textTertiary">
              {count}
            </AppText>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  input: {
    ...typography.body01,
    flex: 1,
    height: 52,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderDeactivated,
    color: colors.textPrimary,
  },
  bottomRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  helper: {
    flex: 1,
  },
});
