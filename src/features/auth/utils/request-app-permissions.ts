import { Camera } from 'expo-camera';
import * as Location from 'expo-location';

/**
 * 온보딩에서 위치 → 카메라 → 알림 권한 창을 차례로 띄운다.
 * 거절해도 둘러보기는 할 수 있게 결과와 상관없이 끝까지 진행한다. 실제로 쓰는 곳(지도, 카메라)에서 다시 확인한다.
 */
export async function requestAppPermissions() {
  try {
    await Location.requestForegroundPermissionsAsync();
    await Camera.requestCameraPermissionsAsync();
    await requestNotificationPermission();
  } catch {
    // 웹 미리보기처럼 권한 창을 띄울 수 없는 환경에서도 다음 화면으로 넘어가야 해서 오류를 삼킨다
  }
}

/**
 * 푸시 알림은 아직 없고 앱 안 알림 목록만 있지만, 나중에 푸시를 붙여도 다시 묻지 않도록 미리 허락을 받아 둔다.
 * Android Expo Go는 expo-notifications를 불러오기만 해도 '푸시 미지원' 경고를 띄워서, 앱 시작 때가 아니라 여기서만 불러온다.
 */
async function requestNotificationPermission() {
  const Notifications = await import('expo-notifications');
  await Notifications.requestPermissionsAsync();
}
