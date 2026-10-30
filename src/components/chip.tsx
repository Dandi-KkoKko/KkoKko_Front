import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon, type IconName } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

type ChipProps = {
  label: string;
  selected?: boolean;
  icon?: IconName;
  onPress?: () => void;
};

/** Figma 기록탭 hashtag. 해시태그·필터·최근 검색어처럼 동그란 작은 버튼. 고르면 검정으로 바뀐다. */
export function Chip({ label, selected = false, icon, onPress }: ChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.chip, selected && styles.selected]}>
      {icon && <Icon name={icon} size={16} color={selected ? 'textInverse' : undefined} />}
      <AppText variant={selected ? 'button03' : 'button04'} color={selected ? 'textInverse' : 'textPrimary'}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.background02,
  },
  selected: {
    backgroundColor: colors.textPrimary,
  },
});
