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
| 화면 | `src/features/upload`, `auth`, `record`, `notification` |

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

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| 프레임워크 | React Native 0.88 + Expo SDK 58 |
| 언어 | TypeScript |
| 화면 이동 | Expo Router (파일 기반 라우팅) |
| 이미지 | expo-image |
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
  app/            화면 (파일 하나 = 화면 하나, Expo Router)
  features/       기능별 코드
    map/            흐릿한 지도, 다가가서 열기
    upload/         카메라 촬영, 한 줄, 해시태그, 업로드
    auth/           온보딩, 로그인
    record/         내 기록 보기
    notification/   알림 목록, 신고
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

## 디자인 시스템

Figma `디자인 시스템` 페이지의 값을 코드로 옮겨 두었어요.

| 파일 | 내용 |
|---|---|
| `src/constants/colors.ts` | 색상 (Primary, Gray, Semantic, Text, Border, Background) |
| `src/constants/typography.ts` | 글씨 스타일 (Heading, Subtitle, Body, Caption, Button) |
| `src/components/app-text.tsx` | 글씨 부품 `AppText` |

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

앱 첫 화면의 **디자인 시스템 보기**를 누르면 모든 색과 글씨를 폰에서 확인할 수 있어요.

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
