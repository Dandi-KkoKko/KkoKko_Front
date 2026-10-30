# KkoKko_Front

<!-- 프로젝트 소개, 팀원, 역할은 팀에서 함께 작성 예정 -->

「가까이」 앱의 프론트엔드 레포지토리입니다.

## 작업 전에 꼭 읽어주세요

처음 받았다면 아래 5가지만 보고 시작하면 돼요. 자세한 내용은 아래 각 섹션에 있어요.

**1. 실행해보기**

```bash
npm install
npx expo start
```

QR을 폰으로 찍어 Expo Go에서 열리는지 확인해요. → [실행 방법](#실행-방법)

**2. 내 브랜치에서 작업하기**

`main`에서 바로 작업하지 않아요. 최신 `main`을 받은 뒤 기능별 브랜치를 만들어요.

```bash
git checkout main
git pull origin main
git checkout -b feature/작업이름
```

작업이 끝나면 PR을 올려서 `main`에 합쳐요. PR 올리기 전에도 `git pull origin main`으로 최신 내용을 한 번 받아요.

**3. 내 폴더에서 작업하기**

| 담당 | 주로 작업하는 폴더 |
|---|---|
| 지도 | `src/features/map` |
| 화면 | `src/features/auth`, `record`, `upload`, `my`, `notification` |

여러 기능이 같이 쓰는 파일(`components/`, `constants/`, 화면 이동 설정, `package.json`)을 고칠 때는 상대에게 먼저 한마디 해요. → [폴더 구조](#폴더-구조)

**4. 디자인 시스템 지키기**

- 색은 `colors`에서 가져다 쓰기 (`#FB8C00` 직접 쓰기 ❌)
- 글씨는 `AppText` 쓰기 (`Text` ❌)

어기면 VS Code에 노란 줄이 떠요. → [디자인 시스템](#디자인-시스템)

**5. 끝나면 검사하고 PR 올리기**

```bash
npx expo lint
npx tsc --noEmit
```

둘 다 통과하면 PR을 올려요. PR 화면에 뜨는 체크리스트 3개를 확인해주세요.

뭘 해야 할지는 아래 [남은 일](#남은-일)에 담당별로 정리돼 있어요.

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| 프레임워크 | React Native 0.88 + Expo SDK 58 |
| 언어 | TypeScript |
| 화면 이동 | Expo Router (파일 기반 라우팅) |
| 이미지 | expo-image |
| 지도 | 카카오맵 JavaScript SDK (react-native-webview 안에 띄움) |
| 위치 | expo-location |
| 장소 검색 | 카카오 로컬 API (키워드 검색) |
| 기기 저장 | @react-native-async-storage/async-storage (최근 검색기록) |
| 글꼴 | Pretendard (SIL Open Font License 1.1) |
| 코드 검사 | ESLint (eslint-config-expo), TypeScript 타입 검사 |

## 실행 방법

### 준비물

- Node.js 22.13 이상 (React Native 0.88이 요구해요)
- 폰에 **Expo Go** 앱 설치 (App Store / Play 스토어)

### 실행

```bash
npm install
npx expo start
```

> Windows PowerShell에서 `npx`가 보안 오류로 막히면 `npx.cmd expo start`로 실행해요.

### 카카오 키 (지도, 장소 검색)

키가 없어도 앱은 열려요. 지도 자리에는 회색 지도가, 검색 결과 자리에는 안내 문구가 대신 나와요. 진짜 지도와 검색을 쓰려면:

1. [카카오 개발자 콘솔](https://developers.kakao.com)에서 앱을 만들고 **앱 설정 > 앱 > 플랫폼 키**에서 **JavaScript 키**(지도)와 **REST API 키**(장소 검색)를 복사해요.
2. 같은 곳의 JavaScript 키 설정 **JavaScript SDK 도메인**에 `http://localhost`를 등록해요. 앱 안의 지도 페이지가 이 주소로 열려서, 등록하지 않으면 지도가 뜨지 않아요.
3. 프로젝트 맨 위 폴더에 `.env.example`을 복사해 `.env`를 만들고 키를 넣어요. `.env`는 GitHub에 올라가지 않아요.

```bash
EXPO_PUBLIC_KAKAO_MAP_JS_KEY=복사한_JavaScript_키
EXPO_PUBLIC_KAKAO_REST_API_KEY=복사한_REST_API_키
```

4. `.env`를 바꾼 뒤에는 `npx expo start`를 껐다가 다시 켜요.

> REST API 키는 앱 안에 들어가서 누구나 꺼내 볼 수 있어요. 해커톤 시연용으로는 괜찮지만, 실제로 출시할 때는 검색 요청을 우리 서버를 거치게 바꿔요.

터미널에 뜬 QR 코드를 폰으로 찍으면 Expo Go에서 앱이 열려요.

- **아이폰**: 기본 카메라 앱으로 QR을 찍어요.
- **안드로이드**: Expo Go 앱의 "Scan QR code"로 찍어요.
- PC와 폰은 **같은 와이파이**에 있어야 해요. 다른 네트워크라면 `npx expo start --tunnel`로 실행해요.

코드를 저장하면 폰 화면에 바로 반영돼요.

### 검사

작업을 마치면 아래 두 가지를 통과하는지 확인해요.

```bash
npx expo lint      # 코드 스타일 검사
npx tsc --noEmit   # 타입 검사
```

## 폴더 구조

```
src/
  app/            화면 주소와 화면 이동 구조 (Expo Router)
  features/       기능별 코드 (각 폴더의 screens/에 실제 화면)
    auth/           소개, 로그인, 회원가입, 권한, 취향 설문
    map/            지도, 검색, 검색한 장소, 묶음 목록, 자리 상세, 열린 자리, 산책 경로, 신고
    record/         내 기록
    upload/         남기기 (촬영, 한 줄, 위치 확인)
    my/             마이, 좋아요 내역, 연 자리 기록, 기호 수정, 설정
    notification/   다녀갔어요 알림
  components/     두 개 이상의 기능이 같이 쓰는 부품
  constants/      디자인 시스템 (색상, 글꼴)
  hooks/          같이 쓰는 훅 (내 위치 가져오기 등)
  api/            서버 요청
  mock/           백엔드 완성 전에 쓰는 가짜 데이터
  utils/          거리 계산 같은 작은 함수
  types/          데이터 타입
assets/
  fonts/          Pretendard 글꼴 파일
  images/         앱 아이콘, 시작 화면 이미지
```

- `src/app/`에는 **화면 파일만** 둬요. 실제 UI와 로직은 `features/`에서 가져와요.
- 한 기능에서만 쓰는 부품은 그 기능 폴더에, 여러 기능이 같이 쓰는 부품은 `components/`에 둬요.
- 지도 담당은 주로 `features/map`, 화면 담당은 나머지 기능 폴더에서 작업해서 Git 충돌을 줄여요.
- 빈 폴더의 `.gitkeep`은 폴더를 GitHub에 올리기 위한 빈 파일이에요. 폴더에 코드가 생기면 지워도 돼요.

## 화면 구성

와이어프레임의 모든 화면(⓪ 시작, ① 지도, ② 기록, ③ 마이)이 **회색 배치**로 만들어져 있어요. 버튼, 입력창, 글자 위치는 와이어프레임대로 맞췄고, 사진 자리는 회색 상자예요. GUI 디자인이 나오면 각 화면 파일에서 색과 그림만 바꾸면 돼요.

가짜 데이터는 `src/mock/`와 각 기능의 `constants/preview-*.ts`에 있어요. 백엔드 API가 나오면 이 값을 서버 데이터로 바꿔요.

지도 API는 **카카오맵**이에요. Expo Go에서도 열리도록 네이티브 SDK 대신 WebView 안에 카카오맵 JavaScript SDK를 띄워요. 지금은 지도 홈(`/map`)만 카카오맵이고, 나머지 지도 화면과 내 기록 지도, 남기기 위치 확인은 아직 회색 지도(`components/map-placeholder.tsx`)예요.

지도 홈은 Figma GUI 디자인(비탐색 모드, 탐색 모드)으로 바뀌었어요. 카카오맵 코드는 `features/map/kakao-map/`에 모여 있어요.

| 파일 | 하는 일 |
|---|---|
| `kakao-map-view.tsx` | WebView에 지도를 띄우고 마커·내 위치를 보내요. 키가 없거나 지도를 못 불러오면 회색 지도를 보여줘요. |
| `build-kakao-map-html.ts` | WebView에 넣을 지도 페이지 (카카오 SDK 불러오기, 마커 그리기) |
| `kakao-map-styles.ts` | 마커 CSS. 마커는 HTML이라 `AppText`를 못 써서, `colors`·`typography` 값을 CSS로 바꿔 넣어요. |
| `kakao-map-bridge.ts` | 앱과 지도 페이지가 주고받는 메시지 모양 |

검색(`/map/search`)은 지도 홈 위에 투명하게 덮이는 창이에요. 글자를 치는 동안 결과가 바로 나오고, 키보드의 검색을 누르면 **검색결과 화면**(`/map/results`)으로 가요. 검색결과 화면에는 장소 / 해시태그 탭, 결과 위치를 보여주는 지도, 가까운순·정확도순 목록이 있어요.

- **장소**: 카카오 로컬 API로 찾아요 (`features/map/api/search-places.ts`).
- **해시태그**: `#`으로 시작하면 해시태그 검색이에요. 지도 홈과 같은 기록에서 해시태그를 찾고, 같은 해시태그는 가장 가까운 기록 하나로 묶어요 (`features/map/utils/search-hashtags.ts`). 동네 이름은 카카오 좌표→주소 API로 붙여요 (`features/map/api/get-region-name.ts`).
- **최근 검색기록**은 폰에 저장돼서 앱을 꺼도 남아요. 검색 화면과 검색결과 화면이 같은 기록을 써요.
- 장소 결과를 누르면 장소 화면(`/map/place/[id]`)으로 이름·주소·좌표를 넘기고, 해시태그 결과를 누르면 그 기록의 자리 상세로 가요.

지도 홈 마커는 `features/map/constants/preview-markers.ts`의 가짜 데이터예요. 어디서 앱을 켜도 보이도록 **처음 받은 내 위치 주변**에 놓여요. 사진이 열렸는지는 내 위치에서 **열림 반경**(`features/map/constants/map-config.ts`의 `openRadiusMeters`, 지금 100m) 안에 있는지로 정해요. 나머지 지도 화면의 마커와 경로 위치는 `features/map/constants/preview-*.ts`의 화면 좌표예요.

```
앱 시작 → 소개 → 로그인 → (회원가입) → 권한 요청 → 취향 설문 → 지도
                └─ 건너뛰기 ─────────────────────────────────→ 지도

아래 탭
├─ 지도  /map            → 검색 → 검색한 장소 → 걸어서 가기(자리 상세)
│                         → 묶음 목록, 자리 상세 → 열린 자리 → 신고(모달)
│                         → 산책 경로 (추천 → 걷는 중)
├─ 기록  /record
└─ 마이  /my             → 좋아요 내역, 연 자리 기록, 다녀갔어요 알림, 기호 수정, 설정

남기기 (탭 바 없는 전체 화면)  /upload/camera → write → confirm → 내 기록
  지도의 카메라 버튼, 자리 상세, 열린 자리, 내 기록에서 들어와요.
```

| 주소 | 화면 파일 | 와이어프레임 |
|---|---|---|
| `/intro`, `/login`, `/signup`, `/permission`, `/survey` | `features/auth/screens/` | ⓪ 시작 |
| `/map`, `/map/search`, `/map/results`, `/map/place/[id]`, `/map/walk` | `features/map/screens/` | ① 지도 |
| `/map/cluster/[id]` | `features/map/screens/` | ①-A |
| `/map/spot/[id]`, `/opening/[id]`, `/map/opened/[id]`, `/report/[id]` | `features/map/screens/` | ①-A, ①-B |
| `/record` | `features/record/screens/` | ② 기록 |
| `/upload/camera`, `/upload/write`, `/upload/confirm` | `features/upload/screens/` | ② 기록 |
| `/my`, `/my/likes`, `/my/opened-history`, `/my/preferences`, `/my/settings` | `features/my/screens/` | ③ 마이 |
| `/my/notifications` | `features/notification/screens/` | ③ 마이 |

와이어프레임 여러 장이 한 화면의 여러 상태인 경우가 많아요. 예를 들어 위치 권한 안내와 탐색 모드는 `/map` 한 화면이고, AI 추천 산책길과 걷는 중은 `/map/walk` 한 화면이에요. 위치 권한 안내는 실제 권한을 따라요. 다시 보려면 폰 설정에서 Expo Go의 위치 권한을 끄면 돼요.

- 지도 홈은 손가락으로 끌고 확대·축소해요. 사진 묶음을 누르면 묶음 목록, 사진을 누르면 자리 상세로 가요.
- **묶음 목록**(`/map/cluster/[id]`)은 위쪽 카카오 지도에 고른 묶음을 주황 원으로 표시하고, 아래 패널에 묶음 안의 기록을 AI 추천순(서버가 준 순서)으로 보여줘요. 기록을 누르면 자리 상세로 가요. 홈 마커의 '+N개 더'는 묶음 기록 수에서 세요 (`features/map/constants/preview-cluster.ts`).
- 검색결과와 묶음 목록의 아래 패널은 같은 부품(`features/map/components/map-bottom-sheet.tsx`)이에요. 손잡이를 누르거나 밀어서 접고 펼쳐요.
- 오른쪽 위 **탐색 모드** 스위치를 켜면 내 위치 둘레에 열림 반경 원이 그려지고, 아래 패널에 **가장 가까운 기록**이 떠요. 패널은 손잡이를 누르거나 위아래로 밀어서 접고 펼쳐요. 펼친 동안에는 카메라 버튼이 숨어요.
- 자리 상세(`/map/spot/[id]`)는 자리 종류에 따라 모양이 달라요. 맛보기 사진을 누르면 **맛보기**, 점선 `+`를 누르면 **빈 자리**, 나머지 흐린 사진을 누르면 **거리별 열림 단계**가 열려요.
- 거리별 열림 단계는 **480m 멀리 → 120m 다가가는 중 → 25m 거의 열림 → 열렸어요(`/opening/[id]`) → 열린 자리(`/map/opened/[id]`)** 순서예요. 진짜 위치를 붙이기 전까지는 화면의 `(시연)` 버튼으로 다음 단계로 넘겨요. 단계와 거리 값은 `features/map/constants/approach-stages.ts`에 있어요.

## 남은 일

화면 배치는 끝났고, 아래는 **아직 진짜로 동작하지 않는 것**이에요. 끝내면 `[x]`로 체크해 주세요. 각 파일 맨 위 주석에도 무엇을 붙여야 하는지 적혀 있어요.

### 지도 담당

- [x] **지도 API 정하기** → 카카오맵 (WebView + JavaScript SDK, Expo Go에서 동작)
- [x] 지도 홈을 카카오맵으로 바꾸기 → `features/map/kakao-map/`
- [ ] 나머지 지도 화면의 회색 지도를 카카오맵으로 바꾸기 → `components/map-placeholder.tsx`를 쓰는 화면들
- [ ] 마커·경로를 화면 좌표에서 위도·경도로 바꾸기 → `features/map/constants/preview-*.ts`는 서버 데이터가 오면 지우기
- [x] 위치 권한 확인·요청, 내 위치 가져오기 → `features/map/hooks/use-my-location.ts`
- [ ] 남기기 화면에서도 내 위치가 필요하면 `use-my-location.ts`를 `src/hooks/`로 옮기기
- [x] 지도 홈 탐색 모드 (열림 반경, 가장 가까운 기록 패널) → `features/map/components/explore-sheet.tsx`
- [ ] 열림 반경 실제 값 정하기 (캠퍼스에서 걸어보기) → `features/map/constants/map-config.ts`
- [ ] 탐색 모드 스위치에 눈 아이콘 넣기 → `features/map/components/explore-mode-toggle.tsx`
- [ ] 거리 계산 함수 → `src/utils/`
- [ ] 거리에 따라 열림 단계가 자동으로 바뀌게 하기. 캠퍼스에서 걸어보고 거리 값 정하기 → `features/map/constants/approach-stages.ts`
- [ ] 걸어서 길 안내, AI 산책 경로 받아와서 그리기 (TMAP 보행자 경로 등)
- [ ] 바텀시트를 손으로 끌어 올리고 내리기 (필요하면) → `features/map/components/bottom-panel.tsx`

### 화면 담당

- [ ] 카메라 연결 (`expo-camera`): 촬영, 카메라 전환 → `features/upload/components/camera-viewfinder.tsx`, `features/upload/screens/camera-screen.tsx`
- [ ] 권한 안내 화면에서 실제 위치·카메라·알림 권한 요청 → `features/auth/screens/permission-screen.tsx`
- [ ] 로그인 여부에 따라 첫 화면 정하기 (지금은 항상 소개 화면) → `src/app/index.tsx`
- [ ] 설정의 권한 상태를 실제 값으로 → `features/my/screens/settings-screen.tsx`
- [ ] 화면이 없는 메뉴: 내 신고 내역, 이용약관·개인정보 처리방침, 회원 탈퇴, 비밀번호 찾기
- [ ] 소개 화면 2·3장 문구 디자이너와 확정 (지금은 임시 문구) → `features/auth/constants/intro-slides.ts`

### 서버 연결 (백엔드·AI API가 나오면)

가짜 데이터는 `src/mock/`과 각 기능의 `constants/preview-*.ts`에 있어요. API 요청 코드는 `src/api/`에 모아요.

- [ ] 로그인 (카카오, 구글, 이메일), 회원가입·이메일 인증 → `features/auth/`
- [ ] 취향 설문 저장, 사용자 기호 수정 저장 → `survey-screen.tsx`, `preferences-screen.tsx`
- [ ] 지도 주변 사진, 묶음, 자리 상세, 열린 자리 불러오기 → `features/map/`
- [x] 장소 검색 → 카카오 로컬 API (`features/map/api/search-places.ts`)
- [x] 해시태그 검색 → `features/map/hooks/use-hashtag-search.ts` (지금은 가짜 기록에서 찾아요. 서버가 나오면 기록만 서버 데이터로 바꿔요)
- [ ] 좋아요, 신고 보내기 → `opened-spot-screen.tsx`, `report-screen.tsx`
- [ ] 사진 업로드 (얼굴 감지 결과 포함) → `features/upload/screens/confirm-screen.tsx`
- [ ] AI 해시태그 추천 → `features/upload/screens/write-screen.tsx` (지금은 정해진 2묶음)
- [ ] AI '내 취향 순' 정렬, 다른 산책길 추천 → `cluster-screen.tsx`, `walk-screen.tsx`
- [ ] 내 기록, 좋아요 내역, 연 자리 기록, 알림 목록 불러오기 → `features/record/`, `features/my/`, `features/notification/`

### GUI 디자인이 나오면

- [ ] 회색 사진 자리를 실제 흐린 사진으로 (`expo-image`의 `blurRadius`) → `components/photo-placeholder.tsx`
- [ ] 흐림이 걷히는 애니메이션 → `features/map/screens/opening-screen.tsx`
- [ ] 아래 탭 아이콘 → `src/app/(tabs)/_layout.tsx`
- [ ] 와이어프레임 때문에 임시로 추가한 색 4개 맞추기 → `src/constants/colors.ts` 아래쪽
- [ ] 소개 화면 일러스트, 앱 아이콘, 시작 화면(스플래시) 이미지 → `assets/images/`

### 정해야 할 것

- [ ] 푸시 알림을 할지 (Expo Go에서는 안 돼서 지금은 앱 안 알림 목록으로 대신함)
- [ ] `develop` 브랜치를 쓸지 (백엔드 레포와 맞추기)

## 디자인 시스템

Figma `디자인 시스템` 페이지의 값을 코드로 옮겨 두었어요.

| 파일 | 내용 |
|---|---|
| `src/constants/colors.ts` | 색상 (Primary, Gray, Semantic, Text, Border, Background) |
| `src/constants/typography.ts` | 글씨 스타일 (Heading, Subtitle, Body, Caption, Button) |
| `src/components/app-text.tsx` | 글씨 부품 `AppText` |
| `src/constants/layout.ts` | 간격(`spacing`), 모서리(`radius`), 화면 좌우 여백 |

### 공통 부품

화면을 만들 때 아래 부품을 먼저 가져다 써요. 지도 화면에서도 같이 써요.

| 부품 | 용도 |
|---|---|
| `ScreenContainer` | 모든 화면의 바깥 틀 (여백, 안전 영역, 위·아래 고정 영역) |
| `ScreenHeader` | 뒤로가기, 제목, 오른쪽 버튼 |
| `Button` | 큰 버튼 (`primary` 강조 / `dark` 기본 / `outline` 보조) |
| `TextField` | 라벨이 있는 입력창 |
| `Checkbox` | 체크박스 |
| `Icon` | 아이콘 (iOS·Android 이름 차이를 맞춰 둠) |
| `PhotoPlaceholder` | 사진이 붙기 전 회색 사진 자리 |
| `Chip` | 해시태그·필터·최근 검색어 같은 동그란 작은 버튼 |
| `Badge` | 맛보기, 곧 열려요, AI 추천 같은 작은 상태 표시 |
| `IconButton` | 지도 위에 떠 있는 동그란 아이콘 버튼 |
| `SegmentedToggle` | 리스트 / 지도처럼 보기 방식을 바꾸는 작은 토글 |
| `Radio` | 여럿 중 하나만 고르는 동그라미 (신고 사유 등) |
| `MapPlaceholder` | 진짜 지도를 붙이기 전 회색 지도 |

### 사용법

```tsx
import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';

<AppText variant="heading01">제목</AppText>
<AppText variant="body02" color="textSecondary">본문</AppText>

<View style={{ backgroundColor: colors.background02 }} />
```

### 지켜야 할 것

- 색은 `#FB8C00`처럼 직접 쓰지 말고 `colors`에서 이름으로 가져다 써요.
- 글씨는 React Native의 `Text` 대신 `AppText`를 써요.
- Figma 디자인 시스템이 바뀌면 위 두 파일만 고치면 앱 전체에 반영돼요.
- 위 두 가지를 어기면 VS Code에 **노란 줄(경고)**이 떠요. 앱 실행은 막지 않아요.


## 코드 규칙

이름 짓는 법, 폴더 사용법, 주석 규칙은 [`AGENTS.md`](AGENTS.md)의 **우리 팀 규칙**에 있어요. AI 도구도 이 파일을 읽고 같은 규칙으로 코드를 써요.

PR을 올리면 짧은 체크리스트가 자동으로 떠요.

## 라이브러리 설치

`npm install` 대신 아래 명령어를 써요. 현재 Expo 버전에 맞는 버전을 골라줘요.

```bash
npx expo install 패키지이름
```

Expo Go에 포함되지 않은 네이티브 라이브러리를 넣으면 Expo Go로는 앱이 열리지 않아요. 설치 전에 팀원과 먼저 상의해요.

## 환경 변수

API 키, 서버 주소 같은 값은 `.env` 파일에 넣어요. `.env`는 GitHub에 올라가지 않아요.

```
EXPO_PUBLIC_API_URL=https://...
```

`EXPO_PUBLIC_`로 시작하는 값은 앱 안에 포함되므로, 비밀 키는 넣지 말고 백엔드에 둬요.
