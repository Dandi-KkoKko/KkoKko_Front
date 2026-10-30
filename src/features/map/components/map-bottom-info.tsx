import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { floatingShadow, radius, spacing } from '@/constants/layout';

/** 지도를 가장 넓게 볼 때 아래 카드: 캠퍼스 전체 자리 수와 묶임 규칙 */
export function CampusSummaryCard({ spotCount }: { spotCount: number }) {
  return (
    <View style={styles.card}>
      <AppText variant="subtitle03">캠퍼스에 남겨진 자리 {spotCount}곳</AppText>
      <AppText variant="caption04" color="textSecondary">
        맨 앞 사진은 좋아요가 많은 1장, 나머지는 +N개로 묶여요
      </AppText>
    </View>
  );
}

/** 지도를 자세히 볼 때 아래 범례: 마커 모양이 무슨 뜻인지 */
export function MapLegend() {
  return (
    <View style={[styles.card, styles.legend]}>
      <LegendItem label="흐림">
        <View style={styles.swatch} />
      </LegendItem>
      <LegendItem label="곧 열림">
        <View style={[styles.swatch, styles.openingSwatch]} />
      </LegendItem>
      <LegendItem label="열림 범위">
        <View style={styles.radiusSwatch} />
      </LegendItem>
    </View>
  );
}

function LegendItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={styles.legendItem}>
      {children}
      <AppText variant="caption04">{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...floatingShadow,
    gap: spacing.xxs,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.background01,
  },
  legend: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  swatch: {
    width: 16,
    height: 16,
    borderRadius: radius.xs,
    borderWidth: 1.5,
    borderColor: colors.borderDeactivated,
    backgroundColor: colors.borderDeactivated,
  },
  openingSwatch: {
    borderColor: colors.primary,
    backgroundColor: colors.selectedBackground,
  },
  radiusSwatch: {
    width: 14,
    height: 14,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
  },
});
