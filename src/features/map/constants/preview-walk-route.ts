/**
 * 와이어프레임 ① AI 추천 산책길 예시. AI·경로 API(TMAP 보행자 경로)가 나오면 서버 데이터로 바뀐다.
 * points는 화면 좌표(회색 지도 확인용)라서 진짜 지도를 붙이면 위도·경도로 바뀐다.
 */

export type WalkStop = {
  spotId: string;
  hashtags: string[];
  /** 출발부터 걸리는 시간. 첫 자리는 0 */
  minutesFromStart: number;
  point: { top: number; left: `${number}%` };
};

export const previewWalkRoute = {
  title: '오늘 저녁, 세 자리를 잇는 20분 길',
  reason: '좋아요한 #덤 · #단골자리 기록을 바탕으로 골랐어요',
  stops: [
    { spotId: '1', hashtags: ['#공강벤치'], minutesFromStart: 0, point: { top: 380, left: '25%' } },
    { spotId: '2', hashtags: ['#덤', '#떡집'], minutesFromStart: 7, point: { top: 240, left: '50%' } },
    { spotId: '3', hashtags: ['#말없이챙겨준', '#국밥집'], minutesFromStart: 13, point: { top: 130, left: '74%' } },
  ] satisfies WalkStop[],
};

/** 걷는 중 화면 예시: 지금 2번째 자리로 가는 중 */
export const previewWalkProgress = {
  nextStopIndex: 1,
  minutesToNext: 3,
  metersToNext: 180,
  nextStopBlurLevel: 2,
};
