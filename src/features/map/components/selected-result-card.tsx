import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';

import { spacing, screenPaddingX } from '@/constants/layout';
import { HashtagSummaryCard } from '@/features/map/components/hashtag-summary-card';
import { CameraButton } from '@/features/map/components/map-action-buttons';
import { RecordPlaceCard } from '@/features/map/components/record-place-card';
import { RouteCard } from '@/features/map/components/route-card';
import { RouteStartCard } from '@/features/map/components/route-start-card';
import type { PhotoMarker } from '@/features/map/types/home-map-marker';
import type { SearchResultItem } from '@/features/map/types/search-result-item';
import type { NearbyRecordSummary } from '@/features/map/utils/summarize-nearby-records';

/** 고른 결과에 따라 아래에 띄울 카드. 화면이 상태를 정하고, 이 부품은 맞는 카드만 고른다. */
export type SelectedResultState =
  | { mode: 'place'; item: SearchResultItem; nearby: NearbyRecordSummary }
  | { mode: 'route'; item: SearchResultItem; stops: PhotoMarker[]; isLoading: boolean; isExpanded: boolean }
  | { mode: 'hashtag'; item: SearchResultItem; nearbyRecordCount: number }
  | {
      mode: 'record';
      record: PhotoMarker;
      hashtag: string;
      regionName: string;
      distanceMeters: number | null;
    };

type SelectedResultCardProps = {
  state: SelectedResultState;
  cardHeight: number;
  onLayout: (event: LayoutChangeEvent) => void;
  onClose: () => void;
  onRecommend: (hashtags: string[]) => void;
  onRouteExpandedChange: (isExpanded: boolean) => void;
  onWalk: () => void;
  /** 기록 카드를 누름: 그 장소로 지도 홈에서 경로를 추천받으러 간다. 기록 카드가 뜨는 검색결과 화면만 넘긴다. */
  onOpenRecord?: (record: PhotoMarker, regionName: string) => void;
};

export function SelectedResultCard({
  state,
  cardHeight,
  onLayout,
  onClose,
  onRecommend,
  onRouteExpandedChange,
  onWalk,
  onOpenRecord,
}: SelectedResultCardProps) {
  switch (state.mode) {
    case 'place':
      return (
        <RouteStartCard
          key={state.item.key}
          item={state.item}
          nearby={state.nearby}
          onClose={onClose}
          onRecommend={onRecommend}
          onLayout={onLayout}
        />
      );
    case 'route':
      return (
        <>
          {/* Figma '경로·장소 정보 UI': 카드를 접으면 카드 위에 카메라 버튼이 나온다. */}
          {!state.isExpanded && (
            <View style={[styles.camera, { bottom: cardHeight + spacing.md }]}>
              <CameraButton />
            </View>
          )}
          <RouteCard
            item={state.item}
            stops={state.stops}
            isLoading={state.isLoading}
            isExpanded={state.isExpanded}
            onExpandedChange={onRouteExpandedChange}
            onClose={onClose}
            onWalk={onWalk}
            onLayout={onLayout}
          />
        </>
      );
    case 'hashtag':
      return (
        <HashtagSummaryCard
          item={state.item}
          nearbyRecordCount={state.nearbyRecordCount}
          onClose={onClose}
          onLayout={onLayout}
        />
      );
    case 'record':
      return (
        <RecordPlaceCard
          record={state.record}
          hashtag={state.hashtag}
          regionName={state.regionName}
          distanceMeters={state.distanceMeters}
          onClose={onClose}
          onOpen={() => onOpenRecord?.(state.record, state.regionName)}
          onLayout={onLayout}
        />
      );
  }
}

const styles = StyleSheet.create({
  camera: {
    position: 'absolute',
    right: screenPaddingX,
  },
});
