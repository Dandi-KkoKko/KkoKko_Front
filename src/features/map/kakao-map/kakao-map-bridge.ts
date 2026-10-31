import type { Coordinate, MapMarker } from '@/features/map/types/home-map-marker';

/**
 * 앱과 WebView 안 지도 페이지가 주고받는 메시지.
 * 두 쪽이 서로 다른 JS 환경이라 문자열(JSON)로만 대화할 수 있어서, 메시지 모양을 여기 한곳에 정해 둔다.
 */

/** 앱 → 지도 페이지 */
export type MapCommand =
  | { type: 'setMarkers'; markers: MapMarker[] }
  | { type: 'setMyLocation'; coordinate: Coordinate }
  /** 탐색 모드의 열림 반경 원. null이면 지운다. */
  | { type: 'setOpenRadius'; circle: { center: Coordinate; radiusMeters: number } | null }
  | { type: 'moveTo'; coordinate: Coordinate }
  /** 산책 경로 선. path는 남은 길(주황), walkedPath는 이미 걸어온 길(회색). null이면 지운다. */
  | { type: 'setRoute'; path: Coordinate[] | null; walkedPath: Coordinate[] | null }
  /** 좌표가 모두 보이게 지도를 맞춘다. padding은 지도를 가리는 검색창·목록 높이(px)다. */
  | { type: 'fitBounds'; coordinates: Coordinate[]; padding: MapPadding };

export type MapPadding = { top: number; right: number; bottom: number; left: number };

/** 지도 페이지 → 앱 */
export type MapEvent =
  | { type: 'ready' }
  | { type: 'error'; message: string }
  | { type: 'markerPress'; kind: MapMarker['kind']; markerId: string };

/** 지도 페이지의 `window.receiveCommand`를 부르는 코드. 끝의 `true`는 iOS에서 경고가 뜨지 않게 하려고 붙인다. */
export function toInjectedScript(command: MapCommand) {
  return `window.receiveCommand(${JSON.stringify(command)}); true;`;
}

export function parseMapEvent(data: string): MapEvent | null {
  try {
    return JSON.parse(data) as MapEvent;
  } catch {
    return null;
  }
}
