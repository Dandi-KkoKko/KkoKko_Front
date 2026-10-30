import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { View } from 'react-native';

import { colors, type ColorName } from '@/constants/colors';

type ColorVariants = { default: number } & Partial<Record<ColorName, number>>;

/**
 * Figma GUI 디자인 > Component의 아이콘(assets/icons). 이름은 Figma 레이어 이름을 따랐다.
 * 디자이너가 색별로 따로 만든 파일(검정·회색·흰색)이 있으면 그 파일을 쓴다.
 * SVG 색칠(tintColor)은 Android에서 동작이 문서화되어 있지 않아서, 색 파일이 없을 때만 쓴다.
 */
const figmaIcons = {
  back: {
    default: require('@/assets/icons/arrow-left-black-m.svg'),
    textInverse: require('@/assets/icons/arrow-left-white-m.svg'),
  },
  forward: { default: require('@/assets/icons/arrow-right-gray-m.svg') },
  forwardSmall: { default: require('@/assets/icons/arrow-right-gray-s.svg') },
  arrowDown: { default: require('@/assets/icons/arrow-down-s.svg') },
  close: { default: require('@/assets/icons/close-m.svg') },
  closeLarge: { default: require('@/assets/icons/close-l.svg') },
  closeThin: { default: require('@/assets/icons/close-thin.svg') },
  closeSmall: { default: require('@/assets/icons/close-s.svg') },
  location: {
    default: require('@/assets/icons/location-black.svg'),
    textDeactivated: require('@/assets/icons/location-gray.svg'),
  },
  record: {
    default: require('@/assets/icons/file-black.svg'),
    textDeactivated: require('@/assets/icons/file-gray.svg'),
  },
  person: {
    default: require('@/assets/icons/profile-black.svg'),
    textDeactivated: require('@/assets/icons/profile-gray.svg'),
  },
  search: {
    default: require('@/assets/icons/search-black.svg'),
    textDeactivated: require('@/assets/icons/search-gray.svg'),
  },
  myLocation: { default: require('@/assets/icons/direction.svg') },
  route: { default: require('@/assets/icons/route.svg') },
  camera: {
    default: require('@/assets/icons/camera.svg'),
    textInverse: require('@/assets/icons/camera-white.svg'),
  },
  cameraSwitch: { default: require('@/assets/icons/camera-switch-white.svg') },
  bell: { default: require('@/assets/icons/bell.svg') },
  check: { default: require('@/assets/icons/check-white.svg') },
  report: { default: require('@/assets/icons/siren-inner.svg') },
  hashtag: { default: require('@/assets/icons/hashtag-m-inner.svg') },
  hashtagSmall: { default: require('@/assets/icons/hashtag-s-inner.svg') },
  heart: { default: require('@/assets/icons/heart-empty.svg') },
  heartFilled: { default: require('@/assets/icons/heart-filled.svg') },
  heartSmall: {
    default: require('@/assets/icons/heart-black-s.svg'),
    textDeactivated: require('@/assets/icons/heart-gray-s.svg'),
  },
  unlock: { default: require('@/assets/icons/unlock-s.svg') },
  settings: { default: require('@/assets/icons/setting-s.svg') },
  eyeOpen: {
    default: require('@/assets/icons/eye-open-black.svg'),
    textInverse: require('@/assets/icons/eye-open-white.svg'),
  },
  eyeClosed: { default: require('@/assets/icons/eye-closed.svg') },
  reload: { default: require('@/assets/icons/reload.svg') },
} satisfies Record<string, ColorVariants>;

/**
 * Figma에서 아이콘 그림만 따로 내보내져 상자보다 작은 것들. 상자 크기 대비 안쪽 여백 비율.
 * (siren은 24 상자 안의 20, hashtag_m은 24 안의 18, hashtag_s는 16 안의 14)
 */
const innerPadding: Partial<Record<keyof typeof figmaIcons, number>> = {
  report: 2 / 24,
  hashtag: 3 / 24,
  hashtagSmall: 1 / 16,
};

// Figma 아이콘 모음에 없어서 iOS·Android 기본 아이콘으로 대신하는 것들
const fallbackSymbols = {
  plus: { ios: 'plus', android: 'add', web: 'add' },
  minus: { ios: 'minus', android: 'remove', web: 'remove' },
  lock: { ios: 'lock', android: 'lock', web: 'lock' },
  clock: { ios: 'clock', android: 'schedule', web: 'schedule' },
} as const;

export type IconName = keyof typeof figmaIcons | keyof typeof fallbackSymbols;

type IconProps = {
  name: IconName;
  size?: number;
  /** 정하지 않으면 Figma 파일 원래 색 */
  color?: ColorName;
};

export function Icon({ name, size = 24, color }: IconProps) {
  if (name in fallbackSymbols) {
    const symbol = fallbackSymbols[name as keyof typeof fallbackSymbols];
    return <SymbolView name={symbol} size={size} tintColor={colors[color ?? 'textPrimary']} />;
  }

  const variants: ColorVariants = figmaIcons[name as keyof typeof figmaIcons];
  const variantFile = color ? variants[color] : undefined;
  const padding = (innerPadding[name as keyof typeof figmaIcons] ?? 0) * size;

  return (
    <View style={{ width: size, height: size, padding }}>
      <Image
        source={variantFile ?? variants.default}
        style={{ flex: 1 }}
        contentFit="contain"
        tintColor={color && !variantFile ? colors[color] : undefined}
      />
    </View>
  );
}
