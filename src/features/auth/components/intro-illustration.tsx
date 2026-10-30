import { Image } from 'expo-image';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Badge } from '@/components/badge';
import { spacing } from '@/constants/layout';
import { BlurPhoto } from '@/features/auth/components/blur-photo';
import type { IntroIllustrationName } from '@/features/auth/constants/intro-slides';

const searchImage = require('@/assets/images/onboarding/intro-search.png');
const bookImage = require('@/assets/images/onboarding/intro-book.png');
const glowImage = require('@/assets/images/onboarding/intro-glow.svg');

type IntroIllustrationProps = {
  name: IntroIllustrationName;
};

/** 소개 화면 위쪽 그림. 장마다 GUI 일러스트가 다르다. */
export function IntroIllustration({ name }: IntroIllustrationProps) {
  if (name === 'search') {
    return (
      <View style={styles.center}>
        <Image source={searchImage} style={styles.search} />
        {/* 돋보기 아래 주황 빛번짐 */}
        <Image source={glowImage} style={styles.glow} />
      </View>
    );
  }

  if (name === 'book') {
    return <Image source={bookImage} style={styles.book} />;
  }

  return (
    <View style={styles.blurPhotos}>
      <HashtagPhoto size={97} hashtag="#골목속장미" style={styles.smallPhoto} />
      <HashtagPhoto size={118} hashtag="#말없이챙겨준" style={styles.largePhoto} />
    </View>
  );
}

type HashtagPhotoProps = {
  size: number;
  hashtag: string;
  style: ViewStyle;
};

function HashtagPhoto({ size, hashtag, style }: HashtagPhotoProps) {
  return (
    <View style={[styles.hashtagPhoto, style]}>
      <BlurPhoto size={size} />
      <Badge label={hashtag} style={styles.hashtag} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  search: {
    width: 182,
    height: 182,
    transform: [{ rotate: '-11deg' }],
  },
  glow: {
    width: 174,
    height: 79,
    marginTop: -spacing.xl,
  },
  book: {
    width: 210,
    height: 210,
  },
  // 두 사진을 비스듬히 겹쳐 놓으려고 Figma 배치 비율대로 절대 위치를 쓴다
  blurPhotos: {
    width: 240,
    height: 250,
  },
  smallPhoto: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  largePhoto: {
    position: 'absolute',
    top: 97,
    right: 0,
  },
  hashtagPhoto: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  hashtag: {
    alignSelf: 'center',
  },
});
