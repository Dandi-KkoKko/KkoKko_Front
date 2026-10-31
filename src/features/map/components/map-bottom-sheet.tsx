import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { colors } from '@/constants/colors';
import { radius, screenPaddingX, spacing } from '@/constants/layout';
import { SheetHandle } from '@/features/map/components/sheet-handle';
import { useVerticalSwipe } from '@/features/map/hooks/use-vertical-swipe';

type MapBottomSheetProps = {
  /** 펼쳤을 때 높이(px). 지도 화면이 이 값으로 지도에 가리는 영역을 계산한다. */
  height: number;
  isExpanded: boolean;
  onExpandedChange: (isExpanded: boolean) => void;
  /** 손잡이를 누를 때 읽어 주는 이름 ('검색결과', '묶음 기록' 등) */
  label: string;
  /** 접어도 남는 윗부분 (제목, 정렬 버튼 등) */
  header: ReactNode;
  /** 펼쳤을 때만 보이는 목록. 길면 패널 안에서 스크롤된다. */
  children: ReactNode;
};

/**
 * 지도 화면 아래에 붙는 흰 패널. 검색결과, 묶음 기록이 같이 쓴다.
 * 손잡이를 누르거나 위아래로 밀면 접고 펼친다. 접으면 header만 남아 지도가 넓어진다.
 */
export function MapBottomSheet({ height, isExpanded, onExpandedChange, label, header, children }: MapBottomSheetProps) {
  const swipeHandlers = useVerticalSwipe(onExpandedChange);

  return (
    <View style={[styles.sheet, isExpanded && { height }]}>
      <View style={styles.top} {...swipeHandlers}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${label} ${isExpanded ? '접기' : '펼치기'}`}
          onPress={() => onExpandedChange(!isExpanded)}
          style={styles.handleArea}>
          <SheetHandle />
        </Pressable>
        <View style={styles.header}>{header}</View>
      </View>

      {isExpanded && <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>}
    </View>
  );
}

const styles = StyleSheet.create({
  // 패널이 위로 지도를 덮으므로, 그림자를 위쪽으로 드리운다.
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    backgroundColor: colors.background01,
    shadowColor: colors.textPrimary,
    shadowOpacity: 0.1,
    shadowRadius: radius.lg,
    shadowOffset: { width: 0, height: -spacing.xxs },
    elevation: 8,
  },
  // 정렬 메뉴처럼 header에서 펼쳐지는 것이 아래 목록 위로 보여야 해서, 목록(ScrollView)보다 위에 쌓는다.
  top: {
    zIndex: 1,
  },
  handleArea: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  header: {
    paddingHorizontal: screenPaddingX,
    paddingBottom: spacing.md,
  },
  content: {
    paddingHorizontal: screenPaddingX,
    paddingBottom: spacing.xl,
  },
});
