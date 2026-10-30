import { Pressable, StyleSheet, View } from 'react-native';

import { colors, palette } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

type ToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  accessibilityLabel?: string;
};

const knobSize = 22;

/**
 * Figma 홈탭 toggle (on / off). 기본 Switch는 기기마다 모양이 달라서 디자인대로 직접 그린다.
 * 켜지면 주황 바탕에 동그라미가 오른쪽으로 간다.
 */
export function Toggle({ value, onChange, accessibilityLabel }: ToggleProps) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={accessibilityLabel}
      onPress={() => onChange(!value)}
      style={[styles.track, value && styles.trackOn]}>
      <View style={styles.knob} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 62,
    height: 32,
    paddingHorizontal: spacing.xxs + 2,
    borderRadius: radius.full,
    backgroundColor: colors.borderDeactivated,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  trackOn: {
    backgroundColor: colors.primary,
    alignItems: 'flex-end',
  },
  knob: {
    width: knobSize,
    height: knobSize,
    borderRadius: radius.full,
    backgroundColor: colors.background01,
    shadowColor: palette.gray.black,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
});
