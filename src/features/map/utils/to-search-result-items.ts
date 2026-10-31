import type { Place } from '@/features/map/types/place';
import type { SearchResultItem } from '@/features/map/types/search-result-item';
import { formatDistance } from '@/features/map/utils/format-distance';
import type { HashtagResult } from '@/features/map/utils/search-hashtags';

export function toPlaceItems(places: Place[]): SearchResultItem[] {
  return places.map((place) => ({
    key: `place-${place.id}`,
    kind: 'place',
    title: place.name,
    address: place.shortAddress,
    distanceMeters: place.distanceMeters,
    coordinate: place.coordinate,
  }));
}

export function toHashtagItems(results: (HashtagResult & { regionName: string })[]): SearchResultItem[] {
  return results.map((result) => ({
    key: `hashtag-${result.hashtag}`,
    kind: 'hashtag',
    title: result.name,
    address: result.regionName,
    distanceMeters: result.distanceMeters,
    coordinate: result.record.coordinate,
  }));
}

/** 목록 밖(지도 이름표, 경로 추천 카드)에서 부르는 이름. 해시태그는 목록과 달리 '#'을 붙여 장소와 구분한다. */
export function getItemLabel(item: SearchResultItem) {
  return item.kind === 'hashtag' ? `#${item.title}` : item.title;
}

/** 고른 결과 카드의 한 줄: '경산시 대동 · 내 위치에서 520m'. 내 위치를 모르면 거리는 뺀다. */
export function formatItemDetails(item: SearchResultItem) {
  return [item.address, item.distanceMeters !== null && `내 위치에서 ${formatDistance(item.distanceMeters)}`]
    .filter(Boolean)
    .join(' · ');
}

/** 가까운 순. 거리를 모르는 결과는 맨 뒤로 보낸다. */
export function sortByDistance(items: SearchResultItem[]) {
  return [...items].sort((a, b) => (a.distanceMeters ?? Infinity) - (b.distanceMeters ?? Infinity));
}
