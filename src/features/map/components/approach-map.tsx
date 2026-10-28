import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/colors';
import { PhotoMarker } from '@/features/map/components/map-markers';
import { MyLocationDot, OpenRadius } from '@/features/map/components/open-radius';
import type { ApproachStage } from '@/features/map/constants/approach-stages';

type Point = { top: number; left: `${number}%` };

// 단계마다 내 위치와 사진 위치 (가까워질수록 지도가 확대된 것처럼 거리가 줄어든다)
const stagePoints: Record<ApproachStage, { me: Point; spot: Point }> = {
  far: { me: { top: 340, left: '19%' }, spot: { top: 60, left: '78%' } },
  approaching: { me: { top: 330, left: '33%' }, spot: { top: 75, left: '66%' } },
  almost: { me: { top: 300, left: '39%' }, spot: { top: 170, left: '66%' } },
};

/**
 * 다가가는 중 화면의 지도 부분. 회색 지도 위에 내 위치에서 사진까지 길을 ㄱ자로 긋는다.
 * 거의 열림 단계에서는 길 대신 사진 둘레의 열림 반경을 보여준다.
 * 진짜 지도를 붙이면 길 안내 경로와 실제 위치로 바뀐다.
 */
export function ApproachMap({ stage }: { stage: ApproachStage }) {
  const { me, spot } = stagePoints[stage];
  const isAlmostOpen = stage === 'almost';

  return (
    <>
      {isAlmostOpen ? (
        <OpenRadius top={spot.top} left={spot.left} showLabel={false} />
      ) : (
        <>
          <View style={[styles.path, { left: me.left, top: spot.top, height: me.top - spot.top, width: 2 }]} />
          <View style={[styles.path, { top: spot.top, left: me.left, right: `${100 - parseFloat(spot.left)}%`, height: 2 }]} />
        </>
      )}
      <MyLocationDot top={me.top} left={me.left} />
      <PhotoMarker top={spot.top - 28} left={`${parseFloat(spot.left) - 7}%`} status={stage === 'far' ? undefined : 'opening'} />
    </>
  );
}

const styles = StyleSheet.create({
  path: {
    position: 'absolute',
    backgroundColor: colors.textSecondary,
  },
});
