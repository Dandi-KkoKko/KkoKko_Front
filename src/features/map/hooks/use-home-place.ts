import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';

import type { Coordinate } from '@/features/map/types/home-map-marker';
import type { SearchResultItem } from '@/features/map/types/search-result-item';
import { getDistanceMeters } from '@/features/map/utils/get-distance-meters';

type HomePlaceParams = {
  placeName?: string;
  placeAddress?: string;
  latitude?: string;
  longitude?: string;
};

/**
 * 검색에서 넘겨받아 지도 홈에서 고른 장소 (openPlaceOnHome이 주소에 실어 보낸다).
 * 주소에 담아 두면 뒤로 가기나 앱 재시작에도 같은 장소가 열리고, 홈이 검색 화면 상태를 몰라도 된다.
 */
export function useHomePlace(myLocation: Coordinate | null) {
  const { placeName, placeAddress, latitude, longitude } = useLocalSearchParams<HomePlaceParams>();

  const place = useMemo<SearchResultItem | null>(() => {
    if (!placeName || !latitude || !longitude) return null;
    const coordinate = { latitude: Number(latitude), longitude: Number(longitude) };
    return {
      key: `home-${latitude},${longitude}`,
      kind: 'place',
      title: placeName,
      address: placeAddress ?? '',
      distanceMeters: myLocation ? getDistanceMeters(myLocation, coordinate) : null,
      coordinate,
    };
  }, [placeName, placeAddress, latitude, longitude, myLocation]);

  const clearPlace = () =>
    router.setParams({ placeName: undefined, placeAddress: undefined, latitude: undefined, longitude: undefined });

  return { place, clearPlace };
}
