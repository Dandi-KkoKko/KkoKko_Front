import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { screenPaddingX, spacing } from '@/constants/layout';
import { SearchQueryBar } from '@/features/map/components/search-query-bar';
import { SearchResultsSheet } from '@/features/map/components/search-results-sheet';
import { SearchTabs, type SearchTab } from '@/features/map/components/search-tabs';
import type { SortOrder } from '@/features/map/components/sort-menu';
import { useMyLocation } from '@/features/map/hooks/use-my-location';
import { useRecentSearches } from '@/features/map/hooks/use-recent-searches';
import { useSearchResults } from '@/features/map/hooks/use-search-results';
import { KakaoMapView } from '@/features/map/kakao-map/kakao-map-view';
import type { SearchResultItem } from '@/features/map/types/search-result-item';
import { openPlace, openRecord } from '@/features/map/utils/open-search-result';
import { sortByDistance } from '@/features/map/utils/to-search-result-items';

/** 펼친 목록은 화면의 이만큼을 차지한다. Figma에서 지도와 목록이 거의 반씩이다. */
const expandedSheetRatio = 0.45;
/** 접었을 때 남는 손잡이와 정렬 버튼 높이 */
const collapsedSheetHeight = 92;

const hashtagOnlyMessage = '해시태그 검색은 장소 검색 결과가 제공되지 않습니다';

function getSheetMessage(tab: SearchTab, items: SearchResultItem[], options: {
  isHashtagQuery: boolean;
  isSearching: boolean;
  errorMessage: string | null;
}) {
  if (tab === 'place' && options.isHashtagQuery) return hashtagOnlyMessage;
  if (tab === 'place' && options.errorMessage) return options.errorMessage;
  if (items.length === 0 && !options.isSearching) return '검색결과가 없어요';
  return null;
}

/**
 * Figma '지도 장소 검색 UI', '지도 해시태그 검색 UI'. 검색 화면에서 키보드의 검색을 누르면 온다.
 * 위에는 검색어와 장소 / 해시태그 탭, 가운데 지도에는 결과 위치, 아래 패널에는 결과 목록을 둔다.
 */
export function SearchResultsScreen() {
  const { query = '' } = useLocalSearchParams<{ query: string }>();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const { location } = useMyLocation();
  const { addRecentSearch } = useRecentSearches();
  const search = useSearchResults(query, location);

  const tabOrder: SearchTab[] = search.isHashtagQuery ? ['hashtag', 'place'] : ['place', 'hashtag'];
  const [tab, setTab] = useState<SearchTab>(tabOrder[0]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('distance');
  const [isSheetExpanded, setIsSheetExpanded] = useState(true);

  // '#' 검색이면 placeItems가 비어 있으므로 장소 탭은 안내만 보인다.
  const tabItems = tab === 'place' ? search.placeItems : search.hashtagItems;
  const items = useMemo(() => (sortOrder === 'distance' ? sortByDistance(tabItems) : tabItems), [sortOrder, tabItems]);
  const message = getSheetMessage(tab, items, {
    isHashtagQuery: search.isHashtagQuery,
    isSearching: search.isPlaceSearching,
    errorMessage: search.placeErrorMessage,
  });

  const sheetHeight = Math.round(windowHeight * expandedSheetRatio);
  const markers = useMemo(() => items.map((item) => ({ kind: 'result' as const, id: item.key, coordinate: item.coordinate })), [items]);
  // 목록에 가려지지 않는 위쪽 지도에 결과가 모두 들어오도록 맞춘다.
  const focus = useMemo(
    () => ({
      coordinates: items.map((item) => item.coordinate),
      padding: {
        top: spacing.xxl,
        right: spacing.xxl,
        bottom: (isSheetExpanded ? sheetHeight : collapsedSheetHeight) + spacing.xxl,
        left: spacing.xxl,
      },
    }),
    [items, isSheetExpanded, sheetHeight],
  );

  const openItem = (item: SearchResultItem) => {
    addRecentSearch(item.target.type === 'place' ? item.title : query);
    if (item.target.type === 'place') openPlace(item.target.place);
    else openRecord(item.target.recordId);
  };

  const openMarker = (markerId: string) => {
    const item = items.find(({ key }) => key === markerId);
    if (item) openItem(item);
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.xs }]}>
        <SearchQueryBar query={query} />
        <SearchTabs order={tabOrder} selected={tab} onSelect={setTab} />
      </View>

      <View style={styles.mapArea}>
        <KakaoMapView markers={markers} myLocation={location} focus={focus} onMarkerPress={({ id }) => openMarker(id)} />
        <SearchResultsSheet
          height={sheetHeight}
          items={items}
          message={message}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          isExpanded={isSheetExpanded}
          onExpandedChange={setIsSheetExpanded}
          onPressItem={openItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background01,
  },
  header: {
    gap: spacing.xs,
    paddingHorizontal: screenPaddingX,
    backgroundColor: colors.background01,
  },
  mapArea: {
    flex: 1,
  },
});
