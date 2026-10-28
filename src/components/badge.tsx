import { StyleSheet, View, type ViewStyle } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors, type ColorName } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

/** highlight: 강조(맛보기 등) / dark: 상태 알림 / light: 지도 위 이름표 / muted: 회색 해시태그 / dashed: 빈 자리 */
type BadgeTone = 'highlight' | 'dark' | 'light' | 'muted' | 'dashed';

type BadgeProps = {
  label: string;
  tone?: BadgeTone;
  /** 기본은 왼쪽 정렬. 가운데·오른쪽에 둘 때 alignSelf를 넘긴다. */
  style?: ViewStyle;
};

const textColor: Record<BadgeTone, ColorName> = {
  highlight: 'textPrimary',
  dark: 'textInverse',
  light: 'textPrimary',
  muted: 'textPrimary',
  dashed: 'textPrimary',
};

/** 맛보기, 곧 열려요, AI 추천 같은 작은 상태 표시 */
export function Badge({ label, tone = 'light', style }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[tone], style]}>
      <AppText variant="caption03" color={textColor[tone]}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  highlight: {
    backgroundColor: colors.selectedBackground,
  },
  dark: {
    backgroundColor: colors.textPrimary,
  },
  light: {
    backgroundColor: colors.background01,
  },
  muted: {
    backgroundColor: colors.background02,
  },
  dashed: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
  },
});
