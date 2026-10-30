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
};

/** 사진 하나. 가까이 와서 열린 사진(isOpen)은 흐리지 않게 보여준다. */
type PhotoMarker = {
  kind: 'photo';
  id: string;
  coordinate: Coordinate;
  hashtag: string;
  isOpen: boolean;
};

export type HomeMapMarker = ClusterMarker | PhotoMarker;
