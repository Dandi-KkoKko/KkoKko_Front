import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { typography } from '@/constants/typography';

type TextFieldProps = Omit<TextInputProps, 'secureTextEntry'> & {
  /** 입력창 위 이름. 없으면 입력창만 보여준다. */
  label?: string;
  /** 꼭 써야 하는 칸이면 이름 뒤에 빨간 * 를 붙인다 */
  required?: boolean;
  /** 입력창 아래 작은 안내 문구 */
  helper?: string;
  /** 있으면 빨간 테두리와 빨간 안내 문구로 보여준다 */
  error?: string;
  /** 입력창 오른쪽에 붙는 버튼 등 (예: 인증 요청) */
  accessory?: ReactNode;
  /** maxLength와 함께 쓰면 오른쪽 아래에 '22/40'처럼 글자 수를 보여준다 */
  showCount?: boolean;
  /** 비밀번호 칸. 오른쪽 눈 아이콘으로 보이기·숨기기를 바꾼다. */
  isPassword?: boolean;
};

/**
 * Figma 로그인/회원가입 inputfield.
 * 기본은 회색 칸, 입력하는 중(포커스)에는 흰 칸에 검정 테두리, 에러면 빨간 테두리와 빨간 글자.
 */
export function TextField({
  label,
  required = false,
  helper,
  error,
  accessory,
  showCount = false,
  isPassword = false,
  style,
  onFocus,
  onBlur,
  ...rest
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const count = showCount && rest.maxLength ? `${rest.value?.length ?? 0}/${rest.maxLength}` : undefined;
  const bottomText = error ?? helper;

  return (
    <View>
      {label && (
        <AppText variant="caption01" color="textSecondary" style={styles.label}>
          {label}
          {required && <AppText variant="caption01" color="requiredMark">*</AppText>}
        </AppText>
      )}
      <View style={styles.row}>
        <View style={[styles.box, isFocused && styles.focusedBox, error !== undefined && styles.errorBox]}>
          <TextInput
            placeholderTextColor={colors.textPlaceholder}
            secureTextEntry={isPassword && !isPasswordVisible}
            onFocus={(event) => {
              setIsFocused(true);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setIsFocused(false);
              onBlur?.(event);
            }}
            style={[styles.input, error !== undefined && styles.errorText, style]}
            {...rest}
          />
          {isPassword && (
            <Pressable
              accessibilityLabel={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
              hitSlop={8}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Icon name={isPasswordVisible ? 'eyeOpen' : 'eyeClosed'} />
            </Pressable>
          )}
        </View>
        {accessory}
      </View>
      {(bottomText || count) && (
        <View style={styles.bottomRow}>
          <AppText variant="caption02" color={error !== undefined ? 'error' : 'textTertiary'} style={styles.helper}>
            {bottomText}
          </AppText>
          {count && (
            <AppText variant="caption04" color="textDeactivated">
              {count}
            </AppText>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Figma inputfield: 이름 → 칸은 8, 칸 → 안내 문구는 4 띄우고, 이름과 안내 문구는 안쪽으로 8 들여 쓴다
  label: {
    marginBottom: spacing.xs,
    paddingLeft: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  box: {
    flex: 1,
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.background02,
    backgroundColor: colors.background02,
  },
  focusedBox: {
    borderColor: colors.textPrimary,
    backgroundColor: colors.background01,
  },
  errorBox: {
    borderColor: colors.error,
    backgroundColor: colors.background01,
  },
  input: {
    ...typography.body01,
    flex: 1,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    // 웹 미리보기에서 브라우저 기본 포커스 테두리가 칸 테두리와 겹쳐서 끈다 (폰에는 없음)
    outlineWidth: 0,
  },
  errorText: {
    color: colors.error,
  },
  bottomRow: {
    marginTop: spacing.xxs,
    paddingHorizontal: spacing.xs,
    flexDirection: 'row',
    gap: spacing.xs,
  },
  helper: {
    flex: 1,
  },
});
