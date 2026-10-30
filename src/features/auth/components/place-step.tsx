import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { spacing } from '@/constants/layout';
import { OptionCard } from '@/features/auth/components/option-card';
import { StepTitle } from '@/features/auth/components/step-title';
import { minPlaceCount, placeOptions } from '@/features/auth/constants/survey-options';

type PlaceStepProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

/** 설문 2/3: 끌리는 자리 해시태그 (여러 개, 최소 3개) */
export function PlaceStep({ value, onChange }: PlaceStepProps) {
  const toggle = (hashtag: string) =>
    onChange(value.includes(hashtag) ? value.filter((item) => item !== hashtag) : [...value, hashtag]);

  return (
    <View>
      <StepTitle
        title={'어떤 자리에\n마음이 가나요?'}
        description={
          <>
            {minPlaceCount}개 이상 골라주세요 ·{' '}
            <AppText variant="button01">{value.length}개</AppText> 선택
          </>
        }
      />
      <View style={styles.grid}>
        {placeOptions.map((option) => (
          <OptionCard
            key={option.hashtag}
            title={option.hashtag}
            description={option.description}
            selected={value.includes(option.hashtag)}
            onPress={() => toggle(option.hashtag)}
            compact
            style={styles.gridItem}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  // 칸 사이 간격 때문에 50%는 한 줄에 두 개가 안 들어간다.
  // 세 개는 못 들어가는 40%를 기본 폭으로 잡고 남는 폭은 flexGrow로 나눠 채워서 늘 두 칸이 된다.
  gridItem: {
    flexBasis: '40%',
    flexGrow: 1,
  },
});
