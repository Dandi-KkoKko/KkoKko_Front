import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';

/**
 * 이용약관·개인정보 처리방침. 회원가입 약관 화살표와 설정에서 같이 들어온다.
 * Figma에도 아직 제목만 있어서, 약관 문장이 확정되면 본문을 채운다.
 * 로그인 전(회원가입)에도 열려야 해서 마이 탭 안이 아니라 최상위 주소(/terms)에 둔다.
 */
export function TermsScreen() {
  return (
    <ScreenContainer background="gray" header={<ScreenHeader title="이용약관 · 개인정보 처리방침" />}>
      {null}
    </ScreenContainer>
  );
}
