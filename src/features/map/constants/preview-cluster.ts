/**
 * Figma '지도 묶음 기록 표시 UI'의 '이 묶음의 기록 12개' 예시. 묶음 API가 나오면 서버 데이터로 바뀐다.
 * 순서는 서버가 AI 추천순으로 정렬해 준다고 보고, 받은 순서 그대로 보여준다.
 */

export type ClusterRecord = {
  id: string;
  hashtags: string[];
  comment?: string;
};

/** 묶음 기록이 남겨진 곳. 묶음 마커 자리에 함께 모여 있다. */
export const previewClusterPlaceName = '천마아트센터 앞 광장';

const previewClusterRecords: Record<string, ClusterRecord[]> = {
  '1': [
    { id: '21', hashtags: ['#따스한 햇빛', '#엄마같은'], comment: '햇빛 드는 계단에서 받은 따뜻한 커피' },
    { id: '22', hashtags: ['#서비스', '#엄마같은'], comment: '밥을 더 퍼 주시던 식당 이모님' },
    { id: '23', hashtags: ['#단골자리', '#공강벤치'] },
    { id: '24', hashtags: ['#공강벤치', '#혼자만의자리'] },
    { id: '25', hashtags: ['#단골자리', '#덤', '#국밥집'] },
    { id: '26', hashtags: ['#자판기', '#과방', '#공강벤치'] },
    { id: '27', hashtags: ['#노을', '#단골자리'] },
    { id: '28', hashtags: ['#밥뭇나', '#백반집', '#덤'] },
    { id: '29', hashtags: ['#학교앞분식', '#단골자리'] },
    { id: '30', hashtags: ['#골목', '#고양이'] },
    { id: '31', hashtags: ['#말없이챙겨준', '#단골자리'] },
    { id: '32', hashtags: ['#공강벤치', '#햇살'] },
  ],
};

export function getPreviewClusterRecords(clusterId: string): ClusterRecord[] {
  return previewClusterRecords[clusterId] ?? [];
}
