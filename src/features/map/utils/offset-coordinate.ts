import type { Coordinate } from '@/features/map/types/home-map-marker';

const metersPerLatitudeDegree = 111_320;

/** 기준점에서 북쪽·동쪽으로 몇 m 떨어진 좌표. 캠퍼스 안 정도의 짧은 거리라서 지구를 평면으로 보고 계산한다. */
export function offsetCoordinate(origin: Coordinate, northMeters: number, eastMeters: number): Coordinate {
  const metersPerLongitudeDegree = metersPerLatitudeDegree * Math.cos((origin.latitude * Math.PI) / 180);
  return {
    latitude: origin.latitude + northMeters / metersPerLatitudeDegree,
    longitude: origin.longitude + eastMeters / metersPerLongitudeDegree,
  };
}
