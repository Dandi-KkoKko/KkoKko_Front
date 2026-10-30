import { router } from 'expo-router';

import type { Coordinate } from '@/features/map/types/home-map-marker';

/** 기록 하나(자리 상세)로 간다. */
export function openRecord(recordId: string) {
  router.push(`/map/spot/${recordId}`);
}

/** 검색결과 화면으로 간다. selectKey를 주면 그 결과를 고른 상태(경로 추천 카드)로 연다. */
export function openSearchResults(query: string, selectKey?: string) {
  router.push({ pathname: '/map/results', params: selectKey ? { query, select: selectKey } : { query } });
}

type WalkRouteRequest = {
  destinationName: string;
  destination: Coordinate;
  hashtags: string[];
};

/**
 * 산책 경로 화면으로 간다. 다음 화면이 경로를 만들 수 있도록 목적지와 고른 해시태그를 넘긴다.
 * 주소 파라미터는 문자열만 받아서 해시태그 목록은 쉼표로 이어 붙인다.
 */
export function openWalkRoute({ destinationName, destination, hashtags }: WalkRouteRequest) {
  router.push({
    pathname: '/map/walk',
    params: {
      destinationName,
      latitude: String(destination.latitude),
      longitude: String(destination.longitude),
      hashtags: hashtags.join(','),
    },
  });
}
