import { useMemo } from 'react';

import { usePlaceSearch } from '@/features/map/hooks/use-place-search';
import type { Coordinate } from '@/features/map/types/home-map-marker';
import type { SearchResultItem } from '@/features/map/types/search-result-item';
import { toPlaceItems } from '@/features/map/utils/to-search-result-items';

/** 해시태그 검색이 붙기 전까지 해시태그 탭은 비어 있다. */
const noHashtagItems: SearchResultItem[] = [];

/**
 * 한 검색어로 결과를 찾는다. 검색 화면과 검색결과 화면이 같이 쓴다.
 * '#'으로 시작하면 해시태그 검색이라서 장소는 찾지 않는다 (Figma: 해시태그 검색은 장소 결과를 주지 않는다).
 */
export function useSearchResults(query: string, myLocation: Coordinate | null) {
  const isHashtagQuery = query.trim().startsWith('#');
  const { places, isSearching, errorMessage } = usePlaceSearch(query, myLocation);

  const placeItems = useMemo(() => toPlaceItems(places), [places]);

  return {
    isHashtagQuery,
    placeItems,
    hashtagItems: noHashtagItems,
    isPlaceSearching: isSearching,
    placeErrorMessage: errorMessage,
  };
}
