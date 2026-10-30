import { useMemo, useState } from 'react';

import type { SelectedResultState } from '@/features/map/components/selected-result-card';
import { defaultMapCenter } from '@/features/map/constants/map-config';
import { useHashtagRecords } from '@/features/map/hooks/use-hashtag-records';
import { useNearbyRecords } from '@/features/map/hooks/use-nearby-records';
import { useRegionName } from '@/features/map/hooks/use-region-name';
import type { ResultsMapView } from '@/features/map/hooks/use-results-map';
import { useWalkRoute, type WalkRoutePlan } from '@/features/map/hooks/use-walk-route';
import type { Coordinate } from '@/features/map/types/home-map-marker';
import type { SearchResultItem } from '@/features/map/types/search-result-item';
import { getDistanceMeters } from '@/features/map/utils/get-distance-meters';

type UseResultSelectionOptions = {
  /** 지금 목록에 보이는 결과 */
  items: SearchResultItem[];
  /** 장소·해시태그 결과 전부 (다른 탭에서 고른 결과도 찾을 수 있게) */
  allItems: SearchResultItem[];
  /** 처음부터 고른 채로 열 결과의 key (검색 화면에서 결과를 눌러 온 경우) */
  initialKey: string | null;
  myLocation: Coordinate | null;
};

/**
 * 검색결과 화면에서 '무엇을 골랐는지'를 다룬다.
 * 목록 → 장소 카드 → 경로 추천, 또는 목록 → 해시태그 카드 → 기록 하나. 지도와 카드가 같은 상태를 보도록 여기서 함께 만든다.
 */
export function useResultSelection({ items, allItems, initialKey, myLocation }: UseResultSelectionOptions) {
  const [selectedKey, setSelectedKey] = useState<string | null>(initialKey);
  const [routePlan, setRoutePlan] = useState<WalkRoutePlan | null>(null);
  const [isRouteExpanded, setIsRouteExpanded] = useState(true);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  const selectedItem = allItems.find((item) => item.key === selectedKey) ?? null;
  const hashtag = selectedItem?.kind === 'hashtag' ? `#${selectedItem.title}` : null;
  const hashtagRecords = useHashtagRecords(hashtag, myLocation);
  const selectedRecord = hashtagRecords.find((record) => record.id === selectedRecordId) ?? null;

  const nearby = useNearbyRecords(selectedItem?.coordinate ?? null, myLocation);
  const walk = useWalkRoute(selectedItem?.kind === 'place' ? routePlan : null, myLocation);
  const recordRegionName = useRegionName(selectedRecord?.coordinate ?? null);

  const mapView = useMemo<ResultsMapView>(() => {
    if (!selectedItem) return { mode: 'list', items };
    if (selectedItem.kind === 'hashtag') return { mode: 'hashtag', records: hashtagRecords, selectedRecord };
    if (routePlan) return { mode: 'route', item: selectedItem, start: routePlan.start, path: walk.route?.path ?? null };
    return { mode: 'place', item: selectedItem };
  }, [items, selectedItem, hashtagRecords, selectedRecord, routePlan, walk.route]);

  const card = useMemo<SelectedResultState | null>(() => {
    if (!selectedItem) return null;
    if (selectedItem.kind === 'hashtag' && selectedRecord && hashtag) {
      const distanceMeters = myLocation ? getDistanceMeters(myLocation, selectedRecord.coordinate) : null;
      return { mode: 'record', record: selectedRecord, hashtag, regionName: recordRegionName, distanceMeters };
    }
    if (selectedItem.kind === 'hashtag') return { mode: 'hashtag', item: selectedItem, nearbyRecordCount: nearby.recordCount };
    if (routePlan) {
      return { mode: 'route', item: selectedItem, stops: walk.stops, isLoading: walk.isLoading, isExpanded: isRouteExpanded };
    }
    return { mode: 'place', item: selectedItem, nearby };
  }, [selectedItem, selectedRecord, hashtag, myLocation, recordRegionName, nearby, routePlan, walk, isRouteExpanded]);

  const select = (key: string) => {
    setSelectedKey(key);
    setRoutePlan(null);
    setSelectedRecordId(null);
  };

  /** 카드의 X: 한 단계씩 뒤로 (경로 → 장소 카드, 기록 → 해시태그 카드, 그 밖 → 목록) */
  const close = () => {
    if (routePlan) setRoutePlan(null);
    else if (selectedRecordId) setSelectedRecordId(null);
    else setSelectedKey(null);
  };

  const recommendRoute = (hashtags: string[]) => {
    if (!selectedItem) return;
    setIsRouteExpanded(true);
    setRoutePlan({
      // 누른 순간의 위치를 출발점으로 고정한다. 위치를 모르면 캠퍼스에서 출발한다고 본다.
      start: myLocation ?? defaultMapCenter,
      destination: selectedItem.coordinate,
      destinationName: selectedItem.title,
      hashtags,
    });
  };

  /** 지도 표시를 누름: 목록이면 그 결과를, 해시태그를 고른 상태면 그 기록을 고른다. */
  const pressMarker = (markerId: string) => {
    if (selectedItem?.kind === 'hashtag') setSelectedRecordId(markerId);
    else if (!selectedItem && items.some(({ key }) => key === markerId)) select(markerId);
  };

  return {
    selectedItem,
    mapView,
    card,
    routePlan,
    select,
    close,
    recommendRoute,
    pressMarker,
    setIsRouteExpanded,
  };
}
