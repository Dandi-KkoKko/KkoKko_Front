import { createContext, useContext, useState, type ReactNode } from 'react';

/** 남기기 1~3단계가 같이 쓰는 임시 기록. 마지막 단계에서 서버로 보낸 뒤 버린다. */
export type UploadDraft = {
  /** 찍은 사진. expo-camera를 붙이면 사진 파일 주소가 들어간다. */
  photoUri?: string;
  /** 사진을 찍은 곳 이름 (정확한 좌표가 아니라 반경으로 저장한다) */
  placeLabel: string;
  title: string;
  /** 한 줄 코멘트 */
  oneLine: string;
  hashtags: string[];
};

type UploadDraftContextValue = {
  draft: UploadDraft;
  updateDraft: (patch: Partial<UploadDraft>) => void;
};

const UploadDraftContext = createContext<UploadDraftContextValue | null>(null);

// 위치 기능을 붙이기 전까지 쓰는 촬영 장소
const mockPlaceLabel = '영남대학교 정문';

/** 남기기 화면 묶음(app/upload/_layout.tsx)을 감싸서, 세 화면이 같은 임시 기록을 보게 한다 */
export function UploadDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<UploadDraft>({
    placeLabel: mockPlaceLabel,
    title: '',
    oneLine: '',
    hashtags: [],
  });

  const updateDraft = (patch: Partial<UploadDraft>) => setDraft((prev) => ({ ...prev, ...patch }));

  return <UploadDraftContext.Provider value={{ draft, updateDraft }}>{children}</UploadDraftContext.Provider>;
}

export function useUploadDraft() {
  const value = useContext(UploadDraftContext);
  if (!value) {
    throw new Error('useUploadDraft는 UploadDraftProvider 안에서만 쓸 수 있어요');
  }
  return value;
}
