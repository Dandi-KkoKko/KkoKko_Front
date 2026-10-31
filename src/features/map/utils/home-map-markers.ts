import { openRadiusMeters } from '@/features/map/constants/map-config';
import type { Coordinate, HomeMapMarker, PhotoMarker } from '@/features/map/types/home-map-marker';
import { getDistanceMeters } from '@/features/map/utils/get-distance-meters';

/** 내 위치에서 열림 반경 안에 있는 사진만 연다. 위치를 모르면 아무것도 열지 않는다. */
export function markOpenPhotos(markers: HomeMapMarker[], myLocation: Coordinate | null): HomeMapMarker[] {
  return markers.map((marker) =>
    marker.kind === 'photo'
      ? { ...marker, isOpen: myLocation !== null && getDistanceMeters(myLocation, marker.coordinate) <= openRadiusMeters }
      : marker,
  );
}

/** 기준점에서 가장 가까운 사진. 묶음은 하나의 기록이 아니라서 뺀다. */
export function findNearestPhoto(markers: HomeMapMarker[], from: Coordinate): PhotoMarker | null {
  let nearest: PhotoMarker | null = null;
  let nearestDistance = Infinity;

  for (const marker of markers) {
    if (marker.kind !== 'photo') continue;
    const distance = getDistanceMeters(from, marker.coordinate);
    if (distance < nearestDistance) {
      nearest = marker;
      nearestDistance = distance;
    }
  }
  return nearest;
}
