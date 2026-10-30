/**
 * Figma '지도 홈 화면 UI'의 마커 배치를 옮긴 가짜 데이터.
 * 서버 데이터가 오기 전에는 어디서 앱을 켜도 마커가 보이도록, 고정 좌표 대신 기준점에서 떨어진 거리(m)로 둔다.
 * 사진이 열렸는지(isOpen)는 내 위치와의 거리로 정하므로 여기서는 모두 닫힌 상태로 둔다.
 * 4번부터는 Figma 해시태그 검색 예시(#정문앞, #정문풍경, #정문)라서, 홈 화면의 마커를 가리지 않게 500m쯤 떨어뜨려 둔다.
 * 서버 데이터가 오면 이 파일은 지운다.
 */

import { getPreviewClusterRecords } from '@/features/map/constants/preview-cluster';
import type { Coordinate, HomeMapMarker } from '@/features/map/types/home-map-marker';
import { offsetCoordinate } from '@/features/map/utils/offset-coordinate';

export function getPreviewHomeMarkers(origin: Coordinate): HomeMapMarker[] {
  const at = (northMeters: number, eastMeters: number) => offsetCoordinate(origin, northMeters, eastMeters);

  return [
    // '+N개 더'는 묶음 화면의 기록 수와 늘 같아야 해서 묶음 데이터에서 센다.
    {
      kind: 'cluster',
      id: '1',
      coordinate: at(170, -110),
      label: '#단골자리 · 공강벤치',
      moreCount: getPreviewClusterRecords('1').length - 1,
    },
    { kind: 'photo', id: '2', coordinate: at(130, 90), hashtags: ['#계산밖의 호의'], isOpen: false },
    { kind: 'photo', id: '3', coordinate: at(35, 30), hashtags: ['#동물친구', '#일상속재발견'], isOpen: false },
    { kind: 'photo', id: '4', coordinate: at(-500, 150), hashtags: ['#정문앞', '#붕어빵'], isOpen: false },
    { kind: 'photo', id: '5', coordinate: at(-540, 200), hashtags: ['#정문풍경'], isOpen: false },
    { kind: 'photo', id: '6', coordinate: at(-600, 220), hashtags: ['#정문'], isOpen: false },
    { kind: 'photo', id: '7', coordinate: at(-640, 120), hashtags: ['#정문앞', '#츤데레'], isOpen: false },
    { kind: 'photo', id: '8', coordinate: at(450, 300), hashtags: ['#츤데레', '#계산밖의 호의'], isOpen: false },
  ];
}
