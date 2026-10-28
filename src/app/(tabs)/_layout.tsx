import { Tabs } from 'expo-router';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

/** 아래 탭 3개: 지도 / 기록 / 마이. 각 탭 안은 Stack이라 상세 화면에서도 탭 바가 보인다. */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.textDeactivated,
        tabBarLabelStyle: typography.caption03,
        // 아이콘은 GUI 디자인이 나오면 넣는다
        tabBarIcon: () => null,
        tabBarIconStyle: { display: 'none' },
      }}>
      <Tabs.Screen name="map" options={{ title: '지도' }} />
      <Tabs.Screen name="record" options={{ title: '기록' }} />
      <Tabs.Screen name="my" options={{ title: '마이' }} />
    </Tabs>
  );
}
