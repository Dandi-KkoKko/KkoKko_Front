import { useMemo } from 'react';

import { nearbyRecordRadiusMeters } from '@/features/map/constants/map-config';
import { useHomeMapMarkers } from '@/features/map/hooks/use-home-map-markers';
import type { Coordinate } from '@/features/map/types/home-map-marker';
import { summarizeNearbyRecords } from '@/features/map/utils/summarize-nearby-records';

/**
 * 고른 장소 근처에 남겨진 기록. 기록은 지도 홈과 같은 곳(useHomeMapMarkers)에서 가져온다.
 * 서버가 나오면 '이 장소 근처 기록' API로 바꾼다.
 */
export function useNearbyRecords(center: Coordinate | null, myLocation: Coordinate | null) {
  const { records } = useHomeMapMarkers(myLocation);

  return useMemo(
    () =>
      center
        ? summarizeNearbyRecords(records, center, nearbyRecordRadiusMeters)
        : { recordCount: 0, hashtags: [], representative: null },
    [records, center],
  );
}
