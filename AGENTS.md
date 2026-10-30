This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

### 라이브러리 추가 규칙 (KkoKko_Front)

- Expo Go로 QR 테스트를 계속해야 하므로 **Expo Go에 포함된 모듈만** 쓴다. Expo SDK 공식 모듈을 먼저 찾고, 없으면 React Native Directory에서 Expo Go 지원 표시가 있는 것을 고른다.
- 라이선스는 MIT, Apache-2.0, BSD, ISC만 쓴다. GPL·AGPL·라이선스 없음은 쓰지 않는다.
- 설치는 `npx expo install`로 하고, README의 기술 스택 표에 추가한다.
- 푸시 알림은 하지 않는다 (앱 안 알림 목록만). `expo-notifications`를 넣지 않고 휴대폰 알림 권한도 묻지 않는다.

## 우리 팀 규칙 (KkoKko_Front)

이 프로젝트는 해커톤 심사에서 **코드 가독성, 아키텍처 설계, 문서화**를 평가받는다. 코드를 쓸 때 아래를 지킨다.

### 디자인 시스템

- 색은 `src/constants/colors.ts`의 `colors`(용도별 이름)를 쓴다. 꼭 필요할 때만 `palette`를 쓴다. `#FB8C00` 같은 hex 값을 화면에 직접 쓰지 않는다.
- 글씨는 React Native `Text` 대신 `src/components/app-text.tsx`의 `AppText`를 쓰고, `variant`로 스타일을 고른다. `fontSize`, `fontFamily`를 직접 쓰지 않는다.
- 디자인 시스템에 없는 값이 필요하면 화면에 임시로 넣지 말고 `src/constants/`에 이름을 붙여 추가한다.
- 간격과 모서리는 `src/constants/layout.ts`의 `spacing`, `radius`를 쓴다.
- 화면은 `src/components/`의 공통 부품(`ScreenContainer`, `ScreenHeader`, `Button`, `TextField`, `Checkbox`, `Icon`, `PhotoPlaceholder`, `Chip`, `Badge`, `IconButton`, `SegmentedToggle`, `Radio`, `MapPlaceholder`, `Toggle`, `TabBar`)으로 먼저 조립하고, 없을 때만 새로 만든다.
- Figma 파일: `https://www.figma.com/design/yPo9TnNjD86Gedi8oPqgWt/Design` (디자인 시스템, 와이어 프레임, GUI 디자인 페이지)

### Figma 수치 옮기기

Figma(Dev Mode, MCP)의 값은 390 너비 아이폰 화면 기준이다. 폰마다 화면 크기가 다르므로 값을 그대로 복사하지 않고 아래처럼 나눠서 옮긴다.

- **그대로 쓰는 값**: 글씨, 여백·간격, 모서리, 테두리, 버튼·입력창·아이콘 크기, 색. 숫자를 직접 쓰지 말고 `colors.ts`, `typography.ts`, `layout.ts`의 이름으로 바꿔서 쓴다. 맞는 이름이 없으면 그 파일에 추가한다.
- **그대로 쓰지 않는 값**: 화면 너비(390), 화면을 기준으로 한 고정 너비·높이, 화면 위치(`top`, `left`), 버튼을 아래로 밀기 위한 큰 빈 공간(`padding-bottom: 362px` 등). 아래 방식으로 바꾼다.
  - 화면·부모 너비에 맞추기: `flex`, `alignSelf: 'stretch'`, 퍼센트
  - 두세 칸 나누기: `flexDirection: 'row'` + `flex: 1` 또는 `flexWrap`
  - 화면 아래 버튼: `ScreenContainer`의 `footer`
  - 노치·아래 바 피하기: `ScreenContainer`, `useSafeAreaInsets`
- **기준 화면**: 폰 세로 화면. 너비 360~430에서 넘치거나 겹치지 않게 한다. 태블릿·가로 화면은 신경 쓰지 않는다.
- **아이콘·이미지**: Figma에서 SVG·PNG로 받아 `assets/`에 넣고 쓴다. Figma 임시 주소(7일 뒤 만료)를 코드에 남기지 않는다.

### 폴더

- `src/app/`: 화면 파일만 둔다. 화면 파일은 짧게 유지하고, 실제 UI와 로직은 `features/`에서 가져온다.
- `src/features/<기능>/`: 기능별 코드 (`auth`, `map`, `record`, `upload`, `my`, `notification`). 화면은 `screens/`에 두고, 그 기능에서만 쓰는 부품, 훅, 함수도 이 폴더에 둔다.
- `src/app/`의 라우트 파일은 `export { XxxScreen as default } from '@/features/...'` 한 줄만 둔다.
- 모든 화면은 와이어프레임 기준 회색 배치(mid-fidelity)로 되어 있다. GUI 디자인을 입힐 때는 배치와 화면 이동은 유지하고 색·그림·간격만 바꾼다.
- 가짜 데이터는 `src/mock/`와 `features/*/constants/preview-*.ts`에 있다. 화면 안에 가짜 값을 직접 쓰지 않는다.
- `src/components/`: 두 개 이상의 기능이 같이 쓰는 부품만 둔다.
- `src/hooks/`, `src/utils/`, `src/api/`, `src/mock/`, `src/types/`: 여러 기능이 같이 쓰는 훅, 순수 함수, 서버 요청, 가짜 데이터, 데이터 타입.
- 지도 담당은 주로 `features/map`, 화면 담당은 그 외 기능 폴더에서 작업해서 Git 충돌을 줄인다.

### 이름과 주석

- 파일 이름은 `kebab-case` (`photo-card.tsx`), 컴포넌트는 `PascalCase`, 함수와 변수는 `camelCase`, 상수 객체는 `camelCase`.
- 함수 이름은 하는 일을 동사로 쓴다 (`getDistance`, `uploadPhoto`).
- 한 파일이 200줄을 넘거나 한 컴포넌트가 여러 일을 하면 나눈다.
- 주석은 한국어로, "무엇을" 보다 "왜 이렇게 했는지"를 쓴다. 코드만 봐도 알 수 있는 내용은 쓰지 않는다.

### 마무리

- 작업이 끝나면 `npx expo lint`와 `npx tsc --noEmit`을 통과시킨다.
- 폴더 구조나 사용법이 바뀌면 `README.md`도 같이 고친다.
