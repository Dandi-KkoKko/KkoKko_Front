import { useMemo } from 'react';

import { spacing } from '@/constants/layout';
import type { MapPadding } from '@/features/map/kakao-map/kakao-map-bridge';
import type { Coordinate, MapMarker, PhotoMarker } from '@/features/map/types/home-map-marker';
import type { SearchResultItem } from '@/features/map/types/search-result-item';
import { getItemLabel } from '@/features/map/utils/to-search-result-items';

/** 검색결과 화면이 지금 무엇을 보여주는지. 상태마다 지도에 올릴 것과 맞출 영역이 다르다. */
export type ResultsMapView =
  /** 결과 목록: 결과마다 작은 사진 표시 */
  | { mode: 'list'; items: SearchResultItem[] }
  /** 장소 하나를 고름: 그곳만 이름표 단 핀 */
  | { mode: 'place'; item: SearchResultItem }
  /** 경로 추천: 목적지 핀과 경로 선. 경로를 받기 전에는 출발점과 목적지만 맞춘다. */
  | { mode: 'route'; item: SearchResultItem; start: Coordinate; path: Coordinate[] | null }
  /** 해시태그 하나를 고름: 그 해시태그 기록마다 핀, 누른 기록에는 이름표 */
  | { mode: 'hashtag'; records: PhotoMarker[]; selectedRecord: PhotoMarker | null };

/** 여러 곳을 맞출 때 가장자리 핀이 잘리지 않게 두는 여백 */
const edge = spacing.xxl;

function paddingAbove(bottomInset: number, withEdges: boolean): MapPadding {
  return withEdges
    ? { top: edge, right: edge, bottom: bottomInset + edge, left: edge }
    : { top: 0, right: 0, bottom: bottomInset, left: 0 };
}

/** bottomInset은 아래 패널·카드가 가리는 높이(px)다. 맞출 영역은 그 위쪽 지도로 잡는다. */
export function useResultsMap(view: ResultsMapView, bottomInset: number) {
  const markers = useMemo<MapMarker[]>(() => {
    switch (view.mode) {
      case 'list':
        return view.items.map((item) => ({ kind: 'result', id: item.key, coordinate: item.coordinate }));
      case 'place':
      case 'route':
        return [{ kind: 'pin', id: view.item.key, coordinate: view.item.coordinate, label: getItemLabel(view.item) }];
      case 'hashtag':
        return view.records.map((record) => ({
          kind: 'pin',
          id: record.id,
          coordinate: record.coordinate,
          label: record.id === view.selectedRecord?.id ? record.placeName : undefined,
        }));
    }
  }, [view]);

  const focus = useMemo(() => {
    switch (view.mode) {
      case 'list':
        return { coordinates: view.items.map((item) => item.coordinate), padding: paddingAbove(bottomInset, true) };
      case 'place':
        return { coordinates: [view.item.coordinate], padding: paddingAbove(bottomInset, false) };
      case 'route':
        return { coordinates: view.path ?? [view.start, view.item.coordinate], padding: paddingAbove(bottomInset, true) };
      case 'hashtag':
        return view.selectedRecord
          ? { coordinates: [view.selectedRecord.coordinate], padding: paddingAbove(bottomInset, false) }
          : { coordinates: view.records.map((record) => record.coordinate), padding: paddingAbove(bottomInset, true) };
    }
  }, [view, bottomInset]);

  const routePath = view.mode === 'route' ? view.path : null;
  return { markers, focus, routePath };
}
