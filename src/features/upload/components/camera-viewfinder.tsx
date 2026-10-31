import { CameraView, type CameraType } from 'expo-camera';
import type { Ref } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

type CameraViewfinderProps = {
  placeLabel: string;
  cameraRef: Ref<CameraView>;
  facing: CameraType;
  /** 카메라 권한이 있을 때만 실제 카메라를 띄운다. 없으면 권한 안내를 보여준다. */
  hasPermission: boolean;
  onRequestPermission: () => void;
  onReady: () => void;
};

/**
 * 카메라 화면. expo-camera의 CameraView 위에 3x3 격자선과 위치 안내를 겹친다.
 * 사진은 앱 안(캐시)에만 저장되고 갤러리에는 저장하지 않는다. 갤러리 권한도 받지 않는다.
 */
export function CameraViewfinder({
  placeLabel,
  cameraRef,
  facing,
  hasPermission,
  onRequestPermission,
  onReady,
}: CameraViewfinderProps) {
  if (!hasPermission) {
    return (
      <View style={[styles.viewfinder, styles.permission]}>
        <AppText variant="body02" color="textInverse" style={styles.permissionText}>
          {'이 자리에서 바로 찍은 사진만 남길 수 있어요.\n카메라 권한을 켜 주세요.'}
        </AppText>
        <Button label="카메라 권한 켜기" variant="primary" onPress={onRequestPermission} style={styles.permissionButton} />
      </View>
    );
  }

  return (
    <View style={styles.viewfinder}>
      <CameraView ref={cameraRef} facing={facing} onCameraReady={onReady} style={StyleSheet.absoluteFill} />

      <View style={[styles.gridLine, styles.vertical, { left: '33.3%' }]} />
      <View style={[styles.gridLine, styles.vertical, { left: '66.6%' }]} />
      <View style={[styles.gridLine, styles.horizontal, { top: '33.3%' }]} />
      <View style={[styles.gridLine, styles.horizontal, { top: '66.6%' }]} />

      <View style={styles.location}>
        <Icon name="location" size={14} color="textInverse" />
        <AppText variant="caption02" color="textInverse">
          {placeLabel} · 위치 저장 켜짐
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewfinder: {
    flex: 1,
    backgroundColor: colors.textSecondary,
    overflow: 'hidden',
  },
  permission: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
  permissionText: {
    textAlign: 'center',
  },
  // 공통 Button은 화면 폭을 채우는 모양이라, 가운데 놓을 때는 양옆 여백을 준다.
  permissionButton: {
    paddingHorizontal: spacing.xl,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: colors.borderStrong,
    opacity: 0.6,
  },
  vertical: {
    top: 0,
    bottom: 0,
    width: 1,
  },
  horizontal: {
    left: 0,
    right: 0,
    height: 1,
  },
  location: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.full,
    backgroundColor: colors.textPrimary,
  },
});
