/**
 * 장소 화면(/map/place/[id])이 아직 쓰는 가짜 장소. 검색 화면은 카카오 로컬 API로 바뀌었다.
 * 장소 화면을 카카오 장소로 바꾸면 이 파일은 지운다.
 */

export type PlaceResult = {
  id: string;
  name: string;
  address: string;
  distanceMeters: number;
  /** 0이면 아직 아무도 남기지 않은 빈 자리 */
  spotCount: number;
};

export const mockPlaceResults: PlaceResult[] = [
  { id: '1', name: '영남대학교 정문', address: '경산시 대동', distanceMeters: 520, spotCount: 9 },
  { id: '2', name: '정문 앞 버스정류장', address: '경산시 대동', distanceMeters: 560, spotCount: 3 },
  { id: '3', name: '정문 사거리', address: '경산시 대동', distanceMeters: 610, spotCount: 0 },
];
