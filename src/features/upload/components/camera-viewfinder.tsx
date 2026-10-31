import { CameraView, type CameraType } from 'expo-camera';
import type { Ref } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/layout';

type CameraViewfinderProps = {
  cameraRef: Ref<CameraView>;
  facing: CameraType;
  /** 카메라 권한이 있을 때만 실제 카메라를 띄운다. 없으면 권한 안내를 보여준다. */
  hasPermission: boolean;
  onRequestPermission: () => void;
  onReady: () => void;
};

/**
 * 카메라 화면 칸. 저장되는 사진과 같은 세로 3:4 칸에 카메라를 가운데 채워 보여줘서, 보이는 그대로 찍힌다.
 * 사진은 앱 안(캐시)에만 저장되고 갤러리에는 저장하지 않는다. 갤러리 권한도 받지 않는다.
 */
export function CameraViewfinder({
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
    </View>
  );
}

const styles = StyleSheet.create({
  viewfinder: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: colors.placeholderBox,
    overflow: 'hidden',
  },
  permission: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
    backgroundColor: colors.textSecondary,
  },
  permissionText: {
    textAlign: 'center',
  },
  // 공통 Button은 화면 폭을 채우는 모양이라, 가운데 놓을 때는 양옆 여백을 준다.
  permissionButton: {
    paddingHorizontal: spacing.xl,
  },
});
