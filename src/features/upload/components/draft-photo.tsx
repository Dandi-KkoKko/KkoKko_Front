import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { radius } from '@/constants/layout';

type DraftPhotoProps = {
  uri?: string;
  width: number;
  height: number;
};

/** 남기기 중인 사진. 찍은 사진이 있으면 그 사진을, 없으면(카메라를 건너뛴 경우) 회색 자리를 보여준다. */
export function DraftPhoto({ uri, width, height }: DraftPhotoProps) {
  if (!uri) return <PhotoPlaceholder width={width} height={height} />;
  return <Image source={{ uri }} style={[styles.photo, { width, height }]} contentFit="cover" />;
}

const styles = StyleSheet.create({
  photo: {
    borderRadius: radius.md,
  },
});
