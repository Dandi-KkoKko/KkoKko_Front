import type { Coordinate } from '@/features/map/types/home-map-marker';
import {
  kakaoMapCss,
  openRadiusCircleStyle,
  pretendardCssUrl,
} from '@/features/map/kakao-map/kakao-map-styles';

type KakaoMapHtmlOptions = {
  appKey: string;
  center: Coordinate;
  level: number;
};

/**
 * WebView에 띄울 카카오맵 페이지.
 * 아래 <script>는 WebView 안 브라우저에서 돌아서 TypeScript 검사를 받지 못한다.
 * 그래서 메시지 처리만 하고, 무엇을 그릴지는 모두 앱(kakao-map-view.tsx)이 정해서 보낸다.
 */
export function buildKakaoMapHtml({ appKey, center, level }: KakaoMapHtmlOptions) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
  <link rel="stylesheet" href="${pretendardCssUrl}" />
  <style>${kakaoMapCss}</style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = null;
    var markerOverlays = [];
    var myLocationOverlay = null;
    var openRadiusCircle = null;

    function post(event) {
      window.ReactNativeWebView.postMessage(JSON.stringify(event));
    }

    function toLatLng(coordinate) {
      return new kakao.maps.LatLng(coordinate.latitude, coordinate.longitude);
    }

    // 해시태그는 사용자가 쓴 글이라 innerHTML 대신 textContent로 넣는다.
    function createElement(tag, className, text) {
      var element = document.createElement(tag);
      element.className = className;
      if (text) element.textContent = text;
      return element;
    }

    function createMarkerElement(marker) {
      var root = createElement('button', 'marker');
      if (marker.kind === 'cluster') {
        var stack = createElement('div', 'stack');
        ['stack-back', 'stack-middle', 'stack-front'].forEach(function (position) {
          stack.appendChild(createElement('div', 'photo photo-locked ' + position));
        });
        root.appendChild(stack);
        root.appendChild(createElement('span', 'cluster-label', marker.label));
        root.appendChild(createElement('span', 'cluster-more', '+' + marker.moreCount + '개 더'));
      } else {
        root.appendChild(createElement('div', 'photo ' + (marker.isOpen ? 'photo-open' : 'photo-locked')));
        root.appendChild(createElement('span', 'chip ' + (marker.isOpen ? 'chip-dark' : 'chip-light'), marker.hashtags[0]));
      }
      root.addEventListener('click', function () {
        post({ type: 'markerPress', kind: marker.kind, markerId: marker.id });
      });
      return root;
    }

    var handlers = {
      setMarkers: function (command) {
        markerOverlays.forEach(function (overlay) { overlay.setMap(null); });
        markerOverlays = command.markers.map(function (marker) {
          return new kakao.maps.CustomOverlay({
            map: map,
            position: toLatLng(marker.coordinate),
            content: createMarkerElement(marker),
            clickable: true,
            zIndex: 1,
          });
        });
      },
      setMyLocation: function (command) {
        var position = toLatLng(command.coordinate);
        if (myLocationOverlay) {
          myLocationOverlay.setPosition(position);
          return;
        }
        var dot = createElement('div', 'my-location');
        dot.appendChild(createElement('div', 'my-location-dot'));
        // 내 위치가 사진 마커를 가리면 누를 수 없어서 마커(zIndex 1)보다 아래에 둔다.
        myLocationOverlay = new kakao.maps.CustomOverlay({ map: map, position: position, content: dot, zIndex: 0 });
      },
      setOpenRadius: function (command) {
        if (openRadiusCircle) openRadiusCircle.setMap(null);
        openRadiusCircle = null;
        if (!command.circle) return;
        var options = ${JSON.stringify(openRadiusCircleStyle)};
        options.map = map;
        options.center = toLatLng(command.circle.center);
        options.radius = command.circle.radiusMeters;
        // 원이 마커를 가리지 않도록 내 위치(0)와 마커(1)보다 아래에 둔다.
        options.zIndex = -1;
        openRadiusCircle = new kakao.maps.Circle(options);
      },
      moveTo: function (command) {
        map.panTo(toLatLng(command.coordinate));
      },
    };

    window.receiveCommand = function (command) {
      if (map && handlers[command.type]) handlers[command.type](command);
    };

    function startMap() {
      kakao.maps.load(function () {
        map = new kakao.maps.Map(document.getElementById('map'), {
          center: toLatLng(${JSON.stringify(center)}),
          level: ${level},
        });
        post({ type: 'ready' });
      });
    }

    function failMap() {
      post({ type: 'error', message: '카카오맵을 불러오지 못했어요. 키와 등록한 도메인을 확인해 주세요.' });
    }
  </script>
  <script
    src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appKey)}&autoload=false"
    onload="startMap()"
    onerror="failMap()"></script>
</body>
</html>`;
}
