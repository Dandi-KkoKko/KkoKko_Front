/** 백엔드 '마이' API가 나오기 전 쓰는 가짜 데이터. GUI ③ 마이 탭 예시 그대로. */

import { samplePhotos } from '@/mock/sample-photos';
import type { MapArea } from '@/types/map-area';
import type { PhotoSource } from '@/types/photo-source';

export const mockProfile = {
  nickname: '벤치지킴이',
  // 활동에 따라 붙는 칭호. 기준은 백엔드와 정한다.
  badges: ['최초 발견자', '걸음왕'],
};

export const mockMyStats = {
  leftCount: 12,
  openedCount: 27,
  likedCount: 9,
};

/** 좋아요 내역·연 자리 기록 목록의 한 줄 */
export type MySpotItem = {
  spotId: string;
  title: string;
  hashtags: string[];
  photo: PhotoSource;
};

export const mockLikedSpots: MySpotItem[] = [
  { spotId: '2', title: '오페라하우스', hashtags: ['#말없이챙겨준', '#국밥집', '#단골'], photo: samplePhotos.operaHouse },
  { spotId: '3', title: '아침 창문', hashtags: ['#창밖풍경', '#아침'], photo: samplePhotos.morningWindow },
  { spotId: '6', title: '비둘기', hashtags: ['#동물친구', '#퉁퉁'], photo: samplePhotos.pigeon },
];

export const mockLikedAreas: MapArea[] = [
  { id: 'l1', name: 'E동 뒤 골목', count: 3, hashtags: ['#말없이챙겨준', '#국밥집', '#단골'], position: { top: '20%', left: '14%' } },
  { id: 'l2', name: '학교 앞', count: 3, hashtags: ['#덤', '#떡집', '#붕어빵'], position: { top: '62%', left: '30%' } },
  { id: 'l3', name: '러브로드', count: 2, hashtags: ['#공강벤치', '#노을'], position: { top: '30%', left: '72%' } },
  { id: 'l4', name: '민속촌 근처', count: 1, hashtags: ['#밥뭇나'], position: { top: '70%', left: '76%' } },
];

export const mockOpenedHistory: { dateLabel: string; items: MySpotItem[] }[] = [
  {
    dateLabel: '10월 28일 (토)',
    items: [
      { spotId: '2', title: '오페라하우스', hashtags: ['#말없이챙겨준', '#국밥집'], photo: samplePhotos.operaHouse },
      { spotId: '3', title: '아침 창문', hashtags: ['#창밖풍경', '#아침'], photo: samplePhotos.morningWindow },
    ],
  },
  {
    dateLabel: '10월 27일 (금)',
    items: [{ spotId: '6', title: '비둘기', hashtags: ['#동물친구', '#퉁퉁'], photo: samplePhotos.pigeon }],
  },
];
