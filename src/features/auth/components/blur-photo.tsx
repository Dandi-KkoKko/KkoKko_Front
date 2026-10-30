import { Image } from 'expo-image';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { colors } from '@/constants/colors';
import { photoShadow, radius } from '@/constants/layout';

type BlurPhotoProps = {
  size: number;
  /** 주황 테두리로 '내 취향에 맞는 자리'를 강조한다 */
  highlighted?: boolean;
  style?: ViewStyle;
};

const blurPhoto = require('@/assets/images/onboarding/blur-photo.jpg');
// 주황 테두리 사진은 가장자리가 투명해서, 뒤에 깐 배경색이 테두리로 보인다
const highlightedBlurPhoto = require('@/assets/images/onboarding/blur-photo-highlight.png');

/** 소개·설문 완료 그림에 쓰는 흐린 사진 카드 (Figma blur, blur_color 이미지) */
export function BlurPhoto({ size, highlighted = false, style }: BlurPhotoProps) {
  return (
    <View style={[styles.card, { width: size, height: size }, highlighted && styles.highlighted, style]}>
      <Image source={highlighted ? highlightedBlurPhoto : blurPhoto} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...photoShadow,
    borderRadius: radius.md,
    backgroundColor: colors.background01,
  },
  highlighted: {
    backgroundColor: colors.photoHighlightFrame,
  },
  image: {
    flex: 1,
    borderRadius: radius.md,
  },
});
