import { useMemo } from 'react';

import { spacing } from '@/constants/layout';
import type { MapMarker } from '@/features/map/types/home-map-marker';
import type { SearchResultItem } from '@/features/map/types/search-result-item';
import { getItemLabel } from '@/features/map/utils/to-search-result-items';

/**
 * 검색결과 지도에 올릴 표시와 맞출 영역.
 * - 아무것도 안 골랐으면: 결과마다 작은 사진 표시를 두고, 결과가 모두 보이게 맞춘다.
 * - 하나를 골랐으면: 그곳에만 이름표 단 핀을 두고, 아래 카드에 가리지 않는 지도 가운데에 둔다.
 * bottomInset은 아래 패널·카드가 가리는 높이(px)다.
 */
export function useResultsMap(items: SearchResultItem[], selectedItem: SearchResultItem | null, bottomInset: number) {
  const markers = useMemo<MapMarker[]>(
    () =>
      selectedItem
        ? [{ kind: 'pin', id: selectedItem.key, coordinate: selectedItem.coordinate, label: getItemLabel(selectedItem) }]
        : items.map((item) => ({ kind: 'result', id: item.key, coordinate: item.coordinate })),
    [items, selectedItem],
  );

  const focus = useMemo(
    () =>
      selectedItem
        ? { coordinates: [selectedItem.coordinate], padding: { top: 0, right: 0, bottom: bottomInset, left: 0 } }
        : {
            coordinates: items.map((item) => item.coordinate),
            padding: { top: spacing.xxl, right: spacing.xxl, bottom: bottomInset + spacing.xxl, left: spacing.xxl },
          },
    [items, selectedItem, bottomInset],
  );

  return { markers, focus };
}
