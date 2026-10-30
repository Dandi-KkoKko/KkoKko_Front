import { useEffect, useState } from 'react';

import { MissingKakaoRestKeyError, searchPlaces } from '@/features/map/api/search-places';
import { defaultMapCenter } from '@/features/map/constants/map-config';
import type { Coordinate } from '@/features/map/types/home-map-marker';
import type { Place } from '@/features/map/types/place';

/** 글자를 칠 때마다 요청하면 카카오 호출 한도를 금방 쓰므로, 손을 멈춘 뒤에 검색한다. */
const debounceMs = 300;

type SearchResult = {
  query: string;
  places: Place[];
  errorMessage: string | null;
};

const emptyResult: SearchResult = { query: '', places: [], errorMessage: null };

/** '#'으로 시작하면 해시태그 검색이라서 장소는 찾지 않는다. */
function isPlaceQuery(query: string) {
  return query.length > 0 && !query.startsWith('#');
}

/**
 * 검색어로 장소를 찾는다. 내 위치를 모르면 기본 위치(캠퍼스) 근처를 먼저 찾되, 거리는 내 위치가 아니라서 보여주지 않는다.
 * 앞 요청이 늦게 도착해 새 결과를 덮지 않도록, 검색어가 바뀌면 앞 요청을 취소한다.
 * 새 결과가 오기 전까지는 앞 결과를 그대로 보여줘서 목록이 깜빡이지 않게 한다.
 */
export function usePlaceSearch(query: string, myLocation: Coordinate | null) {
  const keyword = query.trim();
  const [result, setResult] = useState<SearchResult>(emptyResult);

  useEffect(() => {
    if (!isPlaceQuery(keyword)) return;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      searchPlaces({ query: keyword, near: myLocation ?? defaultMapCenter, signal: controller.signal })
        .then((places) => {
          const visiblePlaces = myLocation ? places : places.map((place) => ({ ...place, distanceMeters: null }));
          setResult({ query: keyword, places: visiblePlaces, errorMessage: null });
        })
        .catch((error: unknown) => {
          if (controller.signal.aborted) return;
          const errorMessage =
            error instanceof MissingKakaoRestKeyError ? error.message : '장소를 불러오지 못했어요. 잠시 후 다시 시도해 주세요';
          setResult({ query: keyword, places: [], errorMessage });
        });
    }, debounceMs);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [keyword, myLocation]);

  if (!isPlaceQuery(keyword)) {
    return { places: [], isSearching: false, errorMessage: null };
  }
  return {
    places: result.places,
    isSearching: result.query !== keyword,
    errorMessage: result.errorMessage,
  };
}
