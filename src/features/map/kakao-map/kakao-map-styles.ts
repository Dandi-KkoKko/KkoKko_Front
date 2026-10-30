import { colors, palette } from '@/constants/colors';
import { floatingShadow, radius, spacing } from '@/constants/layout';
import { typography, type TypographyVariant } from '@/constants/typography';

/**
 * 지도 위 마커는 WebView 안의 HTML이라 AppText나 StyleSheet를 쓸 수 없다.
 * 대신 디자인 시스템 값을 CSS로 바꿔 넣어서, 색과 글씨가 앱의 다른 화면과 같은 이름에서 나오게 한다.
 */

export const pretendardCssUrl =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css';

const photoSize = 48;
const myLocationSize = 32;

const fontWeights: Record<string, number> = {
  'Pretendard-Regular': 400,
  'Pretendard-SemiBold': 600,
  'Pretendard-Bold': 700,
};

function toCssFont(variant: TypographyVariant) {
  const { fontFamily = '', fontSize, lineHeight } = typography[variant];
  return `font-family: Pretendard, sans-serif; font-weight: ${fontWeights[fontFamily]}; font-size: ${fontSize}px; line-height: ${lineHeight}px;`;
}

const shadow = `0 ${floatingShadow.shadowOffset.height}px ${floatingShadow.shadowRadius}px rgba(0, 0, 0, ${floatingShadow.shadowOpacity})`;

export const kakaoMapCss = `
  html, body, #map { margin: 0; width: 100%; height: 100%; }
  body { -webkit-tap-highlight-color: transparent; }

  /*
   * 카카오 JavaScript SDK는 지도 색을 바꾸는 기능이 없어서, Figma의 회색 지도처럼 보이도록 지도 그림(img)만 흑백으로 바꾼다.
   * 마커는 사진이 들어가도 색이 남아야 하므로 .marker 안의 그림은 뺀다.
   */
  #map img:not(.marker *) { filter: grayscale(1); }

  .marker {
    display: flex; flex-direction: column; align-items: center; gap: ${spacing.xxs}px;
    padding: 0; border: 0; background: none;
  }

  .photo {
    width: ${photoSize}px; height: ${photoSize}px; box-sizing: border-box;
    border: 3px solid ${colors.background01}; border-radius: ${radius.sm}px;
    box-shadow: ${shadow};
  }
  /* 아직 열리지 않은 사진은 흐린 회색으로 가린다 */
  .photo-locked { background: radial-gradient(circle, ${colors.lockedPhotoCenter}, ${colors.lockedPhotoEdge}); }
  .photo-open { border-color: ${colors.primary}; background: ${colors.placeholderBox}; }

  .chip {
    padding: ${spacing.xxs}px ${spacing.sm}px; border-radius: ${radius.full}px;
    white-space: nowrap; box-shadow: ${shadow}; ${toCssFont('caption01')}
  }
  .chip-light { background: ${colors.background01}; color: ${colors.textPrimary}; }
  .chip-dark { background: ${colors.textPrimary}; color: ${colors.textInverse}; }

  .stack { position: relative; width: ${photoSize + spacing.xl}px; height: ${photoSize + spacing.sm}px; }
  .stack .photo { position: absolute; }
  .stack-back { left: 0; top: ${spacing.xs}px; transform: rotate(-12deg); }
  .stack-middle { left: ${spacing.sm}px; top: 0; }
  .stack-front { right: 0; top: ${spacing.xs}px; transform: rotate(12deg); }
  .cluster-label { color: ${colors.textPrimary}; ${toCssFont('caption03')} }
  .cluster-more { color: ${colors.textPrimary}; ${toCssFont('caption04')} }

  .my-location {
    display: flex; align-items: center; justify-content: center;
    width: ${myLocationSize}px; height: ${myLocationSize}px; border-radius: ${radius.full}px;
    background: ${palette.primary[50]}; border: 4px solid ${palette.primary[100]}; box-sizing: border-box;
  }
  .my-location-dot {
    width: ${myLocationSize / 2}px; height: ${myLocationSize / 2}px; border-radius: ${radius.full}px;
    background: ${palette.gray.black};
  }
`;
