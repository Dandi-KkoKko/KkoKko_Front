import { router } from 'expo-router';

import type { Place } from '@/features/map/types/place';

/** 장소 화면으로 간다. 다음 화면이 카카오에 다시 묻지 않도록 이름·주소·좌표를 같이 넘긴다. */
export function openPlace(place: Place) {
  router.push({
    pathname: '/map/place/[id]',
    params: {
      id: place.id,
      name: place.name,
      address: place.shortAddress,
      latitude: String(place.coordinate.latitude),
      longitude: String(place.coordinate.longitude),
    },
  });
}

/** 해시태그 결과는 그 해시태그의 가장 가까운 기록(자리 상세)으로 간다. */
export function openRecord(recordId: string) {
  router.push(`/map/spot/${recordId}`);
}
