import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/layout';

type RadioProps = {
  selected: boolean;
  size?: number;
};

/** 여럿 중 하나만 고르는 동그라미. 누르는 영역은 감싸는 쪽(Pressable)이 정한다. */
export function Radio({ selected, size = 22 }: RadioProps) {
  return (
    <View style={[styles.outer, { width: size, height: size }, selected && styles.selectedOuter]}>
      {selected && <View style={[styles.inner, { width: size / 2, height: size / 2 }]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOuter: {
    borderColor: colors.textPrimary,
  },
  inner: {
    borderRadius: radius.full,
    backgroundColor: colors.textPrimary,
  },
});
