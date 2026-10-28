/**
 * 자리 상세·열린 자리 화면 예시 데이터. 자리 API가 나오면 서버 데이터로 바뀐다.
 * kind에 따라 자리 상세 화면의 모양이 달라진다.
 * - preview: 맛보기. 구역 대표 사진이라 흐리지 않게 보여주지만 한 줄은 잠겨 있다 (①-A)
 * - empty: 아직 아무도 남기지 않은 빈 자리 (①-A)
 * - blurred: 흐린 일반 자리. 다가갈수록 열린다 (①-B)
 */

export type PreviewSpot =
  | { kind: 'preview'; id: string; hashtags: string[]; placeName: string; distanceMeters: number; walkMinutes: number }
  | { kind: 'empty'; id: string; placeName: string; distanceMeters: number }
  | { kind: 'blurred'; id: string; hashtags: string[] };

const previewSpots: Record<string, PreviewSpot> = {
  '4': { kind: 'preview', id: '4', hashtags: ['#덤', '#붕어빵'], placeName: '정문', distanceMeters: 520, walkMinutes: 8 },
  'empty-1': { kind: 'empty', id: 'empty-1', placeName: '러브로드 벤치 근처', distanceMeters: 60 },
};

const defaultBlurredHashtags = ['#말없이챙겨준', '#국밥집', '#단골'];

export function getPreviewSpot(id: string): PreviewSpot {
  return previewSpots[id] ?? { kind: 'blurred', id, hashtags: defaultBlurredHashtags };
}

/** 열린 자리: 원본 사진과 남긴 사람의 한 줄. 남긴 사람은 드러나지 않는다. */
export type OpenedSpot = {
  id: string;
  oneLine: string;
  hashtags: string[];
  placeLabel: string;
};

export function getPreviewOpenedSpot(id: string): OpenedSpot {
  return {
    id,
    oneLine: '사장님이 말없이 고기 더 얹어주는 국밥집.',
    hashtags: defaultBlurredHashtags,
    placeLabel: 'E동 뒤 골목',
  };
}
