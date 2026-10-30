import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type LayoutChangeEvent } from 'react-native';

import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, screenPaddingX, spacing } from '@/constants/layout';

const closeButtonSize = 36;

type MapBottomCardProps = {
  /** 지도가 카드에 가리지 않게 맞추려고 카드 높이를 알린다. */
  onLayout: (event: LayoutChangeEvent) => void;
  children: ReactNode;
};

/**
 * 검색결과에서 한 곳을 골랐을 때 화면 아래에 붙는 흰 카드 (장소 카드, 해시태그 카드가 같이 쓴다).
 * 목록 패널과 달리 접고 펼치지 않아서, 손잡이는 모양만 둔다.
 */
export function MapBottomCard({ onLayout, children }: MapBottomCardProps) {
  return (
    <View style={styles.card} onLayout={onLayout}>
      <View style={styles.handle} />
      {children}
    </View>
  );
}

/** 카드 오른쪽 위의 회색 동그라미 X. 고른 것을 풀고 목록으로 돌아간다. */
export function CardCloseButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="선택 닫기" onPress={onPress} style={styles.close}>
      <Icon name="close" size={20} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // 화면 아래에 붙고, 위쪽 모서리만 크게 둥글린다 (Figma 32).
  card: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    gap: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
    paddingHorizontal: screenPaddingX,
    borderTopLeftRadius: radius.xl + spacing.xs,
    borderTopRightRadius: radius.xl + spacing.xs,
    backgroundColor: colors.background01,
    shadowColor: colors.textPrimary,
    shadowOpacity: 0.1,
    shadowRadius: radius.lg,
    shadowOffset: { width: 0, height: -spacing.xxs },
    elevation: 8,
  },
  handle: {
    alignSelf: 'center',
    width: 44,
    height: spacing.xxs,
    borderRadius: radius.full,
    backgroundColor: colors.borderDeactivated,
  },
  close: {
    alignSelf: 'flex-start',
    width: closeButtonSize,
    height: closeButtonSize,
    borderRadius: radius.full,
    backgroundColor: colors.disabledBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
