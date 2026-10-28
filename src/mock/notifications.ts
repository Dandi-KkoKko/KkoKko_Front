/** 백엔드 알림 API가 나오기 전 쓰는 가짜 알림. 와이어프레임 ③ 다녀갔어요 알림 예시 그대로. */

export type AppNotification = {
  id: string;
  kind: 'visited' | 'representative';
  title: string;
  detail: string;
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
        detail: '“이모가 떡볶이 국물 더 부어줌.” · 2시간 전',
        isUnread: true,
      },
      {
        id: 'n2',
        kind: 'representative',
        title: '이 순간이 구역 대표 사진이 되었어요',
        detail: '정문 앞 구역 · 남긴 사람은 공개되지 않아요',
        isUnread: true,
      },
    ],
  },
  {
    label: '이번 주',
    items: [
      {
        id: 'n3',
        kind: 'visited',
        title: '누군가 당신의 순간에 다녀갔어요',
        detail: '“경비 아저씨가 우산 빌려주심.” · 10월 20일',
        isUnread: false,
      },
    ],
  },
];
