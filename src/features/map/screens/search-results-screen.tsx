import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, useWindowDimensions, View, type LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { screenPaddingX, spacing } from '@/constants/layout';
import { AiBadge } from '@/features/map/components/ai-badge';
import { SearchQueryBar } from '@/features/map/components/search-query-bar';
import { SearchResultsSheet } from '@/features/map/components/search-results-sheet';
import { SearchTabs, type SearchTab } from '@/features/map/components/search-tabs';
import { SelectedResultCard } from '@/features/map/components/selected-result-card';
import type { SortOrder } from '@/features/map/components/sort-menu';
import { useMyLocation } from '@/features/map/hooks/use-my-location';
import { useRecentSearches } from '@/features/map/hooks/use-recent-searches';
import { useResultSelection } from '@/features/map/hooks/use-result-selection';
import { useResultsMap } from '@/features/map/hooks/use-results-map';
import { useSearchResults } from '@/features/map/hooks/use-search-results';
import { KakaoMapView } from '@/features/map/kakao-map/kakao-map-view';
import type { SearchResultItem } from '@/features/map/types/search-result-item';
import type { PhotoMarker } from '@/features/map/types/home-map-marker';
import { openPlaceOnHome, openWalkRoute } from '@/features/map/utils/open-search-result';
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
 * Figma '지도 장소 / 해시태그 검색 UI'와 그 뒤 '경로 추천 UI'들. 위에는 검색어와 탭, 가운데 지도, 아래 목록이나 카드를 둔다.
 * 결과를 고르면 목록 대신 카드가 뜬다 (장소 → 경로 추천, 해시태그 → 기록 핀). 무엇을 골랐는지는 useResultSelection이 다룬다.
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
  const [cardHeight, setCardHeight] = useState(0);

  // '#' 검색이면 placeItems가 비어 있으므로 장소 탭은 안내만 보인다.
  const tabItems = tab === 'place' ? search.placeItems : search.hashtagItems;
  const items = useMemo(() => (sortOrder === 'distance' ? sortByDistance(tabItems) : tabItems), [sortOrder, tabItems]);
  const allItems = useMemo(() => [...search.placeItems, ...search.hashtagItems], [search.placeItems, search.hashtagItems]);
  const selection = useResultSelection({ items, allItems, initialKey: select ?? null, myLocation: location });

  const sheetHeight = Math.round(windowHeight * expandedSheetRatio);
  const bottomInset = selection.card ? cardHeight : isSheetExpanded ? sheetHeight : collapsedSheetHeight;
  const { markers, focus, routePath } = useResultsMap(selection.mapView, bottomInset);

  const selectItem = (item: SearchResultItem) => {
    addRecentSearch(item.kind === 'place' ? item.title : query);
    selection.select(item.key);
  };

  const walkThisRoute = () => {
    const { routePlan } = selection;
    if (!routePlan) return;
    openWalkRoute({ destinationName: routePlan.destinationName, destination: routePlan.destination, hashtags: routePlan.hashtags });
  };

  const openRecordOnHome = (record: PhotoMarker, regionName: string) =>
    openPlaceOnHome({ name: record.placeName ?? regionName, address: regionName, coordinate: record.coordinate });

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.xs }]}>
        <SearchQueryBar query={query} />
        <SearchTabs order={tabOrder} selected={tab} onSelect={setTab} />
      </View>

      <View style={styles.mapArea}>
        <KakaoMapView
          markers={markers}
          myLocation={location}
          focus={focus}
          routePath={routePath}
          onMarkerPress={({ id }) => selection.pressMarker(id)}
        />
        {selection.routePlan && <AiBadge label="AI 추천 경로" style={styles.aiBadge} />}

        {selection.card ? (
          <SelectedResultCard
            state={selection.card}
            cardHeight={cardHeight}
            onLayout={({ nativeEvent }: LayoutChangeEvent) => setCardHeight(Math.round(nativeEvent.layout.height))}
            onClose={selection.close}
            onRecommend={selection.recommendRoute}
            onRouteExpandedChange={selection.setIsRouteExpanded}
            onWalk={walkThisRoute}
            onOpenRecord={openRecordOnHome}
          />
        ) : (
          <SearchResultsSheet
            height={sheetHeight}
            items={items}
            message={getSheetMessage(tab, items, {
              isHashtagQuery: search.isHashtagQuery,
              isSearching: search.isPlaceSearching,
              errorMessage: search.placeErrorMessage,
            })}
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
  aiBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: screenPaddingX,
  },
});
