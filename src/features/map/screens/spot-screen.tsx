import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButton } from '@/components/icon-button';
import { MapPlaceholder } from '@/components/map-placeholder';
import { screenPaddingX, spacing } from '@/constants/layout';
import { ApproachMap } from '@/features/map/components/approach-map';
import { ApproachSpotPanel } from '@/features/map/components/approach-spot-panel';
import { EmptySpotPanel } from '@/features/map/components/empty-spot-panel';
import { EmptySpotMarker } from '@/features/map/components/map-markers';
import { MyLocationDot } from '@/features/map/components/open-radius';
import { TasteSpotPanel } from '@/features/map/components/taste-spot-panel';
import { approachStageInfo, approachStages, type ApproachStage } from '@/features/map/constants/approach-stages';
import { getPreviewSpot } from '@/features/map/constants/preview-spots';

/**
 * 와이어프레임 ①-A 맛보기·빈 자리, ①-B 거리별 열림 단계.
 * 흐린 자리는 멀리 → 다가가는 중 → 거의 열림 단계를 거쳐, 점선 안에 들어오면 '열렸어요' 화면으로 간다.
 * 맛보기 자리도 '걸어서 가 보기'를 누르면 다가가는 중 단계부터 시작한다.
 */
export function SpotScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const spot = getPreviewSpot(id);
  const [stage, setStage] = useState<ApproachStage | null>(spot.kind === 'blurred' ? 'far' : null);

  const goToNextStage = () => {
    if (stage === null) return;
    const nextIndex = approachStages.indexOf(stage) + 1;
    if (nextIndex < approachStages.length) {
      setStage(approachStages[nextIndex]);
      return;
    }
    router.push(`/opening/${spot.id}`);
  };

  const hashtags = spot.kind === 'empty' ? [] : spot.hashtags;

  return (
    <View style={styles.screen}>
      <MapPlaceholder>
        {stage && <ApproachMap stage={stage} />}
        {!stage && spot.kind === 'empty' && (
          <>
            <EmptySpotMarker top={190} left="62%" selected showLabel={false} />
            <MyLocationDot top={390} left="25%" />
          </>
        )}
      </MapPlaceholder>

      <View style={[styles.top, { paddingTop: insets.top + spacing.xs }]}>
        <IconButton icon="back" accessibilityLabel="뒤로" onPress={() => router.back()} />
      </View>

      {stage && (
        <ApproachSpotPanel
          spotId={spot.id}
          stage={stage}
          info={approachStageInfo[stage]}
          hashtags={hashtags}
          onNext={goToNextStage}
        />
      )}
      {!stage && spot.kind === 'preview' && (
        <TasteSpotPanel
          spotId={spot.id}
          hashtags={spot.hashtags}
          placeName={spot.placeName}
          distanceMeters={spot.distanceMeters}
          walkMinutes={spot.walkMinutes}
          onWalk={() => setStage('approaching')}
        />
      )}
      {!stage && spot.kind === 'empty' && (
        <EmptySpotPanel placeName={spot.placeName} distanceMeters={spot.distanceMeters} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: screenPaddingX,
    alignItems: 'flex-start',
  },
});
