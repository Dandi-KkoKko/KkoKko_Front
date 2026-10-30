import type { Coordinate } from '@/features/map/types/home-map-marker';

/**
 * 목록 한 줄로 바꾼 검색결과. 장소와 해시태그는 데이터 모양이 달라서, 화면에서는 이 모양 하나로 그린다.
 * 해시태그 결과의 좌표는 그 해시태그가 붙은 가장 가까운 기록의 자리다.
 */
export type SearchResultItem = {
  key: string;
  kind: 'place' | 'hashtag';
  title: string;
  address: string;
  distanceMeters: number | null;
  coordinate: Coordinate;
};
