import { useMemo, useState } from 'react';

import { defaultMapCenter } from '@/features/map/constants/map-config';
import { getPreviewHomeMarkers } from '@/features/map/constants/preview-markers';
import type { Coordinate } from '@/features/map/types/home-map-marker';

/**
 * 서버 데이터가 오기 전까지 쓰는 가짜 마커.
 * 처음 받은 내 위치 주변에 놓고 그 자리에 고정한다. 매번 내 위치 기준으로 다시 놓으면 마커가 나를 따라다닌다.
 * 서버 데이터가 오면 이 훅은 지운다.
 */
export function usePreviewHomeMarkers(myLocation: Coordinate | null) {
  const [origin, setOrigin] = useState<Coordinate | null>(null);

  if (!origin && myLocation) {
    setOrigin(myLocation);
  }

  return useMemo(() => getPreviewHomeMarkers(origin ?? defaultMapCenter), [origin]);
}
