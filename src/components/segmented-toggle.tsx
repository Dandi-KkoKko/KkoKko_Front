import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { floatingShadow, radius, spacing } from '@/constants/layout';

type SegmentedToggleProps<T extends string> = {
  options: readonly T[];
  selected: T;
  onSelect: (option: T) => void;
};

/** 리스트 / 지도처럼 보기 방식을 바꾸는 작은 토글 */
export function SegmentedToggle<T extends string>({ options, selected, onSelect }: SegmentedToggleProps<T>) {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = option === selected;
        return (
          <Pressable
            key={option}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(option)}
            style={[styles.option, isSelected && styles.selected]}>
            <AppText variant={isSelected ? 'button05' : 'button06'} color={isSelected ? 'textPrimary' : 'textTertiary'}>
              {option}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.xxs,
    borderRadius: radius.md,
    backgroundColor: colors.background02,
  },
  option: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
  },
  selected: {
    ...floatingShadow,
    backgroundColor: colors.background01,
  },
});
