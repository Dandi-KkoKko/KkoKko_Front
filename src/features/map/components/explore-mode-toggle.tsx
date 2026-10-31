import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { floatingShadow, radius, spacing } from '@/constants/layout';

type ExploreModeToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

const knobSize = 22;

/**
 * 지도 오른쪽 위 '탐색 모드' 스위치.
 * 손잡이 반대편에 눈 아이콘을 둔다: 꺼지면 감은 눈(회색), 켜지면 뜬 눈(주황 바탕에 흰색).
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
        <View style={styles.iconSlot}>
          <Icon name={value ? 'eye' : 'eyeClosed'} size={20} color={value ? 'textInverse' : 'textDeactivated'} />
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
