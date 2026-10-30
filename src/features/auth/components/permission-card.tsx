import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon, type IconName } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

type PermissionCardProps = {
  icon: IconName;
  title: string;
  description: string;
  required: boolean;
};

/** 권한 하나를 왜 쓰는지 설명하는 카드. 필수 권한은 아이콘 배경과 '필수' 글자를 주황으로 강조한다. */
export function PermissionCard({ icon, title, description, required }: PermissionCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconCircle, required && styles.requiredIcon]}>
        <Icon name={icon} />
      </View>
      <View style={styles.texts}>
        <View style={styles.titleRow}>
          <AppText variant="subtitle03">{title}</AppText>
          <AppText variant="button05" color={required ? 'primaryText' : 'textDeactivated'}>
            {required ? '필수' : '선택'}
          </AppText>
        </View>
        <AppText variant="caption02" color="textSecondary">
          {description}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.background02,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.placeholderBox,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requiredIcon: {
    backgroundColor: colors.primarySoft,
  },
  texts: {
    flex: 1,
    gap: spacing.xxs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});
