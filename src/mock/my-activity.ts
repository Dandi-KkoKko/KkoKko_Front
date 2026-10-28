/** 백엔드 '마이' API가 나오기 전 쓰는 가짜 데이터. 와이어프레임 ③ 마이 탭 예시 그대로. */

import type { MapArea } from '@/types/map-area';

export const mockProfile = {
  nickname: '벤치지킴이',
  school: '영남대학교',
  loginProvider: '카카오',
};

export const mockMyStats = {
  leftCount: 12,
  openedCount: 27,
  likedCount: 9,
  unreadNotificationCount: 2,
};

export type LikedSpot = {
  spotId: string;
  hashtags: string[];
  placeLabel: string;
};

export const mockLikedSpots: LikedSpot[] = [
  { spotId: '2', hashtags: ['#말없이챙겨준', '#국밥집'], placeLabel: 'E동 뒤 골목' },
  { spotId: '3', hashtags: ['#덤', '#떡집'], placeLabel: '학교 앞' },
  { spotId: '6', hashtags: ['#공강벤치'], placeLabel: '러브로드' },
  { spotId: '8', hashtags: ['#밥뭇나'], placeLabel: '민속촌 근처' },
];

export const mockLikedAreas: MapArea[] = [
  { id: 'l1', name: 'E동 뒤 골목', count: 3, hashtags: ['#말없이챙겨준', '#국밥집', '#단골'], position: { top: '20%', left: '14%' } },
  { id: 'l2', name: '학교 앞', count: 3, hashtags: ['#덤', '#떡집', '#붕어빵'], position: { top: '62%', left: '30%' } },
  { id: 'l3', name: '러브로드', count: 2, hashtags: ['#공강벤치', '#노을'], position: { top: '30%', left: '72%' } },
  { id: 'l4', name: '민속촌 근처', count: 1, hashtags: ['#밥뭇나'], position: { top: '70%', left: '76%' } },
];

/** 연 자리 기록: 이번 주 요일별로 연 자리가 있었는지. 오늘은 따로 강조한다. */
export const mockOpenedWeek = {
  totalCount: 7,
  days: [
    { label: '월', opened: true },
    { label: '화', opened: true },
    { label: '수', opened: false },
    { label: '목', opened: true },
    { label: '금', opened: true },
    { label: '토', opened: true, isToday: true },
    { label: '일', opened: false },
  ],
  firstOpenerCount: 3,
  walkedKilometers: 4.2,
};

export type OpenedHistoryItem = {
  spotId: string;
  oneLine: string;
  meta: string;
};

export const mockOpenedHistory: { dateLabel: string; items: OpenedHistoryItem[] }[] = [
  {
    dateLabel: '10월 25일 (토)',
    items: [
      { spotId: '2', oneLine: '사장님이 말없이 고기 더 얹어주는 국밥집.', meta: '#말없이챙겨준 · E동 뒤 골목' },
      { spotId: '3', oneLine: '떡 한 개 더 넣어주시는 할매.', meta: '#덤 · 학교 앞 · 처음 연 자리' },
    ],
  },
  {
    dateLabel: '10월 23일 (목)',
    items: [{ spotId: '6', oneLine: '비 오는 날 우산 씌워준 과 선배.', meta: '#말없이챙겨준 · 중앙도서관' }],
  },
];
