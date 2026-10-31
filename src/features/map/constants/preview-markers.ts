/**
 * Figma '지도 홈 화면 UI'의 마커 배치를 옮긴 가짜 데이터.
 * 서버 데이터가 오기 전에는 어디서 앱을 켜도 마커가 보이도록, 고정 좌표 대신 기준점에서 떨어진 거리(m)로 둔다.
 * 사진이 열렸는지(isOpen)는 내 위치와의 거리로 정하므로 여기서는 모두 닫힌 상태로 둔다.
 * 4번부터는 Figma 검색·경로 예시(#정문앞, #공강벤치, #덤 등)다. 캠퍼스 가운데에서 보면 실제 영남대 정문(북쪽 약 550m) 쪽에 있도록,
 * 홈 화면 마커를 가리지 않게 정문 근처와 정문 가는 길에 둔다.
 * 서버 데이터가 오면 이 파일은 지운다.
 */

import { getPreviewClusterRecords } from '@/features/map/constants/preview-cluster';
import type { Coordinate, HomeMapMarker } from '@/features/map/types/home-map-marker';
import { offsetCoordinate } from '@/features/map/utils/local-plane';

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
    { kind: 'photo', id: '2', coordinate: at(130, 90), hashtags: ['#계산밖의 호의'], isOpen: false, placeName: '천마아트센터', comment: '말없이 한 개 더 얹어주신 붕어빵' },
    { kind: 'photo', id: '3', coordinate: at(35, 30), hashtags: ['#동물친구', '#일상속재발견'], isOpen: false, placeName: '전기관 앞 벤치', comment: '벤치 밑 고양이가 오늘도 기다리고 있었다' },
    { kind: 'photo', id: '4', coordinate: at(520, -110), hashtags: ['#정문앞', '#붕어빵'], isOpen: false, placeName: '영남대학교 정문', comment: '정문 앞 붕어빵 아저씨의 덤' },
    { kind: 'photo', id: '5', coordinate: at(560, -70), hashtags: ['#정문풍경'], isOpen: false, placeName: '정문 앞 버스 정류장', comment: '버스를 기다리다 본 노을이 예뻤다' },
    { kind: 'photo', id: '6', coordinate: at(600, -120), hashtags: ['#정문'], isOpen: false, placeName: '정문 사거리', comment: '사람들의 행복한 표정을 보며' },
    { kind: 'photo', id: '7', coordinate: at(640, -90), hashtags: ['#정문앞', '#츤데레'], isOpen: false, placeName: '정문 앞 떡집', comment: '떡집 사장님이 툭 건넨 한 마디' },
    { kind: 'photo', id: '8', coordinate: at(450, 300), hashtags: ['#츤데레', '#계산밖의 호의'], isOpen: false, placeName: '중앙도서관 매점', comment: '시험 기간 매점 이모의 응원' },
    // Figma 경로 추천 예시(① #공강벤치, ② #덤 #떡집)처럼 가는 길에 들를 자리
    { kind: 'photo', id: '9', coordinate: at(200, -30), hashtags: ['#공강벤치'], isOpen: false, placeName: '인문관 앞 벤치', comment: '공강마다 앉는 그 벤치, 오늘도 비어 있었다' },
    { kind: 'photo', id: '10', coordinate: at(380, -60), hashtags: ['#덤', '#떡집'], isOpen: false, placeName: '대학로 떡집', comment: '덤으로 받은 꿀떡 두 개' },
  ];
}
