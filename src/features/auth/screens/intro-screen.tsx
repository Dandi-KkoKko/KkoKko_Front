import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { ScreenContainer } from '@/components/screen-container';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { IntroIllustration } from '@/features/auth/components/intro-illustration';
import { introSlides } from '@/features/auth/constants/intro-slides';

/** 와이어프레임 ⓪ 시작: 서비스 소개 3장 */
export function IntroScreen() {
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = introSlides[slideIndex];
  const isLastSlide = slideIndex === introSlides.length - 1;

  const goToMap = () => router.replace('/map');

  const handleNext = () => {
    if (isLastSlide) {
      router.push('/login');
      return;
    }
    setSlideIndex(slideIndex + 1);
  };

  return (
    <ScreenContainer
      header={
        <View style={styles.header}>
          <Pressable hitSlop={12} onPress={goToMap}>
            <AppText variant="caption02" color="textTertiary">
              건너뛰기
            </AppText>
          </Pressable>
        </View>
      }
      footer={<Button label={isLastSlide ? '시작하기' : '다음'} onPress={handleNext} />}>
      <IntroIllustration />

      <View style={styles.texts}>
        <AppText variant="heading03" style={styles.center}>
          {slide.title}
        </AppText>
        <AppText variant="body02" color="textSecondary" style={styles.center}>
          {slide.description}
        </AppText>
      </View>

      <View style={styles.dots}>
        {introSlides.map((item, index) => (
          <View key={item.title} style={[styles.dot, index === slideIndex && styles.activeDot]} />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  texts: {
    marginTop: spacing.xxl,
    gap: spacing.sm,
  },
  center: {
    textAlign: 'center',
  },
  dots: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.borderDeactivated,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.textPrimary,
  },
});
