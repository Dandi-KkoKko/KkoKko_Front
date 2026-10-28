import { SymbolView } from 'expo-symbols';

import { colors, type ColorName } from '@/constants/colors';

/**
 * iOS는 SF Symbols, Android는 Material Symbols 이름이 달라서 한곳에서 짝을 맞춘다.
 * 새 아이콘이 필요하면 여기에 이름을 추가한다.
 */
const iconNames = {
  back: { ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' },
  forward: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  close: { ios: 'xmark', android: 'close', web: 'close' },
  location: { ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' },
  myLocation: { ios: 'scope', android: 'my_location', web: 'my_location' },
  route: {
    ios: 'point.topleft.down.to.point.bottomright.curvepath',
    android: 'route',
    web: 'route',
  },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  plus: { ios: 'plus', android: 'add', web: 'add' },
  minus: { ios: 'minus', android: 'remove', web: 'remove' },
  camera: { ios: 'camera', android: 'photo_camera', web: 'photo_camera' },
  bell: { ios: 'bell', android: 'notifications', web: 'notifications' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  lock: { ios: 'lock', android: 'lock', web: 'lock' },
  flag: { ios: 'flag', android: 'flag', web: 'flag' },
  clock: { ios: 'clock', android: 'schedule', web: 'schedule' },
  person: { ios: 'person', android: 'person', web: 'person' },
  unlock: { ios: 'lock.open', android: 'lock_open', web: 'lock_open' },
  hashtag: { ios: 'number', android: 'tag', web: 'tag' },
  settings: { ios: 'gearshape', android: 'settings', web: 'settings' },
  cameraSwitch: { ios: 'arrow.triangle.2.circlepath.camera', android: 'cameraswitch', web: 'cameraswitch' },
  heart: { ios: 'heart', android: 'favorite', web: 'favorite' },
  heartFilled: { ios: 'heart.fill', android: 'favorite', web: 'favorite' },
} as const;

export type IconName = keyof typeof iconNames;

type IconProps = {
  name: IconName;
  size?: number;
  color?: ColorName;
};

export function Icon({ name, size = 24, color = 'textPrimary' }: IconProps) {
  return <SymbolView name={iconNames[name]} size={size} tintColor={colors[color]} />;
}
