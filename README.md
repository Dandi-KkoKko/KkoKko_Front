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

| 브랜치 | 들어 있는 것 |
|---|---|
| `main` | 시연·제출용. 보여줘도 되는 것만 |
| `develop` | 팀 작업을 모으는 곳. 덜 완성됐어도 **앱이 안 깨지는** 것만 |
| `feature/이름-작업` | 각자 작업하는 곳. 예: `feature/yelim-common-components`, `feature/jonggyun-map-home` |

최신 `develop`에서 내 브랜치를 만들어요.

```bash
git checkout develop
git pull origin develop
git checkout -b feature/이름-작업
```

작업이 끝나면 PR을 올려서 **`develop`에 합쳐요.** PR 올리기 전에 `git pull origin develop`으로 최신 내용을 한 번 받아요. `develop`을 `main`에 합치는 건 시연·제출 전에 둘이 확인하고 해요.

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

Figma Dev Mode 값은 **글씨·여백·모서리·색은 그대로**, **화면 너비(390)·고정 위치는 폰 크기에 맞게** 바꿔서 옮겨요. 자세한 기준은 `AGENTS.md`의 "Figma 수치 옮기기"에 있어요.

**5. 끝나면 검사하고 PR 올리기**

```bash
npx expo lint
npx tsc --noEmit
```

둘 다 통과하고 폰에서 한 번 열어본 뒤 PR을 올려요.

뭘 해야 할지는 아래 [남은 일](#남은-일)에 담당별로 정리돼 있어요.

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| 프레임워크 | React Native 0.88 + Expo SDK 58 |
| 언어 | TypeScript |
| 화면 이동 | Expo Router (파일 기반 라우팅) |
| 이미지 | expo-image |
| 위치 | expo-location |
| 카메라 | expo-camera |
| 알림 권한 | expo-notifications (권한 요청만. 푸시 알림은 아직 없음) |
| 글꼴 | Pretendard (SIL Open Font License 1.1) |
| 코드 검사 | ESLint (eslint-config-expo), TypeScript 타입 검사 |

## 실행 방법

### 준비물

- Node.js 20 이상
- 폰에 **Expo Go** 앱 설치 (App Store / Play 스토어)

### 실행

```bash
npm install
npx expo start
```

> Windows PowerShell에서 `npx`가 보안 오류로 막히면 `npx.cmd expo start`로 실행해요.

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
    my/             마이, 좋아요 내역, 연 자리 기록, 기호 설정, 설정, 약관
    notification/   알림 목록
  components/     두 개 이상의 기능이 같이 쓰는 부품
  constants/      디자인 시스템 (색상, 글꼴)
  hooks/          같이 쓰는 훅 (내 위치 가져오기 등)
  api/            서버 요청
  mock/           백엔드 완성 전에 쓰는 가짜 데이터
  utils/          거리 계산 같은 작은 함수
  types/          데이터 타입
assets/
  fonts/          Pretendard 글꼴 파일
  images/         앱 아이콘, 온보딩 일러스트 (onboarding/), 목록 예시 사진 (sample/)
```

- `src/app/`에는 **화면 파일만** 둬요. 실제 UI와 로직은 `features/`에서 가져와요.
- 한 기능에서만 쓰는 부품은 그 기능 폴더에, 여러 기능이 같이 쓰는 부품은 `components/`에 둬요.
- 지도 담당은 주로 `features/map`, 화면 담당은 나머지 기능 폴더에서 작업해서 Git 충돌을 줄여요.
- 빈 폴더의 `.gitkeep`은 폴더를 GitHub에 올리기 위한 빈 파일이에요. 폴더에 코드가 생기면 지워도 돼요.

## 화면 구성

와이어프레임의 모든 화면(⓪ 시작, ① 지도, ② 기록, ③ 마이)이 **회색 배치**로 만들어져 있어요. 버튼, 입력창, 글자 위치는 와이어프레임대로 맞췄고, 사진 자리는 회색 상자예요. GUI 디자인이 나오면 각 화면 파일에서 색과 그림만 바꾸면 돼요.

GUI 디자인을 입힌 화면: 시작 화면(스플래시, 주황 배경), 소개 3장, 로그인(이메일), 회원가입 4단계(이메일 → 비밀번호 → 닉네임 → 약관), 권한 안내, 취향 설문 1/3~3/3과 완료, 마이 탭(마이, 좋아요 내역, 연 자리 기록, 알림, 사용자 기호 설정, 설정, 약관).

가짜 데이터는 `src/mock/`와 각 기능의 `constants/preview-*.ts`에 있어요. 백엔드 API가 나오면 이 값을 서버 데이터로 바꿔요.

지도 화면들과 내 기록 지도, 남기기 위치 확인은 진짜 지도 대신 회색 지도(`components/map-placeholder.tsx`)를 깔아 두었어요. 지도 API는 아직 정하지 않았어요. 정해지면 지도 담당이 이 부분만 진짜 지도로 바꾸고, 위에 올린 검색창, 버튼, 카드는 그대로 써요. 마커와 경로 위치는 `features/map/constants/preview-*.ts`의 가짜 데이터예요.

```
앱 시작 → 소개 → 로그인 → (회원가입) → 권한 요청 → 취향 설문 → 지도
                                                  └─ 건너뛰기 → 지도

아래 탭
├─ 지도  /map            → 검색 → 검색한 장소 → 걸어서 가기(자리 상세)
│                         → 묶음 목록, 자리 상세 → 열린 자리 → 신고(모달)
│                         → 산책 경로 (추천 → 걷는 중)
├─ 기록  /record
└─ 마이  /my             → 알림(오른쪽 위 종), 좋아요 내역, 연 자리 기록, 사용자 기호 설정, 설정 → 약관

남기기 (탭 바 없는 전체 화면)  /upload/camera → write → confirm → 내 기록
  지도의 카메라 버튼, 자리 상세, 열린 자리, 내 기록에서 들어와요.
```

| 주소 | 화면 파일 | 와이어프레임 |
|---|---|---|
| `/intro`, `/login`, `/signup`, `/permission`, `/survey` | `features/auth/screens/` | ⓪ 시작 |
| `/map`, `/map/search`, `/map/place/[id]`, `/map/walk` | `features/map/screens/` | ① 지도 |
| `/map/cluster/[id]` | `features/map/screens/` | ①-A |
| `/map/spot/[id]`, `/opening/[id]`, `/map/opened/[id]`, `/report/[id]` | `features/map/screens/` | ①-A, ①-B |
| `/record` | `features/record/screens/` | ② 기록 |
| `/upload/camera`, `/upload/write`, `/upload/confirm` | `features/upload/screens/` | ② 기록 |
| `/my`, `/my/likes`, `/my/opened-history`, `/my/preferences`, `/my/settings` | `features/my/screens/` | ③ 마이 |
| `/my/notifications` | `features/notification/screens/` | ③ 마이 |
| `/terms` (회원가입 약관 화살표, 설정에서 들어옴) | `features/my/screens/terms-screen.tsx` | ③ 마이 |

와이어프레임 여러 장이 한 화면의 여러 상태인 경우가 많아요. 예를 들어 지도 확대·축소, 맛보기, 빈 자리, 위치 권한 안내는 모두 `/map` 한 화면이고, AI 추천 산책길과 걷는 중은 `/map/walk` 한 화면이에요. 위치 권한 안내 화면을 보려면 `features/map/hooks/use-location-permission.ts`의 초기값을 `false`로 바꿔요.

- 지도의 `+` `−` 버튼으로 **넓게 / 기본 / 자세히** 세 단계를 볼 수 있어요. 단계마다 마커와 아래 카드가 바뀌어요.
- 자리 상세(`/map/spot/[id]`)는 자리 종류에 따라 모양이 달라요. 맛보기 사진을 누르면 **맛보기**, 점선 `+`를 누르면 **빈 자리**, 나머지 흐린 사진을 누르면 **거리별 열림 단계**가 열려요.
- 거리별 열림 단계는 **480m 멀리 → 120m 다가가는 중 → 25m 거의 열림 → 열렸어요(`/opening/[id]`) → 열린 자리(`/map/opened/[id]`)** 순서예요. 진짜 위치를 붙이기 전까지는 화면의 `(시연)` 버튼으로 다음 단계로 넘겨요. 단계와 거리 값은 `features/map/constants/approach-stages.ts`에 있어요.

## 남은 일

화면 배치는 끝났고, 아래는 **아직 진짜로 동작하지 않는 것**이에요. 끝내면 `[x]`로 체크해 주세요. 각 파일 맨 위 주석에도 무엇을 붙여야 하는지 적혀 있어요.

### 지도 담당

- [ ] **지도 API 정하기** (구글 / 카카오 / 네이버 등). Expo Go에서 되는지 먼저 확인
- [ ] 회색 지도를 진짜 지도로 바꾸기 → `components/map-placeholder.tsx`
- [ ] 마커·경로를 화면 좌표에서 위도·경도로 바꾸기 → `features/map/constants/preview-*.ts`는 서버 데이터가 오면 지우기
- [ ] 위치 권한 확인·요청 → `features/map/hooks/use-location-permission.ts` (지금은 항상 허용 상태)
- [ ] 내 위치 가져오기 (`expo-location`). 남기기 화면에서도 쓰니까 `src/hooks/`에 두기
- [ ] 거리 계산 함수 → `src/utils/`
- [ ] 거리에 따라 열림 단계가 자동으로 바뀌게 하기. 캠퍼스에서 걸어보고 거리 값 정하기 → `features/map/constants/approach-stages.ts`
- [ ] 지도 오른쪽 버튼 연결: 확대·축소(진짜 지도 줌), 내 위치로 이동 → `features/map/components/map-controls.tsx`
- [ ] 해시태그 필터로 지도 마커 걸러내기 (지금은 칩만 바뀜)
- [ ] 걸어서 길 안내, AI 산책 경로 받아와서 그리기 (TMAP 보행자 경로 등)
- [ ] 바텀시트를 손으로 끌어 올리고 내리기 (필요하면) → `features/map/components/bottom-panel.tsx`

### 화면 담당

- [ ] 카메라 연결 (`expo-camera`): 촬영, 카메라 전환 → `features/upload/components/camera-viewfinder.tsx`, `features/upload/screens/camera-screen.tsx`
- [x] 권한 안내 화면에서 실제 위치·카메라·알림 권한 요청 → `features/auth/utils/request-app-permissions.ts`
- [ ] 로그인 여부에 따라 첫 화면 정하기 (지금은 항상 소개 화면) → `src/app/index.tsx`
- [x] 설정의 권한 상태를 실제 값으로 → `features/my/hooks/use-permission-labels.ts`
- [ ] 약관 실제 문장 확정 → `features/my/constants/terms-sections.ts`
- [ ] 회원 탈퇴 (계정 API가 나오면). 비밀번호 찾기는 Figma 보류

### 서버 연결 (백엔드·AI API가 나오면)

가짜 데이터는 `src/mock/`과 각 기능의 `constants/preview-*.ts`에 있어요. API 요청 코드는 `src/api/`에 모아요.

- [ ] 이메일 로그인, 회원가입 → `features/auth/screens/`. 틀렸을 때 빨간 칸과 오류 알림(Figma 로그인 오류 화면)도 이때 붙인다
- [ ] 회원가입 입력 규칙: 이메일 형식·중복, 비밀번호 길이·일치, 닉네임 중복 → `signup-screen.tsx` (지금은 비어 있지만 않으면 통과)
- [ ] 취향 설문 저장, 사용자 기호 수정 저장 → `survey-screen.tsx`, `preferences-screen.tsx`
- [ ] 지도 주변 사진, 묶음, 자리 상세, 열린 자리 불러오기 → `features/map/`
- [ ] 검색 → `features/map/screens/search-screen.tsx` (지금은 검색어와 상관없이 같은 결과)
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
- [x] 소개 화면 일러스트, 시작 화면(스플래시) 색 → `assets/images/onboarding/`, `app.json`
- [ ] 앱 아이콘 → `assets/images/`, `app.json`

### 정해야 할 것

- [x] 푸시 알림은 1차에서 하지 않고, 앱 안 알림 목록(`/my/notifications`)만 둔다. 나중에 푸시를 붙일 수 있게 온보딩에서 알림 권한은 미리 묻는다.
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
| `Icon` | Figma 아이콘 (`assets/icons`). Figma에 없는 몇 개만 기기 기본 아이콘 |
| `PhotoPlaceholder` | 사진이 붙기 전 회색 사진 자리 |
| `Chip` | 해시태그·필터·최근 검색어 같은 동그란 작은 버튼 |
| `Badge` | 맛보기, 곧 열려요, AI 추천 같은 작은 상태 표시 |
| `IconButton` | 지도 위에 떠 있는 동그란 아이콘 버튼 |
| `SegmentedToggle` | 리스트 / 지도처럼 보기 방식을 바꾸는 작은 토글 |
| `Radio` | 여럿 중 하나만 고르는 동그라미 (신고 사유 등) |
| `MapPlaceholder` | 진짜 지도를 붙이기 전 회색 지도 |
| `Toggle` | 켜고 끄는 주황 스위치 (설정 등) |
| `TabBar` | 아래 탭 바 (지도·기록·마이) |

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

## 라이브러리 설치

`npm install` 대신 아래 명령어를 써요. 현재 Expo 버전에 맞는 버전을 골라줘요.

```bash
npx expo install 패키지이름
```

Expo Go에 포함되지 않은 네이티브 라이브러리를 넣으면 Expo Go로는 앱이 열리지 않아요. 설치 전에 팀원과 먼저 상의해요.

### 라이브러리 고르는 기준

1. **Expo 공식 모듈을 먼저** 찾아요 ([Expo SDK 목록](https://docs.expo.dev/versions/latest/)). Expo Go에 들어 있어서 QR로 바로 테스트할 수 있어요.
2. 공식 모듈이 없으면 [React Native Directory](https://reactnative.directory/)에서 **"Expo Go" 표시가 있는 것**을 골라요.
3. 라이선스는 **MIT, Apache-2.0, BSD, ISC**만 써요. GPL·AGPL처럼 우리 코드까지 공개해야 하는 라이선스나 라이선스가 없는 것은 쓰지 않아요.
4. 설치한 라이브러리는 위 **기술 스택** 표에 적어요.

지금 쓰는 라이브러리는 모두 Expo·React Native 공식 패키지(MIT)이고, 글꼴 Pretendard는 SIL OFL 1.1이에요.

## 환경 변수

API 키, 서버 주소 같은 값은 `.env` 파일에 넣어요. `.env`는 GitHub에 올라가지 않아요.

```
EXPO_PUBLIC_API_URL=https://...
```

`EXPO_PUBLIC_`로 시작하는 값은 앱 안에 포함되므로, 비밀 키는 넣지 말고 백엔드에 둬요.
