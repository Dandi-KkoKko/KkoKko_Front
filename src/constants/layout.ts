import { palette } from '@/constants/colors';

/**
 * 간격과 모서리 값. Figma 디자인 시스템에는 아직 없어서 와이어프레임 기준으로 정했다.
 * 화면에서 margin, padding, borderRadius 숫자를 직접 쓰지 말고 여기 이름을 쓴다.
 */

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

/** 화면 좌우 여백 */
export const screenPaddingX = spacing.xl;

/** 지도 위에 떠 있는 카드·버튼의 그림자 */
export const floatingShadow = {
  shadowColor: palette.gray.black,
  shadowOpacity: 0.1,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 4,
} as const;
