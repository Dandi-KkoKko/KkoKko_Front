// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

// 디자인 시스템을 안 따른 코드에 노란 줄(경고)만 띄운다. 앱 실행은 막지 않는다.
const designSystemRules = {
  'no-restricted-syntax': [
    'warn',
    {
      selector: 'Literal[value=/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]',
      message: '색은 직접 쓰지 말고 @/constants/colors 의 colors 를 써주세요.',
    },
  ],
  'no-restricted-imports': [
    'warn',
    {
      paths: [
        {
          name: 'react-native',
          importNames: ['Text'],
          message: '글씨는 @/components/app-text 의 AppText 를 써주세요.',
        },
      ],
    },
  ],
};

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: designSystemRules,
  },
  {
    // 디자인 시스템을 정의하는 파일은 예외
    files: ['src/constants/colors.ts', 'src/components/app-text.tsx'],
    rules: {
      'no-restricted-syntax': 'off',
      'no-restricted-imports': 'off',
    },
  },
]);
