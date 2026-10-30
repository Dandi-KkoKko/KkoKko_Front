import type { Coordinate } from '@/features/map/types/home-map-marker';

/** 카카오 개발자 콘솔의 JavaScript 키. `.env`에 넣고, 없으면 지도 대신 회색 지도를 보여준다. */
export const kakaoMapJsKey = process.env.EXPO_PUBLIC_KAKAO_MAP_JS_KEY ?? '';

/** 카카오 개발자 콘솔의 REST API 키. 장소 검색(카카오 로컬 API)에 쓴다. JavaScript 키와 다르다. */
export const kakaoRestApiKey = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY ?? '';

/** SK open API의 TMAP 앱 키. 걷는 길을 따라 경로를 그린다. 없으면 직선 경로로 대신한다. */
export const tmapAppKey = process.env.EXPO_PUBLIC_TMAP_APP_KEY ?? '';

/**
 * WebView 안 지도 페이지의 주소.
 * 카카오는 등록된 도메인에서만 지도를 열어 주므로, 카카오 개발자 콘솔 > 플랫폼 > Web에 이 값을 등록해야 한다.
 */
export const kakaoMapBaseUrl = 'http://localhost';

/** 내 위치를 아직 모를 때 보여주는 곳 (영남대학교) */
export const defaultMapCenter: Coordinate = { latitude: 35.8306, longitude: 128.7544 };

/** 카카오맵 확대 단계. 작을수록 자세히 보이고, 3은 골목과 건물이 보이는 정도다. */
export const defaultMapLevel = 3;

/**
 * 이 거리 안에 들어온 사진은 흐리지 않게 열린다.
 * 기본 확대 단계에서 Figma 탐색 모드의 원 크기와 비슷해지는 값이고, 실제 값은 캠퍼스를 걸어보며 정한다.
 */
export const openRadiusMeters = 100;

/** 고른 장소에서 이 거리 안의 기록을 '이 근처 남겨진 기록'으로 센다. 걸어서 5분 안쪽이다. */
export const nearbyRecordRadiusMeters = 300;

/** 경로 추천에서 '가는 길'로 보는 폭(m). 내 위치→목적지 직선에서 이만큼 안쪽의 기록만 들른다. */
export const routeCorridorMeters = 250;

/** 경로에 들를 자리 수. TMAP 경유지는 5곳까지라 그 안에서, 걷기 부담이 적게 3곳으로 둔다. */
export const maxRouteStops = 3;

/** 직선 경로일 때 걸리는 시간을 셀 걸음 속도(m/s). 보통 걸음 약 시속 4km. */
export const walkingSpeedMetersPerSecond = 1.1;
