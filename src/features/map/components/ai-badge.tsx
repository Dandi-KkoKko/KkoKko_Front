import { StyleSheet, View, type ViewStyle } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

type AiBadgeProps = {
  label: string;
  style?: ViewStyle;
};

/**
 * 'AI 추천순', 'AI 추천 경로'처럼 AI가 정한 것임을 알리는 연한 주황 배지.
 * Figma에는 글자 앞에 반짝이(✦) 아이콘이 있는데, 공통 아이콘에 없어서 아직 빠져 있다.
 */
export function AiBadge({ label, style }: AiBadgeProps) {
  return (
    <View style={[styles.badge, style]}>
      <AppText variant="caption03" color="primary">
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.sm,
    backgroundColor: colors.selectedBackground,
  },
});
