import type { ImageProps } from 'expo-image';

/** 사진 자리에 넣을 수 있는 값. 지금은 앱에 넣은 예시 사진(require), 서버가 붙으면 사진 주소(uri)가 들어온다. */
export type PhotoSource = ImageProps['source'];
