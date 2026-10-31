import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { radius, spacing, toggleShadow } from '@/constants/layout';

type SegmentedToggleProps<T extends string> = {
  options: readonly T[];
  selected: T;
  onSelect: (option: T) => void;
};

/** 리스트 / 지도처럼 보기 방식을 바꾸는 작은 토글 (Figma toggle_element) */
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
            <AppText variant={isSelected ? 'button03' : 'button04'} color={isSelected ? 'textPrimary' : 'textSecondary'}>
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
    gap: spacing.xxs,
    borderRadius: radius.md,
    backgroundColor: colors.disabledBackground,
  },
  option: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.sm,
  },
  selected: {
    ...toggleShadow,
    backgroundColor: colors.background01,
  },
});
