import type { ReactNode } from 'react';
import { StyleSheet, View, type DimensionValue } from 'react-native';

import { colors } from '@/constants/colors';
import { floatingShadow, radius, screenPaddingX, spacing } from '@/constants/layout';

type BottomPanelProps = {
  children: ReactNode;
  /** 정하지 않으면 내용 높이만큼. 목록처럼 길면 '75%'처럼 정한다. */
  height?: DimensionValue;
};

/**
 * 지도 아래에서 올라온 창(바텀시트) 모양. 지금은 고정된 모양만 있다.
 * 손으로 끌어 올리고 내리는 기능이 필요하면 @gorhom/bottom-sheet 같은 라이브러리로 바꾼다.
 */
export function BottomPanel({ children, height }: BottomPanelProps) {
  return (
    <View style={[styles.panel, { height }]}>
      <View style={styles.handle} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    ...floatingShadow,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    gap: spacing.sm,
    paddingHorizontal: screenPaddingX,
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    backgroundColor: colors.background01,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: colors.borderDeactivated,
  },
});
