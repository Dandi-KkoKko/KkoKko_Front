import { mockAiHashtags } from '@/mock/ai-hashtags';

// 서버가 생각하는 시간처럼 보이게 가짜 응답을 조금 늦게 준다
const mockDelayMs = 600;

/**
 * 한 줄 코멘트를 보내고 AI가 고른 해시태그 후보를 받는다.
 * 지금은 AI 서버가 없어서 정해진 후보를 돌려준다. 서버가 생기면 이 함수 안만 fetch로 바꾸면 되고, 화면은 그대로 쓴다.
 */
export async function fetchHashtagSuggestions(oneLine: string): Promise<string[]> {
  void oneLine; // 서버를 붙이면 이 한 줄을 요청에 담아 보낸다
  await new Promise((resolve) => setTimeout(resolve, mockDelayMs));
  return mockAiHashtags;
}
