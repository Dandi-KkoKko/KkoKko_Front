/** 위도·경도. 카카오맵과 expo-location이 같은 모양으로 주고받는다. */
export type Coordinate = {
  latitude: number;
  longitude: number;
};

/** 가까운 사진끼리 묶인 표시. 누르면 묶음 목록으로 간다. */
type ClusterMarker = {
  kind: 'cluster';
  id: string;
  coordinate: Coordinate;
  label: string;
  moreCount: number;
  /** 묶음 화면에서 지금 열어 본 묶음. 연한 주황 원으로 감싼다. */
  isSelected?: boolean;
};

/** 사진 하나. 지도에는 첫 해시태그만, 가장 가까운 기록 카드에는 전부 보여준다. */
export type PhotoMarker = {
  kind: 'photo';
  id: string;
  coordinate: Coordinate;
  hashtags: string[];
  /** 열림 반경 안에 들어와서 흐리지 않게 보이는 사진 */
  isOpen: boolean;
  /** 기록이 남겨진 장소 이름 ('영남대학교 정문'). 서버가 주는 값이다. */
  placeName?: string;
  /** 남긴 사람의 한 줄. 열린 기록에서만 보여준다. */
  comment?: string;
};

export type HomeMapMarker = ClusterMarker | PhotoMarker;

/** 지도 홈 마커 중 사진 기록만 고를 때 쓴다 (묶음은 하나의 기록이 아니라서 뺀다). */
export const isPhotoMarker = (marker: { kind: string }): marker is PhotoMarker => marker.kind === 'photo';

/** 검색결과 지도의 작은 표시. 결과 목록과 같은 순서로 놓인다. */
type ResultMarker = {
  kind: 'result';
  id: string;
  coordinate: Coordinate;
};

/** 검색결과에서 고른 곳. 검은 핀이고, 이름표(label)가 있으면 핀 위에 단다. */
type PinMarker = {
  kind: 'pin';
  id: string;
  coordinate: Coordinate;
  label?: string;
};

/** 카카오맵에 올릴 수 있는 모든 표시 */
export type MapMarker = HomeMapMarker | ResultMarker | PinMarker;
