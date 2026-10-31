import type { Coordinate } from '@/features/map/types/home-map-marker';

/**
 * 캠퍼스 안처럼 걸어서 갈 짧은 거리는 지구를 평면으로 봐도 오차가 아주 작다.
 * 그래서 위도·경도와 '기준점에서 몇 m'를 단순 비례로 오간다.
 */
const metersPerLatitudeDegree = 111_320;

const metersPerLongitudeDegree = (latitude: number) => metersPerLatitudeDegree * Math.cos((latitude * Math.PI) / 180);

/** 기준점에서 북쪽·동쪽으로 몇 m 떨어진 좌표 */
export function offsetCoordinate(origin: Coordinate, northMeters: number, eastMeters: number): Coordinate {
  return {
    latitude: origin.latitude + northMeters / metersPerLatitudeDegree,
    longitude: origin.longitude + eastMeters / metersPerLongitudeDegree(origin.latitude),
  };
}

/** 기준점을 원점으로 둔 평면 좌표(m). x는 동쪽, y는 북쪽이다. */
export function toLocalMeters(origin: Coordinate, point: Coordinate) {
  return {
    x: (point.longitude - origin.longitude) * metersPerLongitudeDegree(origin.latitude),
    y: (point.latitude - origin.latitude) * metersPerLatitudeDegree,
  };
}
