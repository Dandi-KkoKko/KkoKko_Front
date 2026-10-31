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
import { normalizePhoto } from '@/features/upload/utils/normalize-photo';

// Figma Shutter: 바깥 주황 고리 72, 안쪽 흰 원 사이에 검은 틈
const shutterSize = 72;
const shutterRingWidth = 4;
const shutterGap = 4;
const flipButtonSize = 48;

/**
 * ② 기록 탭: 남기기 1/3 촬영.
 * 갤러리는 일부러 막는다. 그 자리에서 앱 카메라로 찍은 사진만 남길 수 있어야 '가야 보이는' 지도가 된다.
 * 그래서 카메라 권한만 받고, 갤러리(사진 보관함) 권한은 받지 않는다.
 * 찍은 사진은 세로 3:4, 1080×1440으로 맞춘 뒤 draft에 넣어 다음 단계에서 보여준다.
 */
export function CameraScreen() {
  const { updateDraft } = useUploadDraft();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [isReady, setIsReady] = useState(false);
  const [isTaking, setIsTaking] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  // 같은 순간에 두 번 누르면 state는 아직 바뀌기 전이라 둘 다 통과한다. 그래서 바로 바뀌는 ref로 막는다.
  const isTakingRef = useRef(false);

  const askPermission = () => {
    // 한 번 거절해서 다시 물을 수 없으면 시스템 창이 뜨지 않으므로 설정 화면으로 보낸다.
    if (permission && !permission.canAskAgain) Linking.openSettings();
    else requestPermission();
  };

  const takePhoto = async () => {
    // 카메라가 준비되기 전에 찍으면 실패하고, 두 번 누르면 두 장이 찍혀서 막는다.
    if (!cameraRef.current || !isReady || isTakingRef.current) return;
    isTakingRef.current = true;
    setIsTaking(true);
    setHasFailed(false);
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      const photoUri = await normalizePhoto(photo);
      updateDraft({ photoUri });
      router.push('/upload/write');
    } catch {
      // 카메라가 잠깐 바쁘거나 전환 중이면 실패한다. 다시 누르면 되므로 안내만 띄운다.
      setHasFailed(true);
    } finally {
      isTakingRef.current = false;
      setIsTaking(false);
    }
  };

  // 앞·뒤 카메라를 바꾸면 카메라가 다시 켜지므로, 다시 준비될 때까지 셔터를 막는다.
  const flipCamera = () => {
    setIsReady(false);
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable accessibilityLabel="뒤로" hitSlop={12} onPress={() => router.back()}>
          <Icon name="back" color="textInverse" />
        </Pressable>
        <AppText variant="subtitle03" color="textInverse" style={styles.headerTitle}>
          촬영
        </AppText>
        <AppText variant="subtitle03" color="textInverse">
          1/3
        </AppText>
      </View>

      <CameraViewfinder
        cameraRef={cameraRef}
        facing={facing}
        hasPermission={permission?.granted ?? false}
        onRequestPermission={askPermission}
        onReady={() => setIsReady(true)}
      />

      <View style={styles.controls}>
        {hasFailed && (
          <AppText variant="caption02" color="textInverse" style={styles.failNotice}>
            사진을 찍지 못했어요. 다시 눌러 주세요
          </AppText>
        )}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="사진 찍기"
          accessibilityState={{ disabled: !isReady || isTaking }}
          onPress={takePhoto}
          style={styles.shutter}>
          <View style={styles.shutterInner} />
        </Pressable>
        <Pressable accessibilityLabel="카메라 전환" onPress={flipCamera} style={styles.flipButton}>
          <Icon name="cameraSwitch" />
        </Pressable>
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
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenPaddingX,
  },
  // 좌우 버튼 길이와 상관없이 제목을 정확히 가운데 두려고 겹쳐 놓는다
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    pointerEvents: 'none',
  },
  // 남는 아래 공간 가운데에 셔터를 두고, 전환 버튼은 오른쪽 끝에 맞춘다
  controls: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  failNotice: {
    position: 'absolute',
    top: spacing.sm,
  },
  shutter: {
    width: shutterSize,
    height: shutterSize,
    padding: shutterGap,
    borderRadius: radius.full,
    borderWidth: shutterRingWidth,
    borderColor: colors.shutterRing,
  },
  shutterInner: {
    flex: 1,
    borderRadius: radius.full,
    backgroundColor: colors.background01,
  },
  flipButton: {
    position: 'absolute',
    right: screenPaddingX,
    width: flipButtonSize,
    height: flipButtonSize,
    borderRadius: radius.full,
    backgroundColor: colors.textTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
