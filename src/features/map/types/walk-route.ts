import type { Coordinate, PhotoMarker } from '@/features/map/types/home-map-marker';

/** 산책 경로를 만들어 달라는 요청. 내 위치에서 목적지까지, 고른 해시태그 자리를 들르며 간다. */
export type WalkRouteRequest = {
  start: Coordinate;
  destination: Coordinate;
  destinationName: string;
  stops: PhotoMarker[];
};

export type WalkRoute = {
  /** 지도에 그릴 선 (내 위치 → 들르는 자리 → 목적지) */
  path: Coordinate[];
  distanceMeters: number;
  durationSeconds: number;
  /** 걷는 길 API 없이 직선으로 이은 대략적인 경로면 true */
  isEstimated: boolean;
};
