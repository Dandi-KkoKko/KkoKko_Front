import { useMemo } from 'react';

import { useHashtagSearch } from '@/features/map/hooks/use-hashtag-search';
import { usePlaceSearch } from '@/features/map/hooks/use-place-search';
import type { Coordinate } from '@/features/map/types/home-map-marker';
import { toHashtagItems, toPlaceItems } from '@/features/map/utils/to-search-result-items';

/**
 * 한 검색어로 장소와 해시태그를 함께 찾는다. 검색 화면과 검색결과 화면이 같이 쓴다.
 * '#'으로 시작하면 해시태그 검색이라서 장소는 찾지 않는다 (Figma: 해시태그 검색은 장소 결과를 주지 않는다).
 */
export function useSearchResults(query: string, myLocation: Coordinate | null) {
  const isHashtagQuery = query.trim().startsWith('#');
  const { places, isSearching, errorMessage } = usePlaceSearch(query, myLocation);
  const hashtagResults = useHashtagSearch(query, myLocation);

  const placeItems = useMemo(() => toPlaceItems(places), [places]);
  // 내 위치를 모르면 거리는 기본 위치 기준이라 보여주지 않는다 (장소 결과와 같은 규칙).
  const hashtagItems = useMemo(() => {
    const items = toHashtagItems(hashtagResults);
    return myLocation ? items : items.map((item) => ({ ...item, distanceMeters: null }));
  }, [hashtagResults, myLocation]);

  return {
    isHashtagQuery,
    placeItems,
    hashtagItems,
    isPlaceSearching: isSearching,
    placeErrorMessage: errorMessage,
  };
}
