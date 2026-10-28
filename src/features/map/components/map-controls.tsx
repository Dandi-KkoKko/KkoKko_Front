import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { IconButton } from '@/components/icon-button';
import { spacing } from '@/constants/layout';

type MapControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  /** 확대·축소만 보여줄 때 (가장 넓게·가장 자세히 본 상태) */
  zoomOnly?: boolean;
};

/** 지도 오른쪽 버튼 모음: 확대·축소, 산책 경로, 내 위치. 내 위치는 진짜 지도를 붙일 때 연결한다. */
export function MapControls({ onZoomIn, onZoomOut, zoomOnly = false }: MapControlsProps) {
  return (
    <View style={styles.column}>
      <IconButton icon="plus" accessibilityLabel="지도 확대" onPress={onZoomIn} />
      <IconButton icon="minus" accessibilityLabel="지도 축소" onPress={onZoomOut} />
      {!zoomOnly && (
        <>
          <IconButton icon="route" accessibilityLabel="AI 산책 경로" onPress={() => router.push('/map/walk')} />
          <IconButton icon="myLocation" accessibilityLabel="내 위치로" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    gap: spacing.xs,
  },
});
