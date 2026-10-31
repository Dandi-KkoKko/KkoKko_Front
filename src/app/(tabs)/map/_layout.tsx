import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Figma처럼 검색 창 아래로 지도 홈이 비쳐 보이도록 투명 모달로 띄운다. */}
      <Stack.Screen name="search" options={{ presentation: 'transparentModal', animation: 'fade' }} />
    </Stack>
  );
}
