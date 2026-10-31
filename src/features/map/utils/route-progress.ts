import type { Coordinate } from '@/features/map/types/home-map-marker';

const metersPerLatitudeDegree = 111_320;

/** 경로 첫 점을 원점으로 둔 평면 좌표(m). 걸어서 갈 거리라 지구를 평면으로 본다. */
function toLocalMeters(origin: Coordinate, point: Coordinate) {
  const metersPerLongitudeDegree = metersPerLatitudeDegree * Math.cos((origin.latitude * Math.PI) / 180);
  return {
    x: (point.longitude - origin.longitude) * metersPerLongitudeDegree,
    y: (point.latitude - origin.latitude) * metersPerLatitudeDegree,
  };
}

/** 경로 위에서 어떤 점과 가장 가까운 곳. alongMeters는 출발점부터 경로를 따라 잰 거리다. */
type RoutePosition = {
  segmentIndex: number;
  point: Coordinate;
  alongMeters: number;
};

/** 점을 경로 위로 내려, 경로를 따라 몇 m 지점인지 찾는다. */
export function locateOnRoute(path: Coordinate[], target: Coordinate): RoutePosition {
  const origin = path[0];
  const local = path.map((point) => toLocalMeters(origin, point));
  const goal = toLocalMeters(origin, target);

  let best: RoutePosition = { segmentIndex: 0, point: origin, alongMeters: 0 };
  let bestDistance = Infinity;
  let walked = 0;

  for (let index = 0; index < local.length - 1; index += 1) {
    const from = local[index];
    const to = local[index + 1];
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.hypot(dx, dy);
    const fraction = length === 0 ? 0 : Math.min(1, Math.max(0, ((goal.x - from.x) * dx + (goal.y - from.y) * dy) / length ** 2));
    const distance = Math.hypot(from.x + dx * fraction - goal.x, from.y + dy * fraction - goal.y);

    if (distance < bestDistance) {
      bestDistance = distance;
      best = {
        segmentIndex: index,
        alongMeters: walked + length * fraction,
        point: {
          latitude: path[index].latitude + (path[index + 1].latitude - path[index].latitude) * fraction,
          longitude: path[index].longitude + (path[index + 1].longitude - path[index].longitude) * fraction,
        },
      };
    }
    walked += length;
  }
  return best;
}

/** 지금 위치에서 경로를 둘로 나눈다: 걸어온 길(회색)과 남은 길(주황). */
export function splitRoute(path: Coordinate[], current: RoutePosition) {
  return {
    walkedPath: [...path.slice(0, current.segmentIndex + 1), current.point],
    remainingPath: [current.point, ...path.slice(current.segmentIndex + 1)],
  };
}
