import type { Place } from '@/features/map/types/place';
import type { SearchResultItem } from '@/features/map/types/search-result-item';
import type { HashtagResult } from '@/features/map/utils/search-hashtags';

export function toPlaceItems(places: Place[]): SearchResultItem[] {
  return places.map((place) => ({
    key: `place-${place.id}`,
    kind: 'place',
    title: place.name,
    address: place.shortAddress,
    distanceMeters: place.distanceMeters,
    coordinate: place.coordinate,
    target: { type: 'place', place },
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
    target: { type: 'record', recordId: result.record.id },
  }));
}

/** 가까운 순. 거리를 모르는 결과는 맨 뒤로 보낸다. */
export function sortByDistance(items: SearchResultItem[]) {
  return [...items].sort((a, b) => (a.distanceMeters ?? Infinity) - (b.distanceMeters ?? Infinity));
}
