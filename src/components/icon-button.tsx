import { Pressable, StyleSheet } from 'react-native';

import { Icon, type IconName } from '@/components/icon';
import { colors } from '@/constants/colors';
import { floatingShadow, radius } from '@/constants/layout';

type IconButtonProps = {
  icon: IconName;
  accessibilityLabel: string;
  onPress?: () => void;
  /** 카메라처럼 눈에 띄어야 하는 버튼 */
  emphasized?: boolean;
  size?: number;
};

/** 지도 위에 떠 있는 동그란 아이콘 버튼 */
export function IconButton({ icon, accessibilityLabel, onPress, emphasized = false, size = 44 }: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={[
        styles.button,
        { width: size, height: size },
        emphasized && styles.emphasized,
      ]}>
      <Icon name={icon} size={size / 2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    ...floatingShadow,
    borderRadius: radius.full,
    backgroundColor: colors.background01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emphasized: {
    backgroundColor: colors.primary,
  },
});
