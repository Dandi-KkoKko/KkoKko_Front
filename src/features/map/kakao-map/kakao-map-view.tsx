import { useEffect, useMemo, useRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import { Badge } from '@/components/badge';
import { MapPlaceholder } from '@/components/map-placeholder';
import { buildKakaoMapHtml } from '@/features/map/kakao-map/build-kakao-map-html';
import {
  parseMapEvent,
  toInjectedScript,
  type MapCommand,
  type MapPadding,
} from '@/features/map/kakao-map/kakao-map-bridge';
import {
  defaultMapCenter,
  defaultMapLevel,
  kakaoMapBaseUrl,
  kakaoMapJsKey,
} from '@/features/map/constants/map-config';
import type { Coordinate, MapMarker } from '@/features/map/types/home-map-marker';

type KakaoMapViewProps<Marker extends MapMarker> = {
  markers: Marker[];
  /** 권한이 없거나 아직 위치를 못 받았으면 null */
  myLocation: Coordinate | null;
  /** 내 위치 둘레에 그릴 열림 반경(m). null이면 그리지 않는다. */
  openRadiusMeters?: number | null;
  /**
   * 이 좌표들이 모두 보이게 지도를 맞춘다 (검색결과 등). 주면 내 위치로 옮기지 않는다.
   * 바뀔 때마다 다시 맞추므로, 화면에서 useMemo로 넘긴다.
   */
  focus?: { coordinates: Coordinate[]; padding: MapPadding };
  onMarkerPress: (marker: Marker) => void;
};

type MapStatus = { state: 'loading' | 'ready' } | { state: 'error'; message: string };

const missingKeyStatus: MapStatus = {
  state: 'error',
  message: '카카오맵 키가 없어서 회색 지도를 보여줘요',
};

// react-native-webview는 웹을 지원하지 않는다. 웹으로 화면을 확인하는 팀원도 나머지 화면은 볼 수 있게 회색 지도로 둔다.
const webStatus: MapStatus = {
  state: 'error',
  message: '웹에서는 지도가 보이지 않아요. 폰(Expo Go)에서 확인해 주세요',
};

function getInitialStatus(): MapStatus {
  if (Platform.OS === 'web') return webStatus;
  return kakaoMapJsKey ? { state: 'loading' } : missingKeyStatus;
}

/**
 * react-native-webview 14의 타입은 기본값이 `WebView<undefined>`라 props가 never가 되어 버린다.
 * 그래서 추가 props가 없다는 뜻으로 object를 직접 넘긴다.
 */
type MapWebView = WebView<object>;

function sendCommand(webView: MapWebView | null, command: MapCommand) {
  webView?.injectJavaScript(toInjectedScript(command));
}

/**
 * 카카오맵 JavaScript SDK를 WebView에 띄운 지도. Expo Go에서도 열리도록 네이티브 SDK 대신 이 방식을 골랐다.
 * 키가 없거나 지도를 못 불러오면 회색 지도로 대신해서, 키가 없는 팀원도 나머지 화면을 볼 수 있게 한다.
 */
export function KakaoMapView<Marker extends MapMarker>({
  markers,
  myLocation,
  openRadiusMeters = null,
  focus,
  onMarkerPress,
}: KakaoMapViewProps<Marker>) {
  const webViewRef = useRef<MapWebView>(null);
  const hasCenteredRef = useRef(false);
  const [status, setStatus] = useState<MapStatus>(getInitialStatus);
  const isReady = status.state === 'ready';

  const html = useMemo(
    () => buildKakaoMapHtml({ appKey: kakaoMapJsKey, center: defaultMapCenter, level: defaultMapLevel }),
    [],
  );

  useEffect(() => {
    if (isReady) sendCommand(webViewRef.current, { type: 'setMarkers', markers });
  }, [isReady, markers]);

  useEffect(() => {
    if (!isReady || !myLocation) return;
    sendCommand(webViewRef.current, { type: 'setMyLocation', coordinate: myLocation });
    // 처음 위치를 받았을 때만 지도를 옮긴다. 걸을 때마다 옮기면 사용자가 지도를 둘러볼 수 없다.
    if (!hasCenteredRef.current && !focus) {
      hasCenteredRef.current = true;
      sendCommand(webViewRef.current, { type: 'moveTo', coordinate: myLocation });
    }
  }, [isReady, myLocation, focus]);

  useEffect(() => {
    if (isReady && focus) sendCommand(webViewRef.current, { type: 'fitBounds', ...focus });
  }, [isReady, focus]);

  useEffect(() => {
    if (!isReady) return;
    const circle = myLocation && openRadiusMeters ? { center: myLocation, radiusMeters: openRadiusMeters } : null;
    sendCommand(webViewRef.current, { type: 'setOpenRadius', circle });
  }, [isReady, myLocation, openRadiusMeters]);

  const handleMessage = ({ nativeEvent }: WebViewMessageEvent) => {
    const event = parseMapEvent(nativeEvent.data);
    if (event?.type === 'ready') setStatus({ state: 'ready' });
    if (event?.type === 'error') setStatus({ state: 'error', message: event.message });
    if (event?.type === 'markerPress') {
      const marker = markers.find(({ kind, id }) => kind === event.kind && id === event.markerId);
      if (marker) onMarkerPress(marker);
    }
  };

  if (status.state === 'error') {
    return (
      <MapPlaceholder>
        <Badge label={status.message} tone="dark" style={styles.notice} />
      </MapPlaceholder>
    );
  }

  return (
    <WebView<object>
      ref={webViewRef}
      source={{ html, baseUrl: kakaoMapBaseUrl }}
      originWhitelist={['*']}
      onMessage={handleMessage}
      style={StyleSheet.absoluteFill}
    />
  );
}

const styles = StyleSheet.create({
  notice: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
  },
});
