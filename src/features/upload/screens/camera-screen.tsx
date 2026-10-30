import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
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
 * 지금은 셔터를 누르면 사진 없이 다음 단계로 간다. expo-camera를 붙이면 찍은 사진을 draft에 넣는다.
 */
export function CameraScreen() {
  const { draft, updateDraft } = useUploadDraft();

  const takePhoto = () => {
    updateDraft({ photoUri: undefined });
    router.push('/upload/write');
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

      <CameraViewfinder placeLabel={draft.placeLabel} />

      <AppText variant="caption04" color="textInverse" style={styles.notice}>
        얼굴이 담기면 올릴 수 없어요 · 앱 카메라로만 남길 수 있어요
      </AppText>

      <View style={styles.controls}>
        <AppText variant="caption04" color="textDeactivated" style={styles.sideControl}>
          {'갤러리\n사용 안 함'}
        </AppText>
        <Pressable accessibilityRole="button" accessibilityLabel="사진 찍기" onPress={takePhoto} style={styles.shutter}>
          <View style={styles.shutterInner} />
        </Pressable>
        <View style={styles.sideControl}>
          <Pressable accessibilityLabel="카메라 전환" style={styles.flipButton}>
            <Icon name="cameraSwitch" />
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
