import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Badge } from '@/components/badge';
import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

type ProfileCardProps = {
  nickname: string;
  school: string;
  loginProvider: string;
};

/** 닉네임은 내 화면에서만 보인다. 남긴 사진은 늘 익명이다. */
export function ProfileCard({ nickname, school, loginProvider }: ProfileCardProps) {
  return (
    <View style={[styles.card, styles.profile]}>
      <View style={styles.avatar}>
        <Icon name="person" size={28} color="textTertiary" />
      </View>
      <View style={styles.profileTexts}>
        <AppText variant="subtitle01">{nickname}</AppText>
        <AppText variant="caption02" color="textTertiary">
          {school} · {loginProvider} 로그인
        </AppText>
      </View>
    </View>
  );
}

type StatsCardProps = {
  stats: { label: string; value: number }[];
};

/** 남긴·연·좋아요한 자리 수. 순위 없이 나만 보는 숫자다. */
export function StatsCard({ stats }: StatsCardProps) {
  return (
    <View style={[styles.card, styles.stats]}>
      {stats.map((stat, index) => (
        <View key={stat.label} style={[styles.stat, index > 0 && styles.statDivider]}>
          <AppText variant="subtitle01">{stat.value}</AppText>
          <AppText variant="caption02" color="textTertiary">
            {stat.label}
          </AppText>
        </View>
      ))}
    </View>
  );
}

/** AI '숨은 좋아함' 리포트 자리. MVP에서는 빠져서 '준비 중'으로만 보여준다. */
export function AiReportTeaser() {
  return (
    <View style={[styles.card, styles.report]}>
      <View style={styles.reportHeader}>
        <AppText variant="subtitle03">AI 리포트 · 숨은 좋아함</AppText>
        <Badge label="준비 중" tone="muted" />
      </View>
      <AppText variant="caption01" color="textSecondary">
        “너는 사람 냄새 나는 오래된 가게를 좋아하고 있었어” 같은 리포트가 곧 찾아와요
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.background01,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.disabledBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTexts: {
    gap: spacing.xxs,
  },
  stats: {
    flexDirection: 'row',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xxs,
  },
  statDivider: {
    borderLeftWidth: 1,
    borderLeftColor: colors.disabledBackground,
  },
  report: {
    gap: spacing.xs,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderDeactivated,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
