/**
 * Figma "디자인 시스템 > 스타일 가이드 - 컬러" (node 1:57) 값을 그대로 옮긴 색상 토큰.
 * 화면에서는 hex 값을 직접 쓰지 말고 이 파일의 이름으로 가져다 쓴다.
 */

export const palette = {
  primary: {
    900: '#E65100',
    800: '#EF6C00',
    700: '#F57C00',
    600: '#FB8C00', // 메인 색
    500: '#FF9800',
    400: '#FFA726',
    300: '#FFB74D',
    200: '#FFCC80',
    100: '#FFE0B2',
    50: '#FFF3E0',
  },
  gray: {
    900: '#111111',
    800: '#313131',
    700: '#4F4F4F',
    600: '#626262',
    500: '#898989',
    400: '#AAAAAA',
    300: '#CFCFCF',
    200: '#E1E1E1',
    100: '#EEEEEE',
    50: '#F7F7F7',
    black: '#000000',
    white: '#FFFFFF',
  },
  error: { 1: '#FF383C', 2: '#FF4245', 3: '#FF6165' },
  warning: { 1: '#FFCC00', 2: '#FFD600', 3: '#FEDF43' },
  success: { 1: '#34C759', 2: '#30D158', 3: '#4AE968' },
  information: { 1: '#0088FF', 2: '#0091FF', 3: '#5CB8FF' },
} as const;

/** 용도별 이름. 화면에서는 주로 이것을 쓴다. */
export const colors = {
  primary: palette.primary[600],

  background01: '#FFFFFF',
  background02: '#F7F7F7',

  textPrimary: '#111111',
  textSecondary: '#4F4F4F',
  textTertiary: '#626262',
  textDeactivated: '#898989',
  textPlaceholder: '#898989',
  textInverse: '#FFFFFF',

  borderStrong: '#898989',
  borderDefault: '#AAAAAA',
  borderDeactivated: '#CFCFCF',

  error: palette.error[1],
  warning: palette.warning[1],
  success: palette.success[1],
  information: palette.information[1],

  // 아래는 Figma 디자인 시스템에 없지만 와이어프레임에 쓰여서 추가한 값. GUI 디자인이 나오면 맞춘다.
  selectedBackground: palette.primary[50],
  disabledBackground: palette.gray[100],
  placeholderBox: palette.gray[200],
  // 아직 열리지 않은 사진을 가리는 흐린 회색 (Figma 공통 컴포넌트의 사진 자리). 가운데가 진하고 가장자리로 갈수록 옅다.
  lockedPhotoCenter: palette.gray[400],
  lockedPhotoEdge: palette.gray[300],

  // 진짜 지도를 붙이기 전 회색 지도 자리 (와이어프레임 지도 색)
  mapBackground: palette.gray[100],
  mapRoad: palette.gray.white,
  mapBlock: palette.gray[200],
  // 위치 권한 안내처럼 지도 위를 흐리게 덮을 때
  dimWhite: 'rgba(255, 255, 255, 0.7)',
  // 버튼을 누르고 있을 때 덮는 막 (Figma button default_pressed: 검정 20%)
  pressedOverlay: 'rgba(0, 0, 0, 0.2)',
  // 아이콘·체크박스 테두리 (Figma Gray/800)
  iconStroke: palette.gray[800],
  // 권한 '필수'처럼 주황 배경 없이 글자만 강조할 때 (Figma Primary/900)
  primaryText: palette.primary[900],
  // 필수 권한 아이콘 동그라미 배경 (Figma Primary/100)
  primarySoft: palette.primary[100],
  // 필수 입력칸 이름 뒤 * (Figma Error/03)
  requiredMark: palette.error[3],
  // 흐린 사진 중 '내 취향' 사진의 주황 테두리 (Figma Primary/300)
  photoHighlightFrame: palette.primary[300],
  // 카메라 셔터 바깥 고리 (Figma Shutter, Primary/300)
  shutterRing: palette.primary[300],
} as const;

export type ColorName = keyof typeof colors;
