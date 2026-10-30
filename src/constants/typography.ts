/**
 * Figma 글꼴 토큰. GUI 디자인 페이지에서 실제로 쓰는 텍스트 스타일 값을 따른다.
 * '디자인 시스템 > 스타일 가이드' 표(node 22:2)는 예전 값(Caption/01 Regular, Caption/02 12px)이 남아 있어서 쓰지 않는다.
 *
 * Android는 커스텀 폰트에서 fontWeight로 굵기를 고르지 못하므로,
 * 굵기마다 fontFamily를 따로 등록해서 쓴다.
 */

import type { TextStyle } from 'react-native';

export const fontFiles = {
  'Pretendard-Regular': require('@/assets/fonts/Pretendard-Regular.otf'),
  'Pretendard-SemiBold': require('@/assets/fonts/Pretendard-SemiBold.otf'),
  'Pretendard-Bold': require('@/assets/fonts/Pretendard-Bold.otf'),
};

const fontFamily = {
  regular: 'Pretendard-Regular',
  semiBold: 'Pretendard-SemiBold',
  bold: 'Pretendard-Bold',
} as const;

/** Figma의 lineHeight는 배수(1.2 = 120%)라서 RN이 쓰는 px로 바꾼다. */
function style(family: string, fontSize: number, lineHeightRatio: number): TextStyle {
  return {
    fontFamily: family,
    fontSize,
    lineHeight: Math.round(fontSize * lineHeightRatio),
    letterSpacing: 0,
  };
}

export const typography = {
  heading01: style(fontFamily.bold, 28, 1.2),
  heading02: style(fontFamily.bold, 24, 1.2),
  heading03: style(fontFamily.bold, 22, 1.2),

  subtitle01: style(fontFamily.semiBold, 20, 1.4),
  subtitle02: style(fontFamily.semiBold, 18, 1.4),
  subtitle03: style(fontFamily.semiBold, 16, 1.4),
  subtitle04: style(fontFamily.semiBold, 14, 1.4),

  body01: style(fontFamily.regular, 16, 1.6),
  body02: style(fontFamily.regular, 14, 1.6),

  caption01: style(fontFamily.bold, 14, 1.4),
  caption02: style(fontFamily.regular, 14, 1.4),
  caption03: style(fontFamily.bold, 12, 1.4),
  caption04: style(fontFamily.regular, 12, 1.4),

  button01: style(fontFamily.bold, 16, 1.4),
  button02: style(fontFamily.regular, 16, 1.4),
  button03: style(fontFamily.bold, 14, 1.4),
  button04: style(fontFamily.regular, 14, 1.4),
  button05: style(fontFamily.bold, 12, 1.4),
  button06: style(fontFamily.regular, 12, 1.4),
} as const;

export type TypographyVariant = keyof typeof typography;
