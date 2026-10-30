import type { Place } from '@/features/map/types/place';
import type { SearchResultItem } from '@/features/map/types/search-result-item';

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

/** 가까운 순. 거리를 모르는 결과는 맨 뒤로 보낸다. */
export function sortByDistance(items: SearchResultItem[]) {
  return [...items].sort((a, b) => (a.distanceMeters ?? Infinity) - (b.distanceMeters ?? Infinity));
}
