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

## 우리 팀 규칙 (KkoKko_Front)

이 프로젝트는 해커톤 심사에서 **코드 가독성, 아키텍처 설계, 문서화**를 평가받는다. 코드를 쓸 때 아래를 지킨다.

### 디자인 시스템

- 색은 `src/constants/colors.ts`의 `colors`(용도별 이름)를 쓴다. 꼭 필요할 때만 `palette`를 쓴다. `#FB8C00` 같은 hex 값을 화면에 직접 쓰지 않는다.
- 글씨는 React Native `Text` 대신 `src/components/app-text.tsx`의 `AppText`를 쓰고, `variant`로 스타일을 고른다. `fontSize`, `fontFamily`를 직접 쓰지 않는다.
- 디자인 시스템에 없는 값이 필요하면 화면에 임시로 넣지 말고 `src/constants/`에 이름을 붙여 추가한다.
- Figma 파일: `https://www.figma.com/design/yPo9TnNjD86Gedi8oPqgWt/Design` (디자인 시스템, 와이어 프레임, GUI 디자인 페이지)

### 폴더

- `src/app/`: 화면 파일만 둔다. 화면 파일은 짧게 유지하고, 실제 UI와 로직은 `features/`에서 가져온다.
- `src/features/<기능>/`: 기능별 코드 (`map`, `upload`, `auth`, `record`, `notification`). 그 기능에서만 쓰는 부품, 훅, 함수는 여기에 둔다.
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
