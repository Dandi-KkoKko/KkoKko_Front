import { tmapAppKey, walkingSpeedMetersPerSecond } from '@/features/map/constants/map-config';
import type { Coordinate } from '@/features/map/types/home-map-marker';
import type { WalkRoute, WalkRouteRequest } from '@/features/map/types/walk-route';
import { getDistanceMeters } from '@/features/map/utils/get-distance-meters';

const pedestrianRouteUrl = 'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1';

/** TMAP 응답(GeoJSON) 중 쓰는 값만. 좌표는 [경도, 위도] 순서다. */
type TmapFeature = {
  geometry: { type: 'Point'; coordinates: number[] } | { type: 'LineString'; coordinates: number[][] };
  properties: { totalDistance?: number; totalTime?: number };
};

const toTmapPoint = ({ latitude, longitude }: Coordinate) => `${longitude},${latitude}`;

/** TMAP 보행자 경로. 인도·횡단보도를 따라가는 실제 걷는 길을 받는다. 경유지는 5곳까지다. */
async function getTmapRoute({ start, destination, destinationName, stops }: WalkRouteRequest, signal?: AbortSignal) {
  const response = await fetch(pedestrianRouteUrl, {
    method: 'POST',
    headers: { appKey: tmapAppKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startX: start.longitude,
      startY: start.latitude,
      endX: destination.longitude,
      endY: destination.latitude,
      passList: stops.map(({ coordinate }) => toTmapPoint(coordinate)).join('_') || undefined,
      // TMAP은 출발·도착 이름을 URL 인코딩해서 받는다.
      startName: encodeURIComponent('내 위치'),
      endName: encodeURIComponent(destinationName),
      reqCoordType: 'WGS84GEO',
      resCoordType: 'WGS84GEO',
    }),
    signal,
  });
  if (!response.ok) throw new Error(`경로 찾기 실패 (${response.status})`);

  const { features } = (await response.json()) as { features: TmapFeature[] };
  const path = features.flatMap(({ geometry }) =>
    geometry.type === 'LineString' ? geometry.coordinates.map(([longitude, latitude]) => ({ latitude, longitude })) : [],
  );
  // 총거리·총시간은 첫 번째 지점에만 들어 있다.
  const summary = features[0]?.properties ?? {};
  return {
    path,
    distanceMeters: summary.totalDistance ?? 0,
    durationSeconds: summary.totalTime ?? 0,
    isEstimated: false,
  };
}

/** 걷는 길 API를 못 쓸 때: 내 위치 → 들르는 자리 → 목적지를 직선으로 잇고, 거리로 시간을 어림한다. */
export function getStraightRoute({ start, destination, stops }: WalkRouteRequest): WalkRoute {
  const path = [start, ...stops.map(({ coordinate }) => coordinate), destination];
  const distanceMeters = path.slice(1).reduce((sum, point, index) => sum + getDistanceMeters(path[index], point), 0);
  return {
    path,
    distanceMeters,
    durationSeconds: distanceMeters / walkingSpeedMetersPerSecond,
    isEstimated: true,
  };
}

/** TMAP 키가 있으면 실제 걷는 길, 없거나 실패하면 직선 경로를 돌려준다. 경로 추천이 멈추지 않게 하려는 것이다. */
export async function getWalkRoute(request: WalkRouteRequest, signal?: AbortSignal): Promise<WalkRoute> {
  if (!tmapAppKey) return getStraightRoute(request);
  try {
    const route = await getTmapRoute(request, signal);
    return route.path.length > 1 ? route : getStraightRoute(request);
  } catch (error) {
    if (signal?.aborted) throw error;
    return getStraightRoute(request);
  }
}
