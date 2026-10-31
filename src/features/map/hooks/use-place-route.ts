import { useMemo, useState } from 'react';

import type { SelectedResultState } from '@/features/map/components/selected-result-card';
import { defaultMapCenter } from '@/features/map/constants/map-config';
import { useNearbyRecords } from '@/features/map/hooks/use-nearby-records';
import type { ResultsMapView } from '@/features/map/hooks/use-results-map';
import { useWalkRoute, type WalkRoutePlan } from '@/features/map/hooks/use-walk-route';
import type { Coordinate } from '@/features/map/types/home-map-marker';
import type { SearchResultItem } from '@/features/map/types/search-result-item';

/**
 * 장소 하나를 골랐을 때의 '장소 카드 → 경로 추천' 흐름. 검색결과 화면과 지도 홈이 같이 쓴다.
 * 경로 계획은 만든 장소의 key와 함께 기억해서, 다른 장소로 바뀌면 앞 장소의 경로는 보이지 않는다.
 */
export function usePlaceRoute(place: SearchResultItem | null, myLocation: Coordinate | null) {
  const [routePlan, setRoutePlan] = useState<{ placeKey: string; plan: WalkRoutePlan } | null>(null);
  const [isRouteExpanded, setIsRouteExpanded] = useState(true);

  const nearby = useNearbyRecords(place?.coordinate ?? null, myLocation);
  const activePlan = place && routePlan?.placeKey === place.key ? routePlan.plan : null;
  const walk = useWalkRoute(activePlan, myLocation);

  /** 아래 카드: 경로를 추천받았으면 경로 카드, 아니면 장소 카드 */
  const card = useMemo<SelectedResultState | null>(() => {
    if (!place) return null;
    if (activePlan) {
      return { mode: 'route', item: place, stops: walk.stops, isLoading: walk.isLoading, isExpanded: isRouteExpanded };
    }
    return { mode: 'place', item: place, nearby };
  }, [place, activePlan, walk.stops, walk.isLoading, isRouteExpanded, nearby]);

  /** 지도: 경로를 추천받았으면 경로 선까지, 아니면 그 장소 핀만 */
  const mapView = useMemo<ResultsMapView | null>(() => {
    if (!place) return null;
    if (activePlan) return { mode: 'route', item: place, start: activePlan.start, path: walk.route?.path ?? null };
    return { mode: 'place', item: place };
  }, [place, activePlan, walk.route]);

  const recommendRoute = (hashtags: string[]) => {
    if (!place) return;
    setIsRouteExpanded(true);
    setRoutePlan({
      placeKey: place.key,
      plan: {
        // 누른 순간의 위치를 출발점으로 고정한다. 위치를 모르면 캠퍼스에서 출발한다고 본다.
        start: myLocation ?? defaultMapCenter,
        destination: place.coordinate,
        destinationName: place.title,
        hashtags,
      },
    });
  };

  return {
    card,
    mapView,
    nearby,
    routePlan: activePlan,
    stops: walk.stops,
    isRouteExpanded,
    setIsRouteExpanded,
    recommendRoute,
    closeRoute: () => setRoutePlan(null),
  };
}
