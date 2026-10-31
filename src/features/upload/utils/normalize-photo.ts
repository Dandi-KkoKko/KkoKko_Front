import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';

/** 앱에 남기는 모든 사진의 크기. 세로 3:4로 고정해서 백엔드·목록·상세가 같은 크기를 기준으로 삼는다. */
export const photoSize = { width: 1080, height: 1440 } as const;

const photoRatio = photoSize.width / photoSize.height;

type TakenPhoto = {
  uri: string;
  width: number;
  height: number;
};

/**
 * 찍은 사진을 세로 3:4, 1080×1440으로 맞춘다.
 * 카메라에서 크기를 고정하지 않는 이유: 폰마다 지원하는 사진 크기가 달라서, 없는 크기를 고르면 무시되거나 오류가 난다.
 * 대신 찍은 뒤에 가운데를 잘라서, 어떤 폰으로 찍어도 같은 사진이 되게 한다.
 * 카메라 화면도 3:4 칸에 가운데를 채워 보여주므로 화면에 보이던 모습 그대로 저장된다.
 */
export async function normalizePhoto({ uri, width, height }: TakenPhoto) {
  // 대부분 폰은 이미 3:4라 자를 게 없고, 다른 비율이면 넘치는 쪽(양옆 또는 위아래)만 잘라낸다.
  const isWider = width / height > photoRatio;
  const cropWidth = isWider ? Math.round(height * photoRatio) : width;
  const cropHeight = isWider ? height : Math.round(width / photoRatio);

  const context = ImageManipulator.manipulate(uri)
    .crop({
      originX: Math.round((width - cropWidth) / 2),
      originY: Math.round((height - cropHeight) / 2),
      width: cropWidth,
      height: cropHeight,
    })
    .resize(photoSize);

  const image = await context.renderAsync();
  const result = await image.saveAsync({ format: SaveFormat.JPEG, compress: 0.8 });
  return result.uri;
}
