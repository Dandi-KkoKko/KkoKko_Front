import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';

type PermissionState = { granted: boolean; canAskAgain: boolean } | null;

function getLabel(permission: PermissionState, grantedLabel: string) {
  if (!permission) return '확인 중';
  if (permission.granted) return grantedLabel;
  // 한 번 거절하고 '다시 묻지 않기'까지 했으면 앱에서 다시 물을 수 없어서 휴대폰 설정으로 보내야 한다
  return permission.canAskAgain ? '허용 안 함' : '설정에서 허용';
}

/** 설정 화면에 보여줄 위치·카메라 권한의 실제 상태. 화면이 열릴 때 휴대폰에 물어본다. */
export function usePermissionLabels() {
  const [locationPermission] = Location.useForegroundPermissions();
  const [cameraPermission] = useCameraPermissions();

  return {
    location: getLabel(locationPermission, '앱 사용중'),
    camera: getLabel(cameraPermission, '허용됨'),
    isAllGranted: Boolean(locationPermission?.granted && cameraPermission?.granted),
  };
}
