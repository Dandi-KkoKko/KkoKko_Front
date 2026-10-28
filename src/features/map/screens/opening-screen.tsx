import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { colors } from '@/constants/colors';
import { radius, screenPaddingX, spacing } from '@/constants/layout';

/**
 * 와이어프레임 ①-B: 점선 안에 들어와 사진이 열리는 순간. 탭 바 없이 화면 전체를 쓴다.
 * 흐림이 걷히는 애니메이션은 GUI 디자인이 나오면 넣는다 (expo-image의 blurRadius를 줄이는 방식).
 */
export function OpeningScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const showOpenedSpot = () => {
    router.dismiss();
    router.push(`/map/opened/${id}`);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.center}>
        <View style={styles.glow}>
          <PhotoPlaceholder width={240} height={300} highlighted style={styles.photo}>
            <View style={styles.animationNote}>
              <Badge label="흐림이 걷히는 애니메이션" style={styles.noteBadge} />
            </View>
          </PhotoPlaceholder>
        </View>
        <AppText variant="heading02" color="textInverse">
          열렸어요
        </AppText>
        <AppText variant="body02" color="textInverse">
          다가와 준 덕분에 이 자리의 마음이 보여요
        </AppText>
      </View>

      <View style={styles.footer}>
        <Button label="사진과 한 줄 보기" variant="primary" onPress={showOpenedSpot} />
        <AppText variant="caption02" color="textInverse" style={styles.centerText}>
          &apos;연 자리 기록&apos;에 조용히 남겨졌어요
        </AppText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.textSecondary,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  glow: {
    padding: spacing.xs,
    marginBottom: spacing.md,
    borderRadius: radius.xl,
    backgroundColor: colors.primary,
    opacity: 0.9,
  },
  photo: {
    backgroundColor: colors.placeholderBox,
  },
  animationNote: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  noteBadge: {
    alignSelf: 'center',
  },
  footer: {
    paddingHorizontal: screenPaddingX,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  centerText: {
    textAlign: 'center',
  },
});
