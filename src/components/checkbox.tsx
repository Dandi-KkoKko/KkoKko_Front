import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/layout';

type CheckboxProps = {
  checked: boolean;
  size?: number;
};

/** 체크 표시만 그린다. 누르는 영역은 감싸는 쪽(Pressable)이 정한다. */
export function Checkbox({ checked, size = 22 }: CheckboxProps) {
  return (
    <View
      style={[
        styles.box,
        { width: size, height: size },
        checked && styles.checked,
      ]}>
      {checked && <Icon name="check" size={size - 6} color="textInverse" />}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: radius.xs,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: colors.textPrimary,
    borderColor: colors.textPrimary,
  },
});
