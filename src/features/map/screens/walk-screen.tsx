import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButton } from '@/components/icon-button';
import { MapPlaceholder } from '@/components/map-placeholder';
import { screenPaddingX, spacing } from '@/constants/layout';
import { RoutePreview } from '@/features/map/components/route-preview';
import { NextStopCard, WalkStatusCard } from '@/features/map/components/walk-progress-panels';
import { WalkRecommendPanel } from '@/features/map/components/walk-recommend-panel';
import { previewWalkProgress, previewWalkRoute } from '@/features/map/constants/preview-walk-route';

/**
 * 와이어프레임 ① 지도 탭: AI 추천 산책길과 그 길을 걷는 중.
 * 두 상태를 한 화면에서 바꿔 보여준다. '이 길로 걷기'를 누르면 걷는 중이 된다.
 */
export function WalkScreen() {
  const insets = useSafeAreaInsets();
  const [isWalking, setIsWalking] = useState(false);
  const route = previewWalkRoute;
  const progress = previewWalkProgress;

  return (
    <View style={styles.screen}>
      <MapPlaceholder>
        <RoutePreview stops={route.stops} />
      </MapPlaceholder>

      <View style={[styles.top, { paddingTop: insets.top + spacing.xs }]}>
        {isWalking ? (
          <WalkStatusCard
            routeTitle={route.title}
            stopCount={route.stops.length}
            nextStopIndex={progress.nextStopIndex}
            minutesToNext={progress.minutesToNext}
            metersToNext={progress.metersToNext}
          />
        ) : (
          <IconButton icon="back" accessibilityLabel="뒤로" onPress={() => router.back()} />
        )}
      </View>

      {isWalking ? (
        <View style={styles.bottomCard}>
          <NextStopCard
            stop={route.stops[progress.nextStopIndex]}
            blurLevel={progress.nextStopBlurLevel}
            onStop={() => setIsWalking(false)}
          />
        </View>
      ) : (
        <WalkRecommendPanel
          title={route.title}
          reason={route.reason}
          stops={route.stops}
          onStart={() => setIsWalking(true)}
          // 다른 경로 추천은 AI API가 나오면 다시 요청한다
          onShowOther={() => {}}
        />
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
  bottomCard: {
    position: 'absolute',
    left: screenPaddingX,
    right: screenPaddingX,
    bottom: spacing.md,
  },
});
