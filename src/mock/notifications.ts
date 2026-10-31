/** 백엔드 알림 API가 나오기 전 쓰는 가짜 알림. GUI ③ 알림 예시 그대로. */

import { samplePhotos } from '@/mock/sample-photos';
import type { PhotoSource } from '@/types/photo-source';

export type AppNotification = {
  id: string;
  kind: 'visited' | 'representative';
  title: string;
  /** 내가 남긴 사진의 한 줄 코멘트 */
  detail: string;
  photo: PhotoSource;
  isUnread: boolean;
};

export const mockNotificationGroups: { label: string; items: AppNotification[] }[] = [
  {
    label: '오늘',
    items: [
      {
        id: 'n1',
        kind: 'visited',
        title: '누군가 당신의 순간에 다녀갔어요',
        detail: '이모가 떡볶이 국물 더 부어줌.',
        photo: samplePhotos.operaHouse,
        isUnread: true,
      },
      {
        id: 'n2',
        kind: 'representative',
        title: '이 순간이 구역 대표 사진이 되었어요',
        detail: '아침마다 창문 열어주시는 경비 아저씨.',
        photo: samplePhotos.morningWindow,
        isUnread: false,
      },
    ],
  },
  {
    label: '이번주',
    items: [
      {
        id: 'n3',
        kind: 'visited',
        title: '누군가 당신의 순간에 다녀갔어요',
        detail: '경비 아저씨가 우산 빌려주심.',
        photo: samplePhotos.operaHouse,
        isUnread: true,
      },
    ],
  },
];
