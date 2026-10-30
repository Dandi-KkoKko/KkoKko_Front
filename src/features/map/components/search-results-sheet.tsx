import { StyleSheet } from 'react-native';

import { AppText } from '@/components/app-text';
import { spacing } from '@/constants/layout';
import { MapBottomSheet } from '@/features/map/components/map-bottom-sheet';
import { SearchResultList } from '@/features/map/components/search-result-list';
import { SortMenu, type SortOrder } from '@/features/map/components/sort-menu';
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

/** 검색결과 화면 아래 패널: 정렬 버튼과 결과 목록. 접으면 정렬만 남고 지도가 넓어진다. */
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
  return (
    <MapBottomSheet
      height={height}
      isExpanded={isExpanded}
      onExpandedChange={onExpandedChange}
      label="검색결과"
      header={<SortMenu value={sortOrder} onChange={onSortChange} />}>
      {message ? (
        <AppText variant="caption01" color="textTertiary" style={styles.message}>
          {message}
        </AppText>
      ) : (
        <SearchResultList items={items} iconSize={48} onPress={onPressItem} />
      )}
    </MapBottomSheet>
  );
}

const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
});
