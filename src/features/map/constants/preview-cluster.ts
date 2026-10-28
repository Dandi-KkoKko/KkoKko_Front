/**
 * 와이어프레임 ①-A '이 묶음의 자리 12개' 예시. 묶음 API가 나오면 서버 데이터로 바뀐다.
 * 첫 사진은 좋아요가 가장 많은 구역 대표 사진이라 맛보기(흐리지 않음)로 보여준다.
 */

export type ClusterSpot = {
  spotId: string;
  hashtag: string;
  distanceMeters: number;
  isRepresentative?: boolean;
};

export const previewCluster = {
  areaLabel: 'E동 근처',
  distanceMeters: 150,
  spots: [
    { spotId: '4', hashtag: '#말없이챙겨준', distanceMeters: 150, isRepresentative: true },
    { spotId: '2', hashtag: '#덤', distanceMeters: 140 },
    { spotId: '6', hashtag: '#공강벤치', distanceMeters: 90 },
    { spotId: '5', hashtag: '#과방', distanceMeters: 160 },
    { spotId: '8', hashtag: '#국밥집', distanceMeters: 210 },
    { spotId: '7', hashtag: '#자판기', distanceMeters: 120 },
    { spotId: '10', hashtag: '#혼자만의자리', distanceMeters: 230 },
    { spotId: '11', hashtag: '#노을', distanceMeters: 250 },
    { spotId: '12', hashtag: '#단골자리', distanceMeters: 180 },
    { spotId: '13', hashtag: '#밥뭇나', distanceMeters: 270 },
    { spotId: '14', hashtag: '#학교앞분식', distanceMeters: 300 },
    { spotId: '15', hashtag: '#골목', distanceMeters: 320 },
  ] satisfies ClusterSpot[],
};
