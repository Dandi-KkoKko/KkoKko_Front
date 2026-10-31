import type { Coordinate, PhotoMarker } from '@/features/map/types/home-map-marker';
import { toLocalMeters } from '@/features/map/utils/local-plane';

type PickRouteStopsOptions = {
  records: PhotoMarker[];
  start: Coordinate;
  destination: Coordinate;
  /** 비어 있으면 해시태그와 상관없이 가는 길의 기록을 고른다. */
  hashtags: string[];
  corridorMeters: number;
  maxStops: number;
};

/**
 * '가는 길에 취향에 맞는 자리'를 고른다. AI 추천 API가 나오기 전까지 앱에서 정하는 규칙이다.
 * 1. 고른 해시태그가 하나라도 붙은 기록만 본다.
 * 2. 내 위치→목적지 직선 위로 내렸을 때 두 점 사이에 있고, 직선에서 corridorMeters 안쪽인 기록만 남긴다.
 * 3. 직선에 가까운 것부터 maxStops개를 골라, 출발점에서 가까운 순서(걸어가며 만나는 순서)로 줄 세운다.
 */
export function pickRouteStops({ records, start, destination, hashtags, corridorMeters, maxStops }: PickRouteStopsOptions) {
  const end = toLocalMeters(start, destination);
  const lengthSquared = end.x ** 2 + end.y ** 2;
  if (lengthSquared === 0) return [];

  return records
    .filter((record) => hashtags.length === 0 || record.hashtags.some((hashtag) => hashtags.includes(hashtag)))
    .map((record) => {
      const point = toLocalMeters(start, record.coordinate);
      // progress: 직선 위 어디쯤인지 (0 = 출발, 1 = 목적지), offset: 직선에서 떨어진 거리(m)
      const progress = (point.x * end.x + point.y * end.y) / lengthSquared;
      const offset = Math.abs(point.x * end.y - point.y * end.x) / Math.sqrt(lengthSquared);
      return { record, progress, offset };
    })
    .filter(({ progress, offset }) => progress > 0 && progress < 1 && offset <= corridorMeters)
    .sort((a, b) => a.offset - b.offset)
    .slice(0, maxStops)
    .sort((a, b) => a.progress - b.progress)
    .map(({ record }) => record);
}
