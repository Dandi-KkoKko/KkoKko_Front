import type { Coordinate } from '@/features/map/types/home-map-marker';

/** 검색으로 찾은 장소 하나 */
export type Place = {
  id: string;
  name: string;
  /** '경산시 대동'처럼 시·군·구와 동까지만 */
  shortAddress: string;
  /** 내 위치를 모르면 null */
  distanceMeters: number | null;
  coordinate: Coordinate;
};
