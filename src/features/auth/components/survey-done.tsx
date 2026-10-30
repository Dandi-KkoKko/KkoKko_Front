import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { radius, sectionGap, spacing } from '@/constants/layout';
import { BlurPhoto } from '@/features/auth/components/blur-photo';
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
      <View style={styles.top}>
        <View style={styles.illustration}>
          <BlurPhoto size={126} style={styles.backPhoto} />
          <BlurPhoto size={136} highlighted style={styles.frontPhoto} />
        </View>

        <View style={styles.texts}>
          <AppText variant="heading01" style={styles.center}>
            {`${nickname}님 근처에\n흐릿한 자리 ${nearbySpotCount}곳이 있어요`}
          </AppText>
          <AppText variant="subtitle03" color="textSecondary" style={styles.center}>
            고른 취향에 맞는 자리부터 먼저 띄워둘게요
          </AppText>
        </View>
      </View>

      <View style={styles.summary}>
        <View style={styles.rows}>
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
        </View>
        <AppText variant="caption04" color="textDeactivated" style={styles.center}>
          {'마이 > 사용자 기호 수정에서 언제든 바꿀 수 있어요'}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: sectionGap,
  },
  top: {
    alignItems: 'center',
    gap: spacing.xxl,
  },
  // 사진 두 장을 서로 반대로 기울여 겹친다 (Figma -12°, +12°)
  illustration: {
    width: 240,
    height: 170,
  },
  backPhoto: {
    position: 'absolute',
    left: 0,
    top: 18,
    transform: [{ rotate: '-12deg' }],
  },
  frontPhoto: {
    position: 'absolute',
    right: 0,
    top: 12,
    transform: [{ rotate: '12deg' }],
  },
  texts: {
    gap: spacing.md,
  },
  center: {
    textAlign: 'center',
  },
  summary: {
    padding: spacing.md,
    borderRadius: radius.xl,
    backgroundColor: colors.background02,
    gap: spacing.md,
  },
  rows: {
    gap: spacing.xs,
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
