import { StyleSheet, View } from 'react-native';

import { spacing } from '@/constants/layout';
import { OptionCard } from '@/features/auth/components/option-card';
import { StepTitle } from '@/features/auth/components/step-title';
import { relationOptions, type RelationOption } from '@/features/auth/constants/survey-options';

type RelationStepProps = {
  value?: RelationOption['id'];
  onChange: (value: RelationOption['id']) => void;
};

/** 설문 1/3: 대구·경북과의 관계 (하나만 고른다) */
export function RelationStep({ value, onChange }: RelationStepProps) {
  return (
    <View>
      <StepTitle title={'대구·경북과 나는\n어떤 사이인가요?'} description="처음 보여줄 자리를 고르는 데 써요" />
      <View style={styles.options}>
        {relationOptions.map((option) => (
          <OptionCard
            key={option.id}
            title={option.title}
            description={option.description}
            selected={value === option.id}
            onPress={() => onChange(option.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    gap: spacing.md,
  },
});
