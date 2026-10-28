import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon, type IconName } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

/** 흰 카드 안에 줄들을 묶는다. 줄 사이에는 구분선이 들어간다. */
export function MenuGroup({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <View style={styles.groupWrapper}>
      {title && (
        <AppText variant="caption02" color="textTertiary" style={styles.groupTitle}>
          {title}
        </AppText>
      )}
      <View style={styles.group}>{children}</View>
    </View>
  );
}

type MenuRowProps = {
  label: string;
  /** 제목 아래 작은 설명 */
  description?: string;
  icon?: IconName;
  /** 오른쪽 끝: 글자 값, 스위치 등 */
  trailing?: ReactNode;
  /** 있으면 오른쪽에 > 가 붙고 누를 수 있다 */
  onPress?: () => void;
  isLast?: boolean;
};

/** 마이·설정의 한 줄 */
export function MenuRow({ label, description, icon, trailing, onPress, isLast = false }: MenuRowProps) {
  return (
    <Pressable disabled={!onPress} onPress={onPress} style={[styles.row, !isLast && styles.divider]}>
      {icon && <Icon name={icon} size={20} />}
      <View style={styles.texts}>
        <AppText variant="body01">{label}</AppText>
        {description && (
          <AppText variant="caption02" color="textTertiary">
            {description}
          </AppText>
        )}
      </View>
      {trailing}
      {onPress && <Icon name="forward" size={18} color="textTertiary" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  groupWrapper: {
    gap: spacing.xs,
  },
  groupTitle: {
    paddingHorizontal: spacing.xxs,
  },
  group: {
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.background01,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.background02,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
});
