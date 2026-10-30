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
};

export type HomeMapMarker = ClusterMarker | PhotoMarker;

/** 검색결과 지도의 작은 표시. 결과 목록과 같은 순서로 놓인다. */
type ResultMarker = {
  kind: 'result';
  id: string;
  coordinate: Coordinate;
};

/** 카카오맵에 올릴 수 있는 모든 표시 */
export type MapMarker = HomeMapMarker | ResultMarker;
