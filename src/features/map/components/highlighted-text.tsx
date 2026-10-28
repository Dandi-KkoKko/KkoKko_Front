import { StyleSheet } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import type { TypographyVariant } from '@/constants/typography';

type HighlightedTextProps = {
  text: string;
  /** 검색어. 이 부분만 배경색으로 강조한다. */
  highlight: string;
  variant?: TypographyVariant;
};

export function HighlightedText({ text, highlight, variant = 'subtitle04' }: HighlightedTextProps) {
  if (!highlight) {
    return <AppText variant={variant}>{text}</AppText>;
  }

  const parts = text.split(highlight);

  return (
    <AppText variant={variant}>
      {parts.map((part, index) => (
        <AppText key={index} variant={variant}>
          {part}
          {index < parts.length - 1 && (
            <AppText variant={variant} style={styles.highlight}>
              {highlight}
            </AppText>
          )}
        </AppText>
      ))}
    </AppText>
  );
}

const styles = StyleSheet.create({
  highlight: {
    backgroundColor: colors.selectedBackground,
  },
});
