import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/layout';

type CheckboxProps = {
  checked: boolean;
  size?: number;
};

/**
 * Figma 온보딩 selectbox_check의 네모 체크. 체크 표시만 그리고, 누르는 영역은 감싸는 쪽(Pressable)이 정한다.
 * 약관처럼 동그란 체크가 필요하면 Radio를 쓴다.
 */
export function Checkbox({ checked, size = 28 }: CheckboxProps) {
  return (
    <View style={[styles.box, { width: size, height: size }, checked && styles.checked]}>
      {checked && <Icon name="check" size={size - 4} />}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.iconStroke,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: colors.textPrimary,
    borderColor: colors.textPrimary,
  },
});
