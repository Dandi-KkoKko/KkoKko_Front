import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import { Badge } from '@/components/badge';
import { MapPlaceholder } from '@/components/map-placeholder';
import { buildKakaoMapHtml } from '@/features/map/kakao-map/build-kakao-map-html';
import {
  parseMapEvent,
  toInjectedScript,
  type MapCommand,
} from '@/features/map/kakao-map/kakao-map-bridge';
import {
  defaultMapCenter,
  defaultMapLevel,
  kakaoMapBaseUrl,
  kakaoMapJsKey,
} from '@/features/map/constants/map-config';
import type { Coordinate, HomeMapMarker } from '@/features/map/types/home-map-marker';

type KakaoMapViewProps = {
  markers: HomeMapMarker[];
  /** 권한이 없거나 아직 위치를 못 받았으면 null */
  myLocation: Coordinate | null;
  /** 내 위치 둘레에 그릴 열림 반경(m). null이면 그리지 않는다. */
  openRadiusMeters: number | null;
  onMarkerPress: (marker: HomeMapMarker) => void;
};

type MapStatus = { state: 'loading' | 'ready' } | { state: 'error'; message: string };

const missingKeyStatus: MapStatus = {
  state: 'error',
  message: '카카오맵 키가 없어서 회색 지도를 보여줘요',
};

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
export function KakaoMapView({ markers, myLocation, openRadiusMeters, onMarkerPress }: KakaoMapViewProps) {
  const webViewRef = useRef<MapWebView>(null);
  const hasCenteredRef = useRef(false);
  const [status, setStatus] = useState<MapStatus>(kakaoMapJsKey ? { state: 'loading' } : missingKeyStatus);
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
    if (!hasCenteredRef.current) {
      hasCenteredRef.current = true;
      sendCommand(webViewRef.current, { type: 'moveTo', coordinate: myLocation });
    }
  }, [isReady, myLocation]);

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
