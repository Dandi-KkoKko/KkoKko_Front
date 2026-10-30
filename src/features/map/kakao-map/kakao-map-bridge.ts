import type { Coordinate, HomeMapMarker } from '@/features/map/types/home-map-marker';

/**
 * 앱과 WebView 안 지도 페이지가 주고받는 메시지.
 * 두 쪽이 서로 다른 JS 환경이라 문자열(JSON)로만 대화할 수 있어서, 메시지 모양을 여기 한곳에 정해 둔다.
 */

/** 앱 → 지도 페이지 */
export type MapCommand =
  | { type: 'setMarkers'; markers: HomeMapMarker[] }
  | { type: 'setMyLocation'; coordinate: Coordinate }
  | { type: 'moveTo'; coordinate: Coordinate };

/** 지도 페이지 → 앱 */
export type MapEvent =
  | { type: 'ready' }
  | { type: 'error'; message: string }
  | { type: 'markerPress'; kind: HomeMapMarker['kind']; markerId: string };

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
