import { useMemo, useState } from 'react';

import { defaultMapCenter } from '@/features/map/constants/map-config';
import { getPreviewHomeMarkers } from '@/features/map/constants/preview-markers';
import type { Coordinate } from '@/features/map/types/home-map-marker';
import { findNearestPhoto, markOpenPhotos } from '@/features/map/utils/home-map-markers';

/**
 * 지도 홈에 올릴 마커와 가장 가까운 기록.
 * 지금은 가짜 마커를 쓴다. 처음 받은 내 위치 주변에 놓고 그 자리에 고정한다. 매번 내 위치 기준으로 다시 놓으면 마커가 나를 따라다닌다.
 * 서버 데이터가 오면 getPreviewHomeMarkers 대신 서버에서 받은 마커를 넣는다.
 */
export function useHomeMapMarkers(myLocation: Coordinate | null) {
  const [origin, setOrigin] = useState<Coordinate | null>(null);

  if (!origin && myLocation) {
    setOrigin(myLocation);
  }

  const previewMarkers = useMemo(() => getPreviewHomeMarkers(origin ?? defaultMapCenter), [origin]);
  const markers = useMemo(() => markOpenPhotos(previewMarkers, myLocation), [previewMarkers, myLocation]);
  const nearestPhoto = useMemo(
    () => findNearestPhoto(markers, myLocation ?? origin ?? defaultMapCenter),
    [markers, myLocation, origin],
  );

  return { markers, nearestPhoto };
}
