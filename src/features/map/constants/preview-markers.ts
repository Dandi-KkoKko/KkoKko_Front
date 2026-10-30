/**
 * Figma '지도 홈 화면 UI'의 마커 배치를 옮긴 가짜 데이터.
 * 서버 데이터가 오기 전에는 어디서 앱을 켜도 마커가 보이도록, 고정 좌표 대신 기준점에서 떨어진 거리(m)로 둔다.
 * 사진이 열렸는지(isOpen)는 내 위치와의 거리로 정하므로 여기서는 모두 닫힌 상태로 둔다.
 * 서버 데이터가 오면 이 파일은 지운다.
 */

import type { Coordinate, HomeMapMarker } from '@/features/map/types/home-map-marker';
import { offsetCoordinate } from '@/features/map/utils/offset-coordinate';

export function getPreviewHomeMarkers(origin: Coordinate): HomeMapMarker[] {
  const at = (northMeters: number, eastMeters: number) => offsetCoordinate(origin, northMeters, eastMeters);

  return [
    { kind: 'cluster', id: '1', coordinate: at(170, -110), label: '#단골자리 · 공강벤치', moreCount: 11 },
    { kind: 'photo', id: '2', coordinate: at(130, 90), hashtags: ['#계산밖의 호의'], isOpen: false },
    { kind: 'photo', id: '3', coordinate: at(35, 30), hashtags: ['#동물친구', '#일상속재발견'], isOpen: false },
  ];
}
