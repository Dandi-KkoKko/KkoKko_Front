import type { Coordinate, PhotoMarker } from '@/features/map/types/home-map-marker';
import { getDistanceMeters } from '@/features/map/utils/get-distance-meters';

/** 해시태그 검색결과 한 줄. 같은 해시태그 기록이 여러 개면 가장 가까운 기록을 대표로 둔다. */
export type HashtagResult = {
  /** '#'을 뗀 이름 (Figma 목록이 '#' 없이 보여준다) */
  name: string;
  hashtag: string;
  record: PhotoMarker;
  distanceMeters: number;
  /** 이 해시태그가 붙은 기록 수 */
  recordCount: number;
};

/** '#정문 ' → '정문'. 사용자가 '#'을 붙여도, 안 붙여도 같은 결과가 나오게 한다. */
export function toHashtagKeyword(query: string) {
  return query.trim().replace(/^#+/, '').trim();
}

/**
 * 기록의 해시태그 중 검색어가 들어간 것을 찾는다.
 * 순서는 '정확도순'으로 정한다: 검색어와 똑같은 것 → 검색어로 시작하는 것 → 검색어가 들어간 것, 같으면 가까운 순.
 */
export function searchHashtags(records: PhotoMarker[], query: string, from: Coordinate): HashtagResult[] {
  const keyword = toHashtagKeyword(query);
  if (!keyword) return [];

  const results = new Map<string, HashtagResult>();
  for (const record of records) {
    const distanceMeters = getDistanceMeters(from, record.coordinate);
    for (const hashtag of record.hashtags) {
      const name = hashtag.replace(/^#/, '');
      if (!name.includes(keyword)) continue;

      const current = results.get(hashtag);
      if (!current) {
        results.set(hashtag, { name, hashtag, record, distanceMeters, recordCount: 1 });
        continue;
      }
      current.recordCount += 1;
      if (distanceMeters < current.distanceMeters) {
        current.record = record;
        current.distanceMeters = distanceMeters;
      }
    }
  }

  const matchRank = (name: string) => (name === keyword ? 0 : name.startsWith(keyword) ? 1 : 2);
  return [...results.values()].sort(
    (a, b) => matchRank(a.name) - matchRank(b.name) || a.distanceMeters - b.distanceMeters,
  );
}
