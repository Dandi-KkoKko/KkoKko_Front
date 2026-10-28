/** 온보딩 설문 선택지. 와이어프레임 ⓪ 설문 1/3~3/3 문구 그대로. 첫 추천의 근거가 된다. */

export type RelationOption = {
  id: 'local' | 'moved' | 'visiting';
  title: string;
  description: string;
};

export const relationOptions: RelationOption[] = [
  { id: 'local', title: '원래 여기 살아요', description: '대구·경북 토박이예요. 익숙한 곳을 새로 보고 싶어요' },
  { id: 'moved', title: '대구·경북으로 왔어요', description: '학교나 일 때문에 와서 지내고 있어요' },
  { id: 'visiting', title: '잠깐 머무는 중이에요', description: '여행이나 짧은 일정으로 왔어요' },
];

export type PlaceOption = {
  hashtag: string;
  description: string;
};

export const placeOptions: PlaceOption[] = [
  { hashtag: '#말없이챙겨준', description: '무뚝뚝한 배려' },
  { hashtag: '#덤', description: '계산 밖의 호의' },
  { hashtag: '#밥뭇나', description: '걱정 섞인 안부' },
  { hashtag: '#단골자리', description: '매일 가는 그곳' },
  { hashtag: '#오래된가게', description: '시간이 쌓인 곳' },
  { hashtag: '#골목', description: '큰길 말고 뒷길' },
  { hashtag: '#공강벤치', description: '혼자 쉬는 자리' },
  { hashtag: '#학교앞분식', description: '친구 데려가는 곳' },
  { hashtag: '#노을', description: '해 질 녘 풍경' },
  { hashtag: '#혼자만의자리', description: '조용히 머무는 곳' },
];

/** 2/3 단계에서 최소로 골라야 하는 해시태그 수 */
export const minPlaceCount = 3;

export const walkTimeOptions = ['등하굣길', '공강 시간', '저녁 산책', '러닝할 때', '주말 나들이'] as const;
export type WalkTime = (typeof walkTimeOptions)[number];

export const walkDurationOptions = ['10분', '20분', '30분 이상'] as const;
export type WalkDuration = (typeof walkDurationOptions)[number];

export type SurveyAnswers = {
  relation?: RelationOption['id'];
  places: string[];
  walkTimes: WalkTime[];
  walkDuration?: WalkDuration;
};
