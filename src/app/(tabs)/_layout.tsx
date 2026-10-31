import { Tabs } from 'expo-router';

import { AppTabBar } from '@/components/app-tab-bar';

/** 아래 탭 3개: 지도 / 기록 / 마이. 각 탭 안은 Stack이고, 마이 탭은 안쪽 화면에서 탭 바를 숨긴다 (AppTabBar). */
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <AppTabBar {...props} />}>
      <Tabs.Screen name="map" options={{ title: '지도' }} />
      <Tabs.Screen name="record" options={{ title: '기록' }} />
      <Tabs.Screen name="my" options={{ title: '마이' }} />
    </Tabs>
  );
}
