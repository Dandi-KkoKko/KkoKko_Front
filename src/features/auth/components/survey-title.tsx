import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { sectionGap, spacing } from '@/constants/layout';

type SurveyTitleProps = {
  title: string;
  description: ReactNode;
};

export function SurveyTitle({ title, description }: SurveyTitleProps) {
  return (
    <View style={styles.container}>
      <AppText variant="heading02">{title}</AppText>
      <AppText variant="body01" color="textTertiary">
        {description}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xxs,
    marginBottom: sectionGap,
  },
});
