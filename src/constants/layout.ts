import { palette } from '@/constants/colors';

/**
 * 간격과 모서리 값. Figma 디자인 시스템에는 아직 없어서 GUI 화면에 쓰인 값으로 정했다.
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

/** 화면 좌우 여백 (Figma GUI 화면 기준 20) */
export const screenPaddingX = spacing.lg;

/** 제목 덩어리와 본문 덩어리 사이처럼 큰 묶음 사이 간격 (Figma 온보딩 gap 40) */
export const sectionGap = 40;

/** 지도 위에 떠 있는 카드·버튼의 그림자 */
export const floatingShadow = {
  shadowColor: palette.gray.black,
  shadowOpacity: 0.1,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 4,
} as const;

/** 소개·설문 완료 그림의 흐린 사진 카드 그림자 (Figma drop shadow 0 0 12, 검정 16%) */
export const photoShadow = {
  shadowColor: palette.gray.black,
  shadowOpacity: 0.16,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 0 },
  elevation: 4,
} as const;

/** 리스트/지도 토글에서 고른 칸이 살짝 떠 보이게 (Figma drop shadow 0 0 8, 검정 8%) */
export const toggleShadow = {
  shadowColor: palette.gray.black,
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 0 },
  elevation: 2,
} as const;
