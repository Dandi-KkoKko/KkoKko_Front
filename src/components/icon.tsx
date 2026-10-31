import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';

import { colors, type ColorName } from '@/constants/colors';

/**
 * Figma '그래픽 아이콘'·'기본 아이콘'에서 받은 그림. 검은 그림 하나를 tintColor로 칠해서 검정·회색·흰색을 모두 낸다.
 * 디자인에 그림이 있는 아이콘은 여기서 쓰고, 없는 것만 아래 시스템 아이콘을 쓴다.
 */
const graphicIcons = {
  back: require('@/assets/icons/back.png'),
  forward: require('@/assets/icons/forward.png'),
  chevronDown: require('@/assets/icons/chevron-down.png'),
  close: require('@/assets/icons/close.png'),
  check: require('@/assets/icons/check.png'),
  refresh: require('@/assets/icons/refresh.png'),
  cameraSwitch: require('@/assets/icons/camera-switch.png'),
  location: require('@/assets/icons/location.png'),
  myLocation: require('@/assets/icons/my-location.png'),
  route: require('@/assets/icons/route.png'),
  search: require('@/assets/icons/search.png'),
  camera: require('@/assets/icons/camera.png'),
  bell: require('@/assets/icons/bell.png'),
  person: require('@/assets/icons/person.png'),
  record: require('@/assets/icons/record.png'),
  heart: require('@/assets/icons/heart.png'),
  heartFilled: require('@/assets/icons/heart-filled.png'),
  eye: require('@/assets/icons/eye.png'),
  eyeClosed: require('@/assets/icons/eye-closed.png'),
  report: require('@/assets/icons/report.png'),
  // 아래 둘은 Figma에 16px 그림만 있어서 24px로 크게 쓰면 조금 흐릴 수 있다.
  unlock: require('@/assets/icons/unlock.png'),
  settings: require('@/assets/icons/settings.png'),
};

/**
 * Figma에 그림이 아직 없는 아이콘. iOS는 SF Symbols, Android·웹은 Material Symbols 이름이 달라서 한곳에서 짝을 맞춘다.
 * 새 아이콘이 필요하면 Figma 그림을 assets/icons에 넣고 위에 추가하거나, 그림이 없으면 여기에 추가한다.
 */
const symbolIcons = {
  plus: { ios: 'plus', android: 'add', web: 'add' },
  minus: { ios: 'minus', android: 'remove', web: 'remove' },
  lock: { ios: 'lock', android: 'lock', web: 'lock' },
  flag: { ios: 'flag', android: 'flag', web: 'flag' },
  clock: { ios: 'clock', android: 'schedule', web: 'schedule' },
  hashtag: { ios: 'number', android: 'tag', web: 'tag' },
} as const;

type GraphicIconName = keyof typeof graphicIcons;
export type IconName = GraphicIconName | keyof typeof symbolIcons;

type IconProps = {
  name: IconName;
  size?: number;
  color?: ColorName;
};

const isGraphicIcon = (name: IconName): name is GraphicIconName => name in graphicIcons;

export function Icon({ name, size = 24, color = 'textPrimary' }: IconProps) {
  if (isGraphicIcon(name)) {
    return <Image source={graphicIcons[name]} style={{ width: size, height: size }} tintColor={colors[color]} />;
  }
  return <SymbolView name={symbolIcons[name]} size={size} tintColor={colors[color]} />;
}
