import { useEffect, useMemo, useSyncExternalStore } from 'react';

import { defaultMapCenter } from '@/features/map/constants/map-config';
import { getPreviewHomeMarkers } from '@/features/map/constants/preview-markers';
import { isPhotoMarker, type Coordinate } from '@/features/map/types/home-map-marker';
import { findNearestPhoto, markOpenPhotos } from '@/features/map/utils/home-map-markers';

/*
 * 가짜 마커를 놓는 기준점. 앱에서 처음 받은 내 위치 하나로 고정하고 모든 화면이 같이 쓴다.
 * 화면마다 따로 정하면 같은 기록이 화면마다 다른 자리에 놓여, 열림 여부나 경로가 어긋난다.
 * 서버 데이터가 오면 이 기준점은 필요 없어진다.
 */
let previewOrigin: Coordinate | null = null;
const originListeners = new Set<() => void>();

function anchorPreviewOrigin(location: Coordinate) {
  if (previewOrigin) return;
  previewOrigin = location;
  originListeners.forEach((listener) => listener());
}

const subscribeOrigin = (listener: () => void) => {
  originListeners.add(listener);
  return () => originListeners.delete(listener);
};
const getOrigin = () => previewOrigin;

/**
 * 지도 홈에 올릴 마커와 가장 가까운 기록.
 * - records: 사진 기록만, 내 위치와 상관없이 늘 같은 배열. 경로·검색처럼 걸을 때마다 다시 계산하면 안 되는 곳에 쓴다.
 * - markers: 내 위치로 열림(isOpen)까지 정한 지도 마커. 걸을 때마다 새로 만들어진다.
 * 서버 데이터가 오면 getPreviewHomeMarkers 대신 서버에서 받은 마커를 넣는다.
 */
export function useHomeMapMarkers(myLocation: Coordinate | null) {
  const origin = useSyncExternalStore(subscribeOrigin, getOrigin, getOrigin);

  useEffect(() => {
    if (myLocation) anchorPreviewOrigin(myLocation);
  }, [myLocation]);

  const previewMarkers = useMemo(() => getPreviewHomeMarkers(origin ?? defaultMapCenter), [origin]);
  const records = useMemo(() => previewMarkers.filter(isPhotoMarker), [previewMarkers]);
  const markers = useMemo(() => markOpenPhotos(previewMarkers, myLocation), [previewMarkers, myLocation]);
  const nearestPhoto = useMemo(
    () => findNearestPhoto(markers, myLocation ?? origin ?? defaultMapCenter),
    [markers, myLocation, origin],
  );

  return { markers, records, nearestPhoto };
}
