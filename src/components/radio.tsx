import { Image } from 'expo-image';

type RadioProps = {
  selected: boolean;
  size?: number;
};

const radioOff = require('@/assets/icons/radio-off.svg');
const radioOn = require('@/assets/icons/radio-on.svg');

/**
 * Figma 로그인/회원가입 checkbox의 동그라미. 여럿 중 하나 고르기(신고 사유)와 약관 동의에 같이 쓴다.
 * 누르는 영역은 감싸는 쪽(Pressable)이 정한다.
 */
export function Radio({ selected, size = 24 }: RadioProps) {
  return <Image source={selected ? radioOn : radioOff} style={{ width: size, height: size }} contentFit="contain" />;
}
