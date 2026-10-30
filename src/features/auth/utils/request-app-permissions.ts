import { Camera } from 'expo-camera';
import * as Location from 'expo-location';

/**
 * 온보딩에서 위치 → 카메라 권한 창을 차례로 띄운다.
 * 거절해도 둘러보기는 할 수 있게 결과와 상관없이 끝까지 진행한다. 실제로 쓰는 곳(지도, 카메라)에서 다시 확인한다.
 * 푸시 알림은 하지 않고 앱 안 알림 목록만 쓰기로 해서, 휴대폰 알림 권한은 묻지 않는다.
 */
export async function requestAppPermissions() {
  try {
    await Location.requestForegroundPermissionsAsync();
    await Camera.requestCameraPermissionsAsync();
  } catch {
    // 웹 미리보기처럼 권한 창을 띄울 수 없는 환경에서도 다음 화면으로 넘어가야 해서 오류를 삼킨다
  }
}
