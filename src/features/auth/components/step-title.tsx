import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { sectionGap, spacing } from '@/constants/layout';

type StepTitleProps = {
  title: string;
  description?: ReactNode;
};

/** 설문·회원가입 단계마다 맨 위에 두는 큰 제목과 한 줄 설명 */
export function StepTitle({ title, description }: StepTitleProps) {
  return (
    <View style={styles.container}>
      <AppText variant="heading02">{title}</AppText>
      {description && (
        <AppText variant="body01" color="textTertiary">
          {description}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xxs,
    marginBottom: sectionGap,
  },
});
