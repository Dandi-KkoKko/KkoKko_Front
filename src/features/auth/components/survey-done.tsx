import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { relationOptions, type SurveyAnswers } from '@/features/auth/constants/survey-options';

type SurveyDoneProps = {
  answers: SurveyAnswers;
  nickname: string;
  nearbySpotCount: number;
};

/** 설문 완료: 고른 취향을 요약하고 지도로 보낸다 */
export function SurveyDone({ answers, nickname, nearbySpotCount }: SurveyDoneProps) {
  const relationTitle = relationOptions.find((option) => option.id === answers.relation)?.title ?? '-';
  const walkSummary = [...answers.walkTimes, answers.walkDuration].filter(Boolean).join(' · ') || '-';

  const rows = [
    { label: '나와 대구·경북', value: relationTitle },
    { label: '끌리는 자리', value: answers.places.join(' ') || '-' },
    { label: '걷는 때', value: walkSummary },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.illustration}>
        <PhotoPlaceholder width={110} height={136} style={styles.backPhoto} />
        <PhotoPlaceholder width={110} height={136} highlighted style={styles.frontPhoto} />
      </View>

      <AppText variant="heading03" style={styles.center}>
        {`${nickname}님 근처에\n흐릿한 자리 ${nearbySpotCount}곳이 있어요`}
      </AppText>
      <AppText variant="body02" color="textSecondary" style={styles.center}>
        고른 취향에 맞는 자리부터 먼저 띄워둘게요
      </AppText>

      <View style={styles.summary}>
        {rows.map((row) => (
          <View key={row.label} style={styles.row}>
            <AppText variant="caption02" color="textTertiary">
              {row.label}
            </AppText>
            <AppText variant="subtitle04" style={styles.value}>
              {row.value}
            </AppText>
          </View>
        ))}
        <AppText variant="caption02" color="textTertiary">
          마이 › 사용자 기호 수정에서 언제든 바꿀 수 있어요
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  illustration: {
    height: 200,
    marginTop: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backPhoto: {
    position: 'absolute',
    transform: [{ translateX: -36 }, { rotate: '-8deg' }],
  },
  frontPhoto: {
    position: 'absolute',
    transform: [{ translateX: 36 }, { rotate: '6deg' }],
  },
  center: {
    textAlign: 'center',
  },
  summary: {
    marginTop: spacing.xxl,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.background02,
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  value: {
    flexShrink: 1,
    textAlign: 'right',
  },
});
