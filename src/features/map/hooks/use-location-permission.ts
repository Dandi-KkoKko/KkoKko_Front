import { useState } from 'react';

/**
 * 위치 권한 상태. 지금은 화면 확인용으로 항상 허용된 상태에서 시작한다.
 * 지도 담당이 expo-location의 권한 확인·요청으로 바꾼다.
 * 권한 없음 화면을 보고 싶으면 초기값을 false로 바꾸면 된다.
 */
export function useLocationPermission() {
  const [granted, setGranted] = useState(true);

  const request = () => setGranted(true);

  return { granted, request };
}
