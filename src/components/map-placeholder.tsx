import type { ReactNode } from 'react';
import { StyleSheet, View, type DimensionValue } from 'react-native';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/layout';

type Rect = { top: DimensionValue; left: DimensionValue; width: DimensionValue; height: DimensionValue };

// 와이어프레임 지도 그림을 흉내 낸 길과 건물 위치
const roads: Rect[] = [
  { top: 0, left: '38%', width: 16, height: '100%' },
  { top: 0, left: '70%', width: 16, height: '100%' },
  { top: '38%', left: 0, width: '100%', height: 18 },
  { top: '70%', left: 0, width: '100%', height: 18 },
];

const blocks: Rect[] = [
  { top: '18%', left: '5%', width: '30%', height: '17%' },
  { top: '18%', left: '46%', width: '33%', height: '10%' },
  { top: '42%', left: '5%', width: '30%', height: '12%' },
  { top: '74%', left: '46%', width: '22%', height: '14%' },
];

type MapPlaceholderProps = {
  /** 지도 위에 올라가는 마커, 버튼, 카드 */
  children?: ReactNode;
};

/**
 * 진짜 지도를 붙이기 전까지 쓰는 회색 지도. 지도 API는 아직 정하지 않았다.
 * 지도 담당이 이 컴포넌트만 진짜 지도로 바꾸면, 위에 올린 children 배치는 그대로 쓸 수 있다.
 */
export function MapPlaceholder({ children }: MapPlaceholderProps) {
  return (
    <View style={styles.map}>
      {blocks.map((block, index) => (
        <View key={`block-${index}`} style={[styles.block, block]} />
      ))}
      {roads.map((road, index) => (
        <View key={`road-${index}`} style={[styles.road, road]} />
      ))}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.mapBackground,
    overflow: 'hidden',
  },
  road: {
    position: 'absolute',
    backgroundColor: colors.mapRoad,
  },
  block: {
    position: 'absolute',
    borderRadius: radius.md,
    backgroundColor: colors.mapBlock,
  },
});
