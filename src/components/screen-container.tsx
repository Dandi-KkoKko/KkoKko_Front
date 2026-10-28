import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { screenPaddingX, spacing } from '@/constants/layout';

type ScreenContainerProps = {
  children: ReactNode;
  /** 화면 맨 위에 고정 (뒤로가기, 진행 표시 등) */
  header?: ReactNode;
  /** 화면 맨 아래에 고정 (다음, 완료 버튼 등) */
  footer?: ReactNode;
  /** 탭 바가 있는 화면은 아래 안전 영역을 탭 바가 처리하므로 false */
  withBottomInset?: boolean;
  /** 흰 카드들을 올리는 화면(마이, 설정)은 회색 배경 */
  background?: 'white' | 'gray';
};

/** 모든 화면의 바깥 틀. 좌우 여백, 안전 영역, 위·아래 고정 영역을 맞춘다. */
export function ScreenContainer({
  children,
  header,
  footer,
  withBottomInset = true,
  background = 'white',
}: ScreenContainerProps) {
  return (
    <SafeAreaView
      style={[styles.safeArea, background === 'gray' && styles.grayBackground]}
      edges={withBottomInset ? ['top', 'bottom'] : ['top']}>
      {header && <View style={styles.header}>{header}</View>}
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
      {footer && <View style={styles.footer}>{footer}</View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background01,
  },
  grayBackground: {
    backgroundColor: colors.background02,
  },
  header: {
    paddingHorizontal: screenPaddingX,
    paddingTop: spacing.xs,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: screenPaddingX,
    paddingVertical: spacing.xl,
  },
  footer: {
    paddingHorizontal: screenPaddingX,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
});
