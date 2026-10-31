import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { colors, palette } from '@/constants/colors';
import { radius, screenPaddingX, spacing } from '@/constants/layout';

/** Figma 사진 크기 280×362 */
const photoWidth = 280;
const photoHeight = 362;
/** 사진을 두 겹(진한 주황 안쪽, 연한 주황 바깥)으로 감싸는 테두리 두께 */
const frameWidth = spacing.xs;

type PhotoUnlockOverlayProps = {
  onOpen: () => void;
  onDismiss: () => void;
};

/**
 * Figma '사진 해금 UI'. 목적지에 도착해 그 자리의 기록이 열리면 화면 위에 띄운다.
 * 사진 해금은 다른 사람이 이 자리에서 남긴 사진과 한 줄을 볼 수 있게 되는 것이다.
 * 바깥 어두운 곳을 누르면 닫고 길안내 지도로 돌아간다.
 * Figma처럼 아래 탭 바까지 덮어야 해서, 화면 안의 View가 아니라 Modal로 띄운다.
 */
export function PhotoUnlockOverlay({ onOpen, onDismiss }: PhotoUnlockOverlayProps) {
  return (
    <Modal transparent animationType="fade" statusBarTranslucent onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        {/* 어둡게 덮는 판. Figma 색(#313131, 80%)을 팔레트 색 + 투명도로 만든다. */}
        <Pressable accessibilityRole="button" accessibilityLabel="닫기" onPress={onDismiss} style={styles.backdrop} />

        <View style={styles.content}>
          <View style={styles.outerFrame}>
            <View style={styles.innerFrame}>
              <PhotoPlaceholder width="100%" height="100%" style={styles.photo} />
            </View>
          </View>

          <View style={styles.texts}>
            <AppText variant="heading01" color="textInverse">
              열렸어요
            </AppText>
            <AppText variant="button02" color="textInverse">
              다가와 준 덕분에 이 자리의 마음이 보여요
            </AppText>
          </View>

          <Button label="사진과 한 줄 보기" variant="primary" onPress={onOpen} style={styles.button} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    paddingHorizontal: screenPaddingX,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: palette.gray[800],
    opacity: 0.8,
  },
  content: {
    alignItems: 'center',
    gap: spacing.xl,
  },
  outerFrame: {
    width: photoWidth,
    height: photoHeight,
    padding: frameWidth,
    borderRadius: radius.xl + spacing.md,
    backgroundColor: palette.primary[100],
  },
  innerFrame: {
    flex: 1,
    padding: frameWidth,
    borderRadius: radius.xl + spacing.xs,
    backgroundColor: colors.primary,
  },
  photo: {
    borderRadius: radius.xl,
  },
  texts: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  button: {
    alignSelf: 'stretch',
  },
});
