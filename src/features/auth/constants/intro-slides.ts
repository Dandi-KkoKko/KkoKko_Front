export type IntroSlide = {
  title: string;
  description: string;
};

// 와이어프레임에는 첫 장만 있어서 2·3장 문구는 서비스 흐름(열기 → 남기기)에 맞춘 임시 문구다.
export const introSlides: IntroSlide[] = [
  {
    title: '멀리선 흐릿하게,\n해시태그만 살짝',
    description: '내 주변 지도에 누군가 남긴 사진이\n흐릿하게 떠 있어요',
  },
  {
    title: '가까이 걸어가면\n그 자리가 열려요',
    description: '다가갈수록 선명해지고,\n도착하면 사진과 한 줄이 보여요',
  },
  {
    title: '같은 자리에\n내 순간을 남겨요',
    description: '누가 남겼는지 모르게,\n몇 시간 뒤 다른 사람 지도에 건네져요',
  },
];
