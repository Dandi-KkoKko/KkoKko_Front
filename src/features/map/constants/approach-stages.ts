/**
 * 와이어프레임 ①-B 거리별 열림 단계. 흐린 자리에 다가갈수록 단계가 바뀐다.
 * 거리 값은 와이어프레임 예시이고, 실제 단계 경계(몇 m부터 열리는지)는 지도 담당이 현장에서 걸어보며 정한다.
 * 진짜 위치를 붙이기 전까지는 '(시연)' 버튼으로 다음 단계로 넘긴다.
 */

export const approachStages = ['far', 'approaching', 'almost'] as const;
export type ApproachStage = (typeof approachStages)[number];

export type ApproachStageInfo = {
  distanceMeters: number;
  walkMinutes: number;
  /** 사진 옆 작은 글씨 */
  caption: string;
  /** 해시태그 아래 안내 (없으면 잠긴 한 줄 막대를 보여준다) */
  message?: string;
  /** 보이는 해시태그 수. 가까워질수록 많이 보인다. */
  visibleHashtagCount: number;
  /** 진행 막대 3칸 중 지금 칸 (0: 멀리·흐림, 1: 다가가는 중, 2: 거의 열림) */
  progressIndex: number;
  /** 진행 상자 오른쪽 위 안내 */
  hint: string;
  /** 시연용 다음 단계 버튼 글자. 없으면 '걸어서 길 안내'가 다음 단계로 넘긴다. */
  demoNextLabel?: string;
};

export const approachStageInfo: Record<ApproachStage, ApproachStageInfo> = {
  far: {
    distanceMeters: 480,
    walkMinutes: 7,
    caption: '누군가 남긴 자리',
    message: '아직 멀어서 해시태그만 보여요',
    visibleHashtagCount: 2,
    progressIndex: 0,
    hint: '도보 약 7분',
  },
  approaching: {
    distanceMeters: 120,
    walkMinutes: 2,
    caption: '누군가 남긴 자리',
    message: '사진과 한 줄은 가까이 가야 열려요',
    visibleHashtagCount: 3,
    progressIndex: 1,
    hint: '도보 약 2분',
    demoNextLabel: '(시연) 더 가까이 가기',
  },
  almost: {
    distanceMeters: 25,
    walkMinutes: 1,
    caption: '윤곽이 보이기 시작했어요',
    visibleHashtagCount: 2,
    progressIndex: 2,
    hint: '점선 안에 들어오면 열려요',
    demoNextLabel: '(시연) 점선 안으로 들어가기',
  },
};

export const approachProgressLabels = ['멀리 · 흐림', '다가가는 중', '도착 · 열림'] as const;
