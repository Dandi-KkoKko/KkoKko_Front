export type IntroIllustrationName = 'blurPhotos' | 'search' | 'book';

export type IntroSlide = {
  illustration: IntroIllustrationName;
  title: string;
  description: string;
};

/** 시작 소개 3장. GUI 온보딩 문구 그대로. */
export const introSlides: IntroSlide[] = [
  {
    illustration: 'blurPhotos',
    title: '멀리선 흐릿하게,\n해시태그만 살짝',
    description: '내 주변 지도에 누군가 남긴 사진이\n흐릿하게 떠 있어요',
  },
  {
    illustration: 'search',
    title: '일상의 재해석',
    description: '다른 사람의 순간을 보며\n일상 속 따스함을 느낄 수 있어요',
  },
  {
    illustration: 'book',
    title: '내 취향 발견',
    description: 'AI가 사용자의 기호를 분석하여\n나도 몰랐던 내 취향을 알 수 있어요',
  },
];
