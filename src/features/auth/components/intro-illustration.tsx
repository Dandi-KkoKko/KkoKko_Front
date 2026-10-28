import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

/** 소개 화면 위쪽 그림. 실제 일러스트가 나오기 전까지 흐린 사진 두 장으로 대신한다. */
export function IntroIllustration() {
  return (
    <View style={styles.card}>
      <PhotoPlaceholder width={96} height={96} style={styles.photoTop} />
      <View style={styles.photoBottom}>
        <PhotoPlaceholder width={116} height={116} />
        <View style={styles.hashtag}>
          <AppText variant="caption03">#말없이챙겨준</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 360,
    borderRadius: radius.xl,
    backgroundColor: colors.background02,
  },
  photoTop: {
    position: 'absolute',
    top: 60,
    left: 40,
  },
  photoBottom: {
    position: 'absolute',
    top: 150,
    right: 46,
    alignItems: 'center',
    gap: spacing.xxs,
  },
  hashtag: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: radius.full,
    backgroundColor: colors.background01,
  },
});
