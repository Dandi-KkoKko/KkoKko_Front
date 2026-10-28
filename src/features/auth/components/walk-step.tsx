import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Checkbox } from '@/components/checkbox';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { OptionCard } from '@/features/auth/components/option-card';
import { SurveyTitle } from '@/features/auth/components/survey-title';
import {
  walkDurationOptions,
  walkTimeOptions,
  type WalkDuration,
  type WalkTime,
} from '@/features/auth/constants/survey-options';

type WalkStepProps = {
  walkTimes: WalkTime[];
  walkDuration?: WalkDuration;
  onChangeWalkTimes: (value: WalkTime[]) => void;
  onChangeWalkDuration: (value: WalkDuration) => void;
};

/** 설문 3/3: 주로 걷는 때(여러 개), 한 번에 걷는 시간(하나). 산책길 추천에 쓴다. */
export function WalkStep({ walkTimes, walkDuration, onChangeWalkTimes, onChangeWalkDuration }: WalkStepProps) {
  const toggleTime = (time: WalkTime) =>
    onChangeWalkTimes(walkTimes.includes(time) ? walkTimes.filter((item) => item !== time) : [...walkTimes, time]);

  return (
    <View>
      <SurveyTitle title={'언제, 얼마나\n걷는 편인가요?'} description="산책길을 추천할 때 써요 · 여러 개 골라도 돼요" />

      <AppText variant="subtitle04" style={styles.label}>
        주로 걷는 때
      </AppText>
      <View style={styles.list}>
        {walkTimeOptions.map((time) => {
          const selected = walkTimes.includes(time);
          return (
            <OptionCard
              key={time}
              title={time}
              selected={selected}
              onPress={() => toggleTime(time)}
              right={<Checkbox checked={selected} />}
            />
          );
        })}
      </View>

      <AppText variant="subtitle04" style={[styles.label, styles.durationLabel]}>
        한 번에 걷는 시간
      </AppText>
      <View style={styles.segments}>
        {walkDurationOptions.map((duration) => {
          const selected = walkDuration === duration;
          return (
            <Pressable
              key={duration}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => onChangeWalkDuration(duration)}
              style={[styles.segment, selected && styles.selectedSegment]}>
              <AppText variant="button03" color={selected ? 'textInverse' : 'textPrimary'}>
                {duration}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: spacing.xs,
  },
  durationLabel: {
    marginTop: spacing.xl,
  },
  list: {
    gap: spacing.xs,
  },
  segments: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  segment: {
    flex: 1,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.disabledBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSegment: {
    backgroundColor: colors.textPrimary,
    borderColor: colors.textPrimary,
  },
});
