/**
 * 정적 지도 위 한 구역. 내 기록·좋아요 내역의 '지도' 보기에서 쓴다.
 * position은 회색 지도 위 화면 좌표라서, 진짜 지도를 붙이면 위도·경도로 바뀐다.
 */
export type MapArea = {
  id: string;
  name: string;
  count: number;
  hashtags: string[];
  position: { top: `${number}%`; left: `${number}%` };
};
