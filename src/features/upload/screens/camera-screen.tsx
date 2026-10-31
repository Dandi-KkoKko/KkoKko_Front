import { useCameraPermissions, type CameraType, type CameraView } from 'expo-camera';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, screenPaddingX, spacing } from '@/constants/layout';
import { CameraViewfinder } from '@/features/upload/components/camera-viewfinder';
import { useUploadDraft } from '@/features/upload/upload-draft';

const shutterSize = 76;

/**
 * 와이어프레임 ② 기록 탭: 남기기 1/3 촬영.
 * 갤러리는 일부러 막는다. 그 자리에서 앱 카메라로 찍은 사진만 남길 수 있어야 '가야 보이는' 지도가 된다.
 * 그래서 카메라 권한만 받고, 갤러리(사진 보관함) 권한은 받지 않는다. 찍은 사진은 draft에 넣어 다음 단계에서 보여준다.
 */
export function CameraScreen() {
  const { draft, updateDraft } = useUploadDraft();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [isReady, setIsReady] = useState(false);
  const [isTaking, setIsTaking] = useState(false);

  const askPermission = () => {
    // 한 번 거절해서 다시 물을 수 없으면 시스템 창이 뜨지 않으므로 설정 화면으로 보낸다.
    if (permission && !permission.canAskAgain) Linking.openSettings();
    else requestPermission();
  };

  const takePhoto = async () => {
    // 카메라가 준비되기 전에 찍으면 실패하고, 두 번 누르면 두 장이 찍혀서 막는다.
    if (!cameraRef.current || !isReady || isTaking) return;
    setIsTaking(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      updateDraft({ photoUri: photo.uri });
      router.push('/upload/write');
    } finally {
      setIsTaking(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable accessibilityLabel="닫기" hitSlop={12} onPress={() => router.back()}>
          <Icon name="close" color="textInverse" />
        </Pressable>
        <AppText variant="subtitle04" color="textInverse">
          1 / 3 · 촬영
        </AppText>
        <View style={styles.headerSpacer} />
      </View>

      <CameraViewfinder
        placeLabel={draft.placeLabel}
        cameraRef={cameraRef}
        facing={facing}
        hasPermission={permission?.granted ?? false}
        onRequestPermission={askPermission}
        onReady={() => setIsReady(true)}
      />

      <AppText variant="caption02" color="textInverse" style={styles.notice}>
        얼굴이 담기면 올릴 수 없어요 · 앱 카메라로만 남길 수 있어요
      </AppText>

      <View style={styles.controls}>
        <AppText variant="caption02" color="textDeactivated" style={styles.sideControl}>
          {'갤러리\n사용 안 함'}
        </AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="사진 찍기"
          accessibilityState={{ disabled: !isReady || isTaking }}
          onPress={takePhoto}
          style={styles.shutter}>
          <View style={styles.shutterInner} />
        </Pressable>
        <View style={styles.sideControl}>
          <Pressable
            accessibilityLabel="카메라 전환"
            onPress={() => setFacing((current) => (current === 'back' ? 'front' : 'back'))}
            style={styles.flipButton}>
            <Icon name="cameraSwitch" color="textInverse" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.textPrimary,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenPaddingX,
  },
  headerSpacer: {
    width: 24,
  },
  notice: {
    textAlign: 'center',
    paddingVertical: spacing.md,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenPaddingX,
    paddingVertical: spacing.xl,
  },
  sideControl: {
    width: 72,
    alignItems: 'center',
    textAlign: 'center',
  },
  shutter: {
    width: shutterSize,
    height: shutterSize,
    borderRadius: radius.full,
    borderWidth: 4,
    borderColor: colors.background01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: shutterSize - 16,
    height: shutterSize - 16,
    borderRadius: radius.full,
    backgroundColor: colors.background01,
  },
  flipButton: {
    width: 52,
    height: 52,
    borderRadius: radius.full,
    backgroundColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
