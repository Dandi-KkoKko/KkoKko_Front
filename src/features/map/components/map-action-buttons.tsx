import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { floatingShadow, radius, spacing } from '@/constants/layout';

const routeButtonSize = 48;
const cameraButtonSize = 56;

type MapActionButtonsProps = {
  /** 탐색 모드에서 가장 가까운 기록을 펼치면 Figma대로 카메라 버튼을 숨긴다. */
  showCamera?: boolean;
};

/** 지도 오른쪽 아래 버튼: 산책 경로 추천, 지금 이 자리 남기기 */
export function MapActionButtons({ showCamera = true }: MapActionButtonsProps) {
  return (
    <View style={styles.column}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="산책 경로 추천"
        onPress={() => router.push('/map/walk')}
        style={styles.routeButton}>
        <Icon name="route" size={24} />
      </Pressable>
      {showCamera && <CameraButton />}
    </View>
  );
}

/** 주황 카메라 버튼: 지금 이 자리 남기기. 경로를 보는 화면에서도 따로 쓴다. */
export function CameraButton() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="지금 이 자리 남기기"
      onPress={() => router.push('/upload/camera')}
      style={styles.cameraButton}>
      <Icon name="camera" size={28} color="textInverse" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  column: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  routeButton: {
    ...floatingShadow,
    width: routeButtonSize,
    height: routeButtonSize,
    borderRadius: radius.md,
    backgroundColor: colors.background01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    ...floatingShadow,
    width: cameraButtonSize,
    height: cameraButtonSize,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
