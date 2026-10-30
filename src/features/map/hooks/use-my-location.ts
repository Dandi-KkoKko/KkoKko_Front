import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { AppState, Linking } from 'react-native';

import type { Coordinate } from '@/features/map/types/home-map-marker';

/**
 * 위치 권한과 지금 내 위치. 권한이 있으면 걸을 때마다 위치를 새로 받는다.
 * 가까이 가야 사진이 열리는 지도라서, 한 번만 받지 않고 계속 지켜본다.
 */
export function useMyLocation() {
  const [permission, requestPermission, getPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState<Coordinate | null>(null);
  const isGranted = permission?.granted ?? false;

  // 설정 화면에서 권한을 켜고 돌아와도 훅은 스스로 다시 확인하지 않아서, 앱이 다시 앞으로 올 때마다 확인한다.
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') getPermission();
    });
    return () => subscription.remove();
  }, [getPermission]);

  useEffect(() => {
    if (!isGranted) return;

    let subscription: Location.LocationSubscription | null = null;
    let isCancelled = false;

    Location.watchPositionAsync(
      // 5m마다 받으면 열림 반경에 들어왔는지 알기에 충분하고, 배터리를 덜 쓴다.
      { accuracy: Location.Accuracy.High, distanceInterval: 5 },
      ({ coords }) => setLocation({ latitude: coords.latitude, longitude: coords.longitude }),
    ).then((started) => {
      // 위치 구독이 시작되기 전에 화면을 떠났으면 바로 끈다.
      if (isCancelled) started.remove();
      else subscription = started;
    });

    return () => {
      isCancelled = true;
      subscription?.remove();
    };
  }, [isGranted]);

  const request = async () => {
    // 한 번 거절해서 다시 물을 수 없으면 시스템 창이 뜨지 않으므로 설정 화면으로 보낸다.
    if (permission && !permission.canAskAgain) {
      await Linking.openSettings();
      return;
    }
    await requestPermission();
  };

  return {
    /** 권한 상태를 아직 확인하는 중이면 true. 이때 권한 안내를 띄우면 잠깐 깜빡인다. */
    isChecking: permission === null,
    isGranted,
    location,
    request,
  };
}
