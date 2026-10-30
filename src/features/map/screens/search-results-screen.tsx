import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, useWindowDimensions, View, type LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { screenPaddingX, spacing } from '@/constants/layout';
import { HashtagSummaryCard } from '@/features/map/components/hashtag-summary-card';
import { RouteStartCard } from '@/features/map/components/route-start-card';
import { SearchQueryBar } from '@/features/map/components/search-query-bar';
import { SearchResultsSheet } from '@/features/map/components/search-results-sheet';
import { SearchTabs, type SearchTab } from '@/features/map/components/search-tabs';
import type { SortOrder } from '@/features/map/components/sort-menu';
import { useMyLocation } from '@/features/map/hooks/use-my-location';
import { useNearbyRecords } from '@/features/map/hooks/use-nearby-records';
import { useRecentSearches } from '@/features/map/hooks/use-recent-searches';
import { useResultsMap } from '@/features/map/hooks/use-results-map';
import { useSearchResults } from '@/features/map/hooks/use-search-results';
import { KakaoMapView } from '@/features/map/kakao-map/kakao-map-view';
import type { SearchResultItem } from '@/features/map/types/search-result-item';
import { openWalkRoute } from '@/features/map/utils/open-search-result';
import { getItemLabel, sortByDistance } from '@/features/map/utils/to-search-result-items';

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
 * Figma '지도 장소 검색 UI', '지도 해시태그 검색 UI', '지도 장소 검색 시 경로 추천 UI'.
 * 위에는 검색어와 장소 / 해시태그 탭, 가운데 지도에는 결과 위치, 아래 패널에는 결과 목록을 둔다.
 * 결과를 하나 고르면 목록 대신 카드를 띄우고, 지도에는 그곳만 핀으로 보여준다.
 * 장소는 해시태그를 골라 경로를 추천받는 카드, 해시태그는 Figma대로 요약만 보여주는 카드다.
 */
export function SearchResultsScreen() {
  const { query = '', select } = useLocalSearchParams<{ query: string; select?: string }>();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const { location } = useMyLocation();
  const { addRecentSearch } = useRecentSearches();
  const search = useSearchResults(query, location);

  const tabOrder: SearchTab[] = search.isHashtagQuery ? ['hashtag', 'place'] : ['place', 'hashtag'];
  const [tab, setTab] = useState<SearchTab>(tabOrder[0]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('distance');
  const [isSheetExpanded, setIsSheetExpanded] = useState(true);
  // 검색 화면에서 결과를 눌러 오면 그 결과를 고른 채로 연다. 결과가 도착하면 key로 찾는다.
  const [selectedKey, setSelectedKey] = useState<string | null>(select ?? null);
  const [cardHeight, setCardHeight] = useState(0);

  // '#' 검색이면 placeItems가 비어 있으므로 장소 탭은 안내만 보인다.
  const tabItems = tab === 'place' ? search.placeItems : search.hashtagItems;
  const items = useMemo(() => (sortOrder === 'distance' ? sortByDistance(tabItems) : tabItems), [sortOrder, tabItems]);
  const selectedItem =
    [...search.placeItems, ...search.hashtagItems].find((item) => item.key === selectedKey) ?? null;
  const nearby = useNearbyRecords(selectedItem?.coordinate ?? null, location);
  const message = getSheetMessage(tab, items, {
    isHashtagQuery: search.isHashtagQuery,
    isSearching: search.isPlaceSearching,
    errorMessage: search.placeErrorMessage,
  });

  const sheetHeight = Math.round(windowHeight * expandedSheetRatio);
  const bottomInset = selectedItem ? cardHeight : isSheetExpanded ? sheetHeight : collapsedSheetHeight;
  const { markers, focus } = useResultsMap(items, selectedItem, bottomInset);

  const selectItem = (item: SearchResultItem) => {
    addRecentSearch(item.kind === 'place' ? item.title : query);
    setSelectedKey(item.key);
  };

  const selectMarker = (markerId: string) => {
    const item = items.find(({ key }) => key === markerId);
    if (item) selectItem(item);
  };

  const closeSelection = () => setSelectedKey(null);
  const reportCardHeight = ({ nativeEvent }: LayoutChangeEvent) => setCardHeight(Math.round(nativeEvent.layout.height));

  const recommendRoute = (hashtags: string[]) => {
    if (!selectedItem) return;
    openWalkRoute({ destinationName: getItemLabel(selectedItem), destination: selectedItem.coordinate, hashtags });
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.xs }]}>
        <SearchQueryBar query={query} />
        <SearchTabs order={tabOrder} selected={tab} onSelect={setTab} />
      </View>

      <View style={styles.mapArea}>
        <KakaoMapView markers={markers} myLocation={location} focus={focus} onMarkerPress={({ id }) => selectMarker(id)} />
        {selectedItem?.kind === 'place' && (
          <RouteStartCard
            key={selectedItem.key}
            item={selectedItem}
            nearby={nearby}
            onClose={closeSelection}
            onRecommend={recommendRoute}
            onLayout={reportCardHeight}
          />
        )}
        {selectedItem?.kind === 'hashtag' && (
          <HashtagSummaryCard
            item={selectedItem}
            nearbyRecordCount={nearby.recordCount}
            onClose={closeSelection}
            onLayout={reportCardHeight}
          />
        )}
        {!selectedItem && (
          <SearchResultsSheet
            height={sheetHeight}
            items={items}
            message={message}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            isExpanded={isSheetExpanded}
            onExpandedChange={setIsSheetExpanded}
            onPressItem={selectItem}
          />
        )}
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
