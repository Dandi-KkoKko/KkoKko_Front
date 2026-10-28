import { StyleSheet, View } from 'react-native';

import { Badge } from '@/components/badge';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/layout';
import type { MarkerPosition } from '@/features/map/components/map-markers';

const circleSize = 200;
const dotSize = 18;

type OpenRadiusProps = MarkerPosition & {
  /** '이 안에 들어오면 열려요' 안내. 지도 범례가 따로 있으면 끈다. */
  showLabel?: boolean;
};

/** 내 위치 점과 '이 안에 들어오면 열려요' 반경. 위치는 원의 가운데 기준이다. */
export function OpenRadius({ top, left, showLabel = true }: OpenRadiusProps) {
  return (
    <View style={[styles.container, { top, left }]} pointerEvents="none">
      <View style={styles.circle} />
      <View style={styles.dot} />
      {showLabel && (
        <View style={styles.label}>
          <Badge label="이 안에 들어오면 열려요" />
        </View>
      )}
    </View>
  );
}

/** 반경 없이 내 위치 점만 (지도를 넓게 볼 때) */
export function MyLocationDot({ top, left }: MarkerPosition) {
  return (
    <View style={[styles.dotOnly, { top, left }]} pointerEvents="none">
      <View style={styles.dot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: circleSize,
    height: circleSize,
    marginLeft: -circleSize / 2,
    marginTop: -circleSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFill,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    backgroundColor: colors.selectedBackground,
    opacity: 0.8,
  },
  dot: {
    width: dotSize,
    height: dotSize,
    borderRadius: radius.full,
    borderWidth: 3,
    borderColor: colors.background01,
    backgroundColor: colors.textPrimary,
  },
  dotOnly: {
    position: 'absolute',
    marginLeft: -dotSize / 2,
    marginTop: -dotSize / 2,
  },
  label: {
    position: 'absolute',
    bottom: -12,
  },
});
