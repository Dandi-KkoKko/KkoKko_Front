import type { Coordinate } from '@/features/map/types/home-map-marker';
import type { Place } from '@/features/map/types/place';

/**
 * 목록 한 줄로 바꾼 검색결과. 장소와 해시태그는 데이터 모양이 달라서, 화면에서는 이 모양 하나로 그린다.
 * 누르면 어디로 갈지는 target으로 정한다.
 */
export type SearchResultItem = {
  key: string;
  kind: 'place' | 'hashtag';
  title: string;
  address: string;
  distanceMeters: number | null;
  coordinate: Coordinate;
  target: { type: 'place'; place: Place } | { type: 'record'; recordId: string };
};
