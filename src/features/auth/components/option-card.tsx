import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

type OptionCardProps = {
  title: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
  /** 오른쪽 끝 (예: 체크박스) */
  right?: ReactNode;
  style?: ViewStyle;
};

/** 설문 선택지 카드. 고르면 배경과 테두리가 강조된다. */
export function OptionCard({ title, description, selected, onPress, right, style }: OptionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.card, selected && styles.selected, style]}>
      <View style={styles.texts}>
        <AppText variant="subtitle03">{title}</AppText>
        {description && (
          <AppText variant="caption01" color="textSecondary">
            {description}
          </AppText>
        )}
      </View>
      {right}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.disabledBackground,
    backgroundColor: colors.background01,
  },
  selected: {
    borderColor: colors.textPrimary,
    backgroundColor: colors.selectedBackground,
  },
  texts: {
    flex: 1,
    gap: spacing.xxs,
  },
});
