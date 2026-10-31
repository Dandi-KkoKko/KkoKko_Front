import { useEffect, useMemo, useState } from 'react';

import { getWalkRoute } from '@/features/map/api/get-walk-route';
import { maxRouteStops, routeCorridorMeters } from '@/features/map/constants/map-config';
import { useHomeMapMarkers } from '@/features/map/hooks/use-home-map-markers';
import type { Coordinate } from '@/features/map/types/home-map-marker';
import type { WalkRoute } from '@/features/map/types/walk-route';
import { pickRouteStops } from '@/features/map/utils/pick-route-stops';

/**
 * '경로 추천'을 누른 순간의 계획. 출발점을 그때 위치로 고정한다.
 * 걸을 때마다 출발점이 바뀌면 경로를 계속 다시 받아서 지도가 흔들린다.
 */
export type WalkRoutePlan = {
  start: Coordinate;
  destination: Coordinate;
  destinationName: string;
  hashtags: string[];
};

/** 계획으로 들를 자리를 고르고, 그 자리를 지나는 걷는 길을 받는다. 계획이 없으면 아무것도 하지 않는다. */
export function useWalkRoute(plan: WalkRoutePlan | null, myLocation: Coordinate | null) {
  const { records } = useHomeMapMarkers(myLocation);
  const [result, setResult] = useState<{ plan: WalkRoutePlan; route: WalkRoute } | null>(null);

  const stops = useMemo(
    () =>
      plan
        ? pickRouteStops({
            records,
            start: plan.start,
            destination: plan.destination,
            hashtags: plan.hashtags,
            corridorMeters: routeCorridorMeters,
            maxStops: maxRouteStops,
          })
        : [],
    [plan, records],
  );

  useEffect(() => {
    if (!plan) return;
    const controller = new AbortController();
    getWalkRoute({ ...plan, stops }, controller.signal)
      .then((route) => setResult({ plan, route }))
      .catch(() => {});
    return () => controller.abort();
  }, [plan, stops]);

  // 앞 계획의 경로가 남아 있으면 보여주지 않는다.
  const route = result && result.plan === plan ? result.route : null;
  return { stops, route, isLoading: plan !== null && route === null };
}
