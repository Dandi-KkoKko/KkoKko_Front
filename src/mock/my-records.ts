/** 백엔드 '내 기록' API가 나오기 전 쓰는 가짜 데이터. GUI ② 기록 탭 예시 그대로. */

import { samplePhotos } from '@/mock/sample-photos';
import type { MapArea } from '@/types/map-area';
import type { PhotoSource } from '@/types/photo-source';

export type MyRecord = {
  id: string;
  title: string;
  /** 한 줄 코멘트 */
  comment: string;
  hashtags: string[];
  dateLabel: string;
  /** 내 기록에 닿은 좋아요 수. 나만 본다. */
  likeCount: number;
  photo: PhotoSource;
};

export const mockMyRecords: MyRecord[] = [
  {
    id: 'r1',
    title: '하버브릿지',
    comment: '사람들의 행복한 표정을 보며',
    hashtags: ['#연인', '#포옹', '#온정'],
    dateLabel: '2026.08.28',
    likeCount: 6,
    photo: samplePhotos.harbourBridge,
  },
  {
    id: 'r2',
    title: '오페라하우스',
    comment: '노을 질 때 다 같이 사진 찍어주던 사람들',
    hashtags: ['#말없이챙겨준', '#노을'],
    dateLabel: '2026.08.22',
    likeCount: 4,
    photo: samplePhotos.operaHouse,
  },
  {
    id: 'r3',
    title: '아침 창문',
    comment: '아름다운 풍경',
    hashtags: ['#창밖풍경', '#아침'],
    dateLabel: '2026.08.13',
    likeCount: 2,
    photo: samplePhotos.morningWindow,
  },
  {
    id: 'r4',
    title: '비둘기',
    comment: '뚱뚱한 비둘기 앉아서 쉬는중',
    hashtags: ['#동물친구', '#퉁퉁'],
    dateLabel: '2026.08.02',
    likeCount: 6,
    photo: samplePhotos.pigeon,
  },
];

export const mockMyRecordSummary = {
  totalCount: 12,
};

/** 내 기록 지도: 구역별로 묶인 내 기록 */
export const mockMyRecordAreas: MapArea[] = [
  { id: 'a1', name: '정문 앞', count: 5, hashtags: ['#덤', '#학교앞분식', '#붕어빵'], position: { top: '18%', left: '10%' } },
  { id: 'a2', name: '러브로드', count: 3, hashtags: ['#공강벤치', '#단골자리', '#노을'], position: { top: '28%', left: '76%' } },
  { id: 'a3', name: '중앙도서관', count: 2, hashtags: ['#말없이챙겨준', '#혼자만의자리'], position: { top: '64%', left: '45%' } },
  { id: 'a4', name: 'E동', count: 2, hashtags: ['#과방', '#자판기'], position: { top: '72%', left: '77%' } },
];
