import { Redirect } from 'expo-router';

// 로그인 기능이 생기면 로그인 여부에 따라 /intro 또는 /map 으로 보낸다
export default function Index() {
  return <Redirect href="/intro" />;
}
