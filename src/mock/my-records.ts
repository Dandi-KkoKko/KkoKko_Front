import type { MapArea } from '@/types/map-area';

/** 백엔드 '내 기록' API가 나오기 전 쓰는 가짜 데이터. 와이어프레임 ② 기록 탭 예시 그대로. */

export type MyRecord = {
  id: string;
  oneLine: string;
  hashtags: string[];
  placeLabel: string;
  dateLabel: string;
  /** 업로드 직후 2~3시간 동안은 아직 다른 사람 지도에 안 뜬다 */
  isPending?: boolean;
  /** 누군가 좋아요를 눌렀는지 (몇 명인지는 보여주지 않는다) */
  wasVisited?: boolean;
};

export const mockMyRecords: MyRecord[] = [
  {
    id: 'r1',
    oneLine: '공강마다 앉는 그 벤치, 오늘도 비어 있었다.',
    hashtags: ['#공강벤치', '#단골자리'],
    placeLabel: '러브로드',
    dateLabel: '오늘 14:20',
    isPending: true,
  },
  {
    id: 'r2',
    oneLine: '이모가 떡볶이 국물 더 부어줌. 말은 없었다.',
    hashtags: ['#덤', '#학교앞분식'],
    placeLabel: '정문 앞',
    dateLabel: '10월 22일',
    wasVisited: true,
  },
  {
    id: 'r3',
    oneLine: '경비 아저씨가 우산 빌려주심. 돌려드리러 감.',
    hashtags: ['#말없이챙겨준'],
    placeLabel: '중앙도서관',
    dateLabel: '10월 18일',
  },
];

export const mockMyRecordSummary = {
  totalCount: 12,
  thisWeekCount: 3,
};

/** 내 기록 지도: 구역별로 묶인 내 기록 */
export const mockMyRecordAreas: MapArea[] = [
  { id: 'a1', name: '정문 앞', count: 5, hashtags: ['#덤', '#학교앞분식', '#붕어빵'], position: { top: '18%', left: '10%' } },
  { id: 'a2', name: '러브로드', count: 3, hashtags: ['#공강벤치', '#단골자리', '#노을'], position: { top: '28%', left: '76%' } },
  { id: 'a3', name: '중앙도서관', count: 2, hashtags: ['#말없이챙겨준', '#혼자만의자리'], position: { top: '64%', left: '45%' } },
  { id: 'a4', name: 'E동', count: 2, hashtags: ['#과방', '#자판기'], position: { top: '72%', left: '77%' } },
];
