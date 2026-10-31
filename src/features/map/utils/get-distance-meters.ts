import type { Coordinate } from '@/features/map/types/home-map-marker';

const earthRadiusMeters = 6_371_000;

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

/** 두 좌표 사이의 거리(m). 지구를 공으로 보는 하버사인 공식을 쓴다. */
export function getDistanceMeters(from: Coordinate, to: Coordinate) {
  const latitudeDelta = toRadians(to.latitude - from.latitude);
  const longitudeDelta = toRadians(to.longitude - from.longitude);
  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(toRadians(from.latitude)) * Math.cos(toRadians(to.latitude)) * Math.sin(longitudeDelta / 2) ** 2;
  return 2 * earthRadiusMeters * Math.asin(Math.sqrt(a));
}
