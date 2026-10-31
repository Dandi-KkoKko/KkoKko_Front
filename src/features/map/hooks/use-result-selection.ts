import { useMemo, useState } from 'react';

import type { SelectedResultState } from '@/features/map/components/selected-result-card';
import { useHashtagRecords } from '@/features/map/hooks/use-hashtag-records';
import { useNearbyRecords } from '@/features/map/hooks/use-nearby-records';
import { usePlaceRoute } from '@/features/map/hooks/use-place-route';
import { useRegionName } from '@/features/map/hooks/use-region-name';
import type { ResultsMapView } from '@/features/map/hooks/use-results-map';
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
 * 목록 → 장소 카드 → 경로 추천(usePlaceRoute), 또는 목록 → 해시태그 카드 → 기록 하나. 지도와 카드가 같은 상태를 보도록 여기서 함께 만든다.
 */
export function useResultSelection({ items, allItems, initialKey, myLocation }: UseResultSelectionOptions) {
  const [selectedKey, setSelectedKey] = useState<string | null>(initialKey);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  // 고른 결과를 기억해 둔다. 검색이 다시 돌아 목록이 바뀌어도 열어 둔 카드가 갑자기 사라지지 않게 한다.
  const [rememberedItem, setRememberedItem] = useState<SearchResultItem | null>(null);
  const foundItem = allItems.find((item) => item.key === selectedKey) ?? null;
  if (foundItem && foundItem !== rememberedItem) setRememberedItem(foundItem);
  const selectedItem = foundItem ?? (rememberedItem?.key === selectedKey ? rememberedItem : null);
  const place = selectedItem?.kind === 'place' ? selectedItem : null;
  const placeRoute = usePlaceRoute(place, myLocation);

  const hashtag = selectedItem?.kind === 'hashtag' ? `#${selectedItem.title}` : null;
  const hashtagRecords = useHashtagRecords(hashtag, myLocation);
  const selectedRecord = hashtagRecords.find((record) => record.id === selectedRecordId) ?? null;
  const hashtagNearby = useNearbyRecords(hashtag ? (selectedItem?.coordinate ?? null) : null, myLocation);
  const recordRegionName = useRegionName(selectedRecord?.coordinate ?? null);

  const mapView = useMemo<ResultsMapView>(() => {
    if (placeRoute.mapView) return placeRoute.mapView;
    if (hashtag) return { mode: 'hashtag', records: hashtagRecords, selectedRecord };
    return { mode: 'list', items };
  }, [placeRoute.mapView, hashtag, hashtagRecords, selectedRecord, items]);

  const card = useMemo<SelectedResultState | null>(() => {
    if (placeRoute.card) return placeRoute.card;
    if (!selectedItem || !hashtag) return null;
    if (selectedRecord) {
      const distanceMeters = myLocation ? getDistanceMeters(myLocation, selectedRecord.coordinate) : null;
      return { mode: 'record', record: selectedRecord, hashtag, regionName: recordRegionName, distanceMeters };
    }
    return { mode: 'hashtag', item: selectedItem, nearbyRecordCount: hashtagNearby.recordCount };
  }, [placeRoute.card, selectedItem, hashtag, selectedRecord, myLocation, recordRegionName, hashtagNearby]);

  const select = (key: string) => {
    setSelectedKey(key);
    setSelectedRecordId(null);
    placeRoute.closeRoute();
  };

  /** 카드의 X: 한 단계씩 뒤로 (경로 → 장소 카드, 기록 → 해시태그 카드, 그 밖 → 목록) */
  const close = () => {
    if (placeRoute.routePlan) placeRoute.closeRoute();
    else if (selectedRecordId) setSelectedRecordId(null);
    else setSelectedKey(null);
  };

  /** 지도 표시를 누름: 목록이면 그 결과를, 해시태그를 고른 상태면 그 기록을 고른다. */
  const pressMarker = (markerId: string) => {
    if (hashtag) setSelectedRecordId(markerId);
    else if (!selectedItem && items.some(({ key }) => key === markerId)) select(markerId);
  };

  return {
    mapView,
    card,
    routePlan: placeRoute.routePlan,
    routeStops: placeRoute.stops,
    select,
    close,
    recommendRoute: placeRoute.recommendRoute,
    pressMarker,
    setIsRouteExpanded: placeRoute.setIsRouteExpanded,
  };
}
