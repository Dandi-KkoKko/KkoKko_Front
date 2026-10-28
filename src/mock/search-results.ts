/** 백엔드 검색 API가 나오기 전 쓰는 가짜 검색 결과. 와이어프레임 '정문' 검색 예시 그대로. */

export type PlaceResult = {
  id: string;
  name: string;
  address: string;
  distanceMeters: number;
  /** 0이면 아직 아무도 남기지 않은 빈 자리 */
  spotCount: number;
};

export type HashtagResult = {
  hashtag: string;
  photoCount: number;
};

export const mockPlaceResults: PlaceResult[] = [
  { id: '1', name: '영남대학교 정문', address: '경산시 대동', distanceMeters: 520, spotCount: 9 },
  { id: '2', name: '정문 앞 버스정류장', address: '경산시 대동', distanceMeters: 560, spotCount: 3 },
  { id: '3', name: '정문 사거리', address: '경산시 대동', distanceMeters: 610, spotCount: 0 },
];

export const mockHashtagResults: HashtagResult[] = [
  { hashtag: '#정문앞', photoCount: 6 },
  { hashtag: '#정문붕어빵', photoCount: 2 },
];

export const mockRecentSearches = [
  { label: '중앙도서관', isPlace: true },
  { label: '#단골자리', isPlace: false },
  { label: '러브로드', isPlace: true },
  { label: '#학교앞분식', isPlace: false },
];
