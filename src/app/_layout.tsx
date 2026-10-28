import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { colors } from '@/constants/colors';
import { fontFiles } from '@/constants/typography';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(fontFiles);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background01 } }}>
      {/* 남기기와 열림 순간은 탭 바 없이 전체 화면, 신고는 아래에서 올라오는 모달 */}
      <Stack.Screen name="upload" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="opening/[id]" options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
      <Stack.Screen name="report/[id]" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
