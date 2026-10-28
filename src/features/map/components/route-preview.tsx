import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/layout';
import type { WalkStop } from '@/features/map/constants/preview-walk-route';

type RoutePreviewProps = {
  stops: WalkStop[];
};

const nodeSize = 28;

/**
 * 회색 지도 위에 경로를 ㄱ자 선으로 잇고 자리마다 번호를 찍는다.
 * 진짜 지도에서는 그 지도 API의 선 그리기와 마커 기능으로 바꾼다.
 */
export function RoutePreview({ stops }: RoutePreviewProps) {
  return (
    <>
      {stops.slice(1).map((stop, index) => {
        const from = stops[index].point;
        const to = stop.point;
        return (
          <View key={`line-${stop.spotId}`}>
            {/* 세로로 올라간 뒤 가로로 꺾는다 */}
            <View
              style={[
                styles.line,
                { left: from.left, top: to.top, height: from.top - to.top, width: 4, marginLeft: -2 },
              ]}
            />
            <View style={[styles.line, styles.horizontal, { top: to.top, left: from.left, right: invert(to.left) }]} />
          </View>
        );
      })}

      {stops.map((stop, index) => (
        <View key={stop.spotId} style={[styles.node, { top: stop.point.top, left: stop.point.left }]}>
          <AppText variant="caption03" color="textInverse">
            {index + 1}
          </AppText>
        </View>
      ))}
    </>
  );
}

/** left: 74% 지점을 right 기준 26%로 바꾼다 */
function invert(percent: `${number}%`): `${number}%` {
  return `${100 - parseFloat(percent)}%`;
}

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    backgroundColor: colors.primary,
  },
  horizontal: {
    height: 4,
    marginTop: -2,
  },
  node: {
    position: 'absolute',
    width: nodeSize,
    height: nodeSize,
    marginLeft: -nodeSize / 2,
    marginTop: -nodeSize / 2,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.background01,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
