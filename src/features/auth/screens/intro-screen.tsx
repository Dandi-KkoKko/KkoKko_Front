import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { ScreenContainer } from '@/components/screen-container';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { IntroIllustration } from '@/features/auth/components/intro-illustration';
import { introSlides } from '@/features/auth/constants/intro-slides';

/** 시작: 서비스 소개 3장. 마지막 장에서 '다음'을 누르면 로그인으로 간다. */
export function IntroScreen() {
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = introSlides[slideIndex];
  const isLastSlide = slideIndex === introSlides.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      router.push('/login');
      return;
    }
    setSlideIndex(slideIndex + 1);
  };

  return (
    <ScreenContainer
      footer={
        <>
          <View style={styles.dots}>
            {introSlides.map((item, index) => (
              <View key={item.title} style={[styles.dot, index === slideIndex && styles.activeDot]} />
            ))}
          </View>
          <Button label="다음" variant="primary" onPress={handleNext} />
        </>
      }>
      <View style={styles.content}>
        <View style={styles.illustration}>
          <IntroIllustration name={slide.illustration} />
        </View>
        <View style={styles.texts}>
          <AppText variant="heading01" style={styles.center}>
            {slide.title}
          </AppText>
          <AppText variant="subtitle03" color="textSecondary" style={styles.center}>
            {slide.description}
          </AppText>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xxxl,
  },
  // 장마다 그림 크기가 달라도 글자 위치가 흔들리지 않게 그림 칸 높이를 고정한다
  illustration: {
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    gap: spacing.md,
  },
  center: {
    textAlign: 'center',
  },
  dots: {
    marginBottom: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.placeholderBox,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
});
