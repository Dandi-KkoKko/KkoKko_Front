/**
 * 와이어프레임 ①, ①-A의 지도 마커 배치를 그대로 옮긴 가짜 데이터.
 * 확대 단계(zoomLevel)마다 보이는 마커가 다르다. 넓게 볼수록 묶이고, 자세히 볼수록 풀린다.
 * 진짜 지도를 붙이면 화면 좌표 대신 위도·경도를 가진 서버 데이터로 바뀌고, 이 파일은 지운다.
 */

import type { DimensionValue } from 'react-native';

export const zoomLevels = ['overview', 'default', 'detail'] as const;
export type ZoomLevel = (typeof zoomLevels)[number];

type Position = { top: number; left: DimensionValue };

type PreviewCluster = Position & {
  id: string;
  label: string;
  moreCount: number;
  highlighted?: boolean;
};

type PreviewPhoto = Position & {
  id: string;
  hashtag?: string;
  status?: 'preview' | 'opening';
};

type PreviewMapLevel = {
  regionLabel: string;
  /** 검색창 아래 안내 (없으면 해시태그 필터를 보여준다) */
  notice?: string;
  clusters: PreviewCluster[];
  photos: PreviewPhoto[];
  emptySpot?: Position & { id: string };
  myLocation: Position & { showRadius: boolean };
};

export const previewMapLevels: Record<ZoomLevel, PreviewMapLevel> = {
  overview: {
    regionLabel: '영남대',
    notice: '가까운 사진끼리 겹쳐 보여요 · 확대하면 풀려요',
    clusters: [
      { id: '1', top: 180, left: '8%', label: '#공강벤치 · 혼자만의자리', moreCount: 7 },
      { id: '2', top: 290, left: '62%', label: '#자판기 · 과방', moreCount: 3 },
      { id: '3', top: 445, left: '26%', label: '#덤 · 국밥집', moreCount: 11, highlighted: true },
      { id: '4', top: 495, left: '68%', label: '#밥뭇나 · 백반집', moreCount: 5 },
    ],
    photos: [
      { id: '5', top: 140, left: '73%', hashtag: '#과방' },
      { id: '4', top: 330, left: '14%', hashtag: '#붕어빵', status: 'preview' },
    ],
    myLocation: { top: 620, left: '54%', showRadius: false },
  },
  default: {
    regionLabel: '영남대',
    clusters: [{ id: '1', top: 190, left: '8%', label: '#단골자리 · 공강벤치', moreCount: 11 }],
    photos: [
      { id: '2', top: 262, left: '62%', hashtag: '#계산밖의호의' },
      { id: '3', top: 385, left: '55%', status: 'opening' },
      { id: '4', top: 500, left: '8%', status: 'preview' },
    ],
    emptySpot: { id: 'empty-1', top: 152, left: '58%' },
    myLocation: { top: 470, left: '50%', showRadius: true },
  },
  detail: {
    regionLabel: 'E동 주변',
    notice: '자세히 보는 중 · 골목 자리가 먼저 떠요',
    clusters: [],
    photos: [
      { id: '6', top: 190, left: '8%', hashtag: '#공강벤치' },
      { id: '7', top: 190, left: '26%', hashtag: '#자판기' },
      { id: '5', top: 190, left: '62%', hashtag: '#과방' },
      { id: '3', top: 380, left: '30%', status: 'opening' },
      { id: '2', top: 480, left: '69%', hashtag: '#덤' },
      { id: '8', top: 560, left: '5%', hashtag: '#국밥집' },
      { id: '9', top: 615, left: '28%', hashtag: '#백반집' },
    ],
    myLocation: { top: 450, left: '49%', showRadius: true },
  },
};

export const previewFilterHashtags = ['#말없이챙겨준', '#단골자리', '#덤'];

export const previewNearestSpot = {
  spotId: '3',
  hashtags: ['#말없이챙겨준', '#국밥집'],
  distanceMeters: 120,
};

export const previewCampusSummary = {
  spotCount: 31,
};
