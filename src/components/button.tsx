import { Pressable, StyleSheet, type PressableProps, type ViewStyle } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon, type IconName } from '@/components/icon';
import { colors, type ColorName } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

type ButtonVariant = 'primary' | 'dark' | 'outline';

type ButtonProps = Omit<PressableProps, 'style'> & {
  label: string;
  variant?: ButtonVariant;
  /** 글자 왼쪽 아이콘 */
  icon?: IconName;
  style?: ViewStyle;
};

const labelColor: Record<ButtonVariant, ColorName> = {
  primary: 'textInverse',
  dark: 'textInverse',
  outline: 'textPrimary',
};

/**
 * Figma 공통 컴포넌트의 버튼 상태를 따른다.
 * - primary: 누르는 동안 배경은 그대로 두고 글자만 회색으로 바꾼다.
 * - dark: 비활성이어도 검은 배경을 유지하고 글자만 회색으로 바꾼다.
 * - 그 밖의 비활성: 회색 배경에 흰 글자.
 */
function getLabelColor(variant: ButtonVariant, { disabled, pressed }: { disabled: boolean; pressed: boolean }): ColorName {
  if (disabled) return variant === 'dark' ? 'textDeactivated' : 'textInverse';
  if (pressed && variant === 'primary') return 'textDeactivated';
  return labelColor[variant];
}

/** 화면 아래의 큰 버튼. primary는 강조, dark는 기본 진행, outline은 보조 동작. */
export function Button({ label, variant = 'dark', icon, disabled, style, ...rest }: ButtonProps) {
  const isDisabled = disabled ?? false;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        isDisabled && variant !== 'dark' && styles.disabled,
        // primary는 글자 색으로 눌림을 보여주므로 흐리게 하지 않는다
        pressed && variant !== 'primary' && styles.pressed,
        style,
      ]}
      {...rest}>
      {({ pressed }) => {
        const textColor = getLabelColor(variant, { disabled: isDisabled, pressed });
        return (
          <>
            {icon && <Icon name={icon} size={18} color={textColor} />}
            <AppText variant="button01" color={textColor}>
              {label}
            </AppText>
          </>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 56,
    flexDirection: 'row',
    gap: spacing.xxs,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  dark: {
    backgroundColor: colors.textPrimary,
  },
  outline: {
    backgroundColor: colors.background01,
    borderWidth: 1,
    borderColor: colors.borderDeactivated,
  },
  disabled: {
    backgroundColor: colors.borderDeactivated,
    borderWidth: 0,
  },
  pressed: {
    opacity: 0.8,
  },
});
