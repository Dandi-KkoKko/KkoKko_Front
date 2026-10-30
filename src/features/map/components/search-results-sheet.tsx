import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { radius, screenPaddingX, spacing } from '@/constants/layout';
import { SearchResultList } from '@/features/map/components/search-result-list';
import { SortMenu, type SortOrder } from '@/features/map/components/sort-menu';
import { useVerticalSwipe } from '@/features/map/hooks/use-vertical-swipe';
import type { SearchResultItem } from '@/features/map/types/search-result-item';

type SearchResultsSheetProps = {
  height: number;
  items: SearchResultItem[];
  /** 결과 대신 보여줄 안내 (해시태그 검색의 장소 탭, 결과 없음, 오류) */
  message: string | null;
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
  isExpanded: boolean;
  onExpandedChange: (isExpanded: boolean) => void;
  onPressItem: (item: SearchResultItem) => void;
};

/** 검색결과 화면 아래 패널: 손잡이, 정렬, 결과 목록. 접으면 손잡이와 정렬만 남고 지도가 넓어진다. */
export function SearchResultsSheet({
  height,
  items,
  message,
  sortOrder,
  onSortChange,
  isExpanded,
  onExpandedChange,
  onPressItem,
}: SearchResultsSheetProps) {
  const swipeHandlers = useVerticalSwipe(onExpandedChange);

  return (
    <View style={[styles.sheet, isExpanded && { height }]}>
      <View style={styles.top} {...swipeHandlers}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isExpanded ? '검색결과 접기' : '검색결과 펼치기'}
          onPress={() => onExpandedChange(!isExpanded)}
          style={styles.handleArea}>
          <View style={styles.handle} />
        </Pressable>
        <View style={styles.sort}>
          <SortMenu value={sortOrder} onChange={onSortChange} />
        </View>
      </View>

      {isExpanded && (
        <ScrollView contentContainerStyle={styles.content}>
          {message ? (
            <AppText variant="caption01" color="textTertiary" style={styles.message}>
              {message}
            </AppText>
          ) : (
            <SearchResultList items={items} iconSize={48} onPress={onPressItem} />
          )}
        </ScrollView>
      )}
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
  // 정렬 메뉴가 아래 목록 위로 펼쳐져야 해서, 목록(ScrollView)보다 위에 쌓는다.
  top: {
    zIndex: 1,
  },
  handleArea: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  handle: {
    width: 44,
    height: spacing.xxs,
    borderRadius: radius.full,
    backgroundColor: colors.borderDeactivated,
  },
  sort: {
    paddingHorizontal: screenPaddingX,
    paddingBottom: spacing.md,
  },
  content: {
    paddingHorizontal: screenPaddingX,
    paddingBottom: spacing.xl,
  },
  message: {
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
});
