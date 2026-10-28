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
  primary: 'textPrimary',
  dark: 'textInverse',
  outline: 'textPrimary',
};

/** 화면 아래의 큰 버튼. primary는 강조, dark는 기본 진행, outline은 보조 동작. */
export function Button({ label, variant = 'dark', icon, disabled, style, ...rest }: ButtonProps) {
  const textColor = disabled ? 'textDeactivated' : labelColor[variant];

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
      {...rest}>
      {icon && <Icon name={icon} size={18} color={textColor} />}
      <AppText variant="button01" color={textColor}>
        {label}
      </AppText>
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
    backgroundColor: colors.disabledBackground,
    borderWidth: 0,
  },
  pressed: {
    opacity: 0.8,
  },
});
