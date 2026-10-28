import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

type OpenedWeekCardProps = {
  totalCount: number;
  days: { label: string; opened: boolean; isToday?: boolean }[];
};

/** 이번 주 요일별로 자리를 열었는지. 연 날은 검정, 오늘은 강조색, 안 연 날은 회색. */
export function OpenedWeekCard({ totalCount, days }: OpenedWeekCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <AppText variant="subtitle03">이번 주 연 자리</AppText>
        <AppText variant="heading03">{totalCount}곳</AppText>
      </View>
      <View style={styles.days}>
        {days.map((day) => (
          <View key={day.label} style={styles.day}>
            <View style={[styles.bar, day.opened && styles.openedBar, day.isToday && styles.todayBar]} />
            <AppText variant="caption02" color="textTertiary">
              {day.label}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

type StatTileProps = {
  label: string;
  value: string;
};

export function StatTile({ label, value }: StatTileProps) {
  return (
    <View style={styles.tile}>
      <AppText variant="caption02" color="textTertiary">
        {label}
      </AppText>
      <AppText variant="subtitle01">{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.background02,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  days: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  day: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xxs,
  },
  bar: {
    alignSelf: 'stretch',
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.disabledBackground,
  },
  openedBar: {
    backgroundColor: colors.textPrimary,
  },
  todayBar: {
    backgroundColor: colors.primary,
  },
  tile: {
    flex: 1,
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.disabledBackground,
  },
});
