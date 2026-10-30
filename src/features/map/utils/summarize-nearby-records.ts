import type { Coordinate, PhotoMarker } from '@/features/map/types/home-map-marker';
import { getDistanceMeters } from '@/features/map/utils/get-distance-meters';

export type NearbyRecordSummary = {
  recordCount: number;
  /** 많이 붙은 해시태그부터. 같으면 먼저 나온 순서. */
  hashtags: string[];
  /** 대표사진으로 쓸, 장소에서 가장 가까운 기록 */
  representative: PhotoMarker | null;
};

/** 칩이 두 줄을 넘지 않을 만큼만 보여준다. */
const maxHashtags = 6;

/** 고른 장소 근처(radiusMeters 안)에 남겨진 기록 수, 자주 쓰인 해시태그, 대표 기록을 센다. */
export function summarizeNearbyRecords(
  records: PhotoMarker[],
  center: Coordinate,
  radiusMeters: number,
): NearbyRecordSummary {
  const nearby = records
    .map((record) => ({ record, distance: getDistanceMeters(center, record.coordinate) }))
    .filter(({ distance }) => distance <= radiusMeters)
    .sort((a, b) => a.distance - b.distance);

  const counts = new Map<string, number>();
  for (const { record } of nearby) {
    for (const hashtag of record.hashtags) counts.set(hashtag, (counts.get(hashtag) ?? 0) + 1);
  }
  const hashtags = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxHashtags)
    .map(([hashtag]) => hashtag);

  return { recordCount: nearby.length, hashtags, representative: nearby[0]?.record ?? null };
}
