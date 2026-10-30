import { useMemo } from 'react';

import { nearbyRecordRadiusMeters } from '@/features/map/constants/map-config';
import { useHomeMapMarkers } from '@/features/map/hooks/use-home-map-markers';
import type { Coordinate, PhotoMarker } from '@/features/map/types/home-map-marker';
import { summarizeNearbyRecords } from '@/features/map/utils/summarize-nearby-records';

const isPhoto = (marker: { kind: string }): marker is PhotoMarker => marker.kind === 'photo';

/**
 * 고른 장소 근처에 남겨진 기록. 기록은 지도 홈과 같은 곳(useHomeMapMarkers)에서 가져온다.
 * 서버가 나오면 '이 장소 근처 기록' API로 바꾼다.
 */
export function useNearbyRecords(center: Coordinate | null, myLocation: Coordinate | null) {
  const { markers } = useHomeMapMarkers(myLocation);

  return useMemo(
    () =>
      center
        ? summarizeNearbyRecords(markers.filter(isPhoto), center, nearbyRecordRadiusMeters)
        : { recordCount: 0, hashtags: [], representative: null },
    [markers, center],
  );
}
