import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { floatingShadow, radius, spacing } from '@/constants/layout';

type ExploreModeToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

const knobSize = 22;

/**
 * 지도 오른쪽 위 '탐색 모드' 스위치.
 * Figma에는 스위치 안에 눈 아이콘(감은 눈 / 뜬 눈)이 있다. 공통 아이콘(components/icon.tsx)에 눈 아이콘이 추가되면
 * 손잡이 반대편 빈 자리(iconSlot)에 넣는다.
 */
export function ExploreModeToggle({ value, onChange }: ExploreModeToggleProps) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel="탐색 모드"
      accessibilityState={{ checked: value }}
      hitSlop={spacing.xs}
      onPress={() => onChange(!value)}
      style={styles.container}>
      <View style={[styles.track, value && styles.trackOn]}>
        <View style={styles.knob} />
        <View style={styles.iconSlot} />
      </View>
      <AppText variant="caption03" color={value ? 'primary' : 'textDeactivated'}>
        탐색 모드
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xxs,
  },
  track: {
    ...floatingShadow,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    padding: spacing.xxs,
    borderRadius: radius.full,
    backgroundColor: colors.borderDeactivated,
  },
  // 켜지면 손잡이가 오른쪽으로 간다
  trackOn: {
    flexDirection: 'row-reverse',
    backgroundColor: colors.primary,
  },
  knob: {
    width: knobSize,
    height: knobSize,
    borderRadius: radius.full,
    backgroundColor: colors.background01,
  },
  iconSlot: {
    width: knobSize,
    height: knobSize,
  },
});
