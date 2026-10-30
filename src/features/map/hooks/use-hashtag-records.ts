import { useMemo } from 'react';

import { useHomeMapMarkers } from '@/features/map/hooks/use-home-map-markers';
import type { Coordinate, PhotoMarker } from '@/features/map/types/home-map-marker';

const isPhoto = (marker: { kind: string }): marker is PhotoMarker => marker.kind === 'photo';

/**
 * 이 해시태그가 붙은 기록 전부. 해시태그 결과를 고르면 지도에 기록 자리마다 핀을 찍는 데 쓴다.
 * 기록은 지도 홈과 같은 곳(useHomeMapMarkers)에서 가져온다.
 */
export function useHashtagRecords(hashtag: string | null, myLocation: Coordinate | null) {
  const { markers } = useHomeMapMarkers(myLocation);

  return useMemo(
    () => (hashtag ? markers.filter(isPhoto).filter((record) => record.hashtags.includes(hashtag)) : []),
    [markers, hashtag],
  );
}
