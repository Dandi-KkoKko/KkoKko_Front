/**
 * 한 줄 남기기 화면 위쪽 질문. 한 줄 코멘트를 쓸 때 참고하라고 보여주고, 매번 하나를 무작위로 고른다.
 * 사진 옆 두 줄에 들어가도록 한 줄을 11자 안쪽으로 맞추고 \n으로 줄을 나눈다.
 */
export const writeQuestions = [
  '이 자리에서\n어떤 마음을 받았나요?',
  '이 자리가\n왜 자꾸 생각나나요?',
  '이 자리에서\n누가 떠올랐나요?',
  '이곳을 지나칠 때\n어떤 기분이 드나요?',
  '이 자리에\n어떤 이야기가 있나요?',
  '여기서 들은\n한마디가 있나요?',
  '이 순간을\n왜 남기고 싶었나요?',
  '여기서\n무엇이 눈에 들어왔나요?',
  '이 자리를\n한마디로 말하면요?',
  '오늘 이곳은\n어떤 모습이었나요?',
];

export function pickRandomQuestion() {
  return writeQuestions[Math.floor(Math.random() * writeQuestions.length)];
}
