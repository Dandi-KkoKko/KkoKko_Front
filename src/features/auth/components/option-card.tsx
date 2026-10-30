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

/**
 * 설문 선택지 카드. 고르면 연한 주황 배경에 검정 테두리.
 * 설명이 있으면 Figma selectbox_text(두꺼운 테두리, 큰 모서리), 없으면 selectbox_check 모양이다.
 */
export function OptionCard({ title, description, selected, onPress, right, style }: OptionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.card, description ? styles.textCard : styles.checkCard, selected && styles.selected, style]}>
      <View style={styles.texts}>
        <AppText variant="subtitle03">{title}</AppText>
        {description && (
          <AppText variant="caption02" color="textSecondary">
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
    paddingHorizontal: spacing.md,
    borderColor: colors.borderDeactivated,
    backgroundColor: colors.background01,
  },
  textCard: {
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 2,
  },
  checkCard: {
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1.5,
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
