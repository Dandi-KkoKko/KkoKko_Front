import { Pressable, StyleSheet, View, type PressableProps, type ViewStyle } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon, type IconName } from '@/components/icon';
import { colors, type ColorName } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

type ButtonVariant = 'primary' | 'dark' | 'outline';

type ButtonProps = Omit<PressableProps, 'style' | 'children'> & {
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
 * Figma 공통 컴포넌트 button. primary(주황)는 강조, dark(검정)는 기본 진행, outline은 보조 동작.
 * 누르고 있으면 버튼 위에 어두운 막을 덮고 글자를 회색으로 바꾼다 (Figma default_pressed, black_pressed).
 */
export function Button({ label, variant = 'dark', icon, disabled, style, ...rest }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={[styles.base, styles[variant], disabled && styles.disabled, style]}
      {...rest}>
      {({ pressed }) => {
        const showPressed = pressed && !disabled && variant !== 'outline';
        const textColor: ColorName = showPressed ? 'textDeactivated' : disabled ? 'textInverse' : labelColor[variant];
        return (
          <>
            {showPressed && <View style={styles.pressedOverlay} />}
            {icon && <Icon name={icon} size={20} color={textColor} />}
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
    height: 54,
    flexDirection: 'row',
    gap: spacing.xxs,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
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
  pressedOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.pressedOverlay,
  },
});
