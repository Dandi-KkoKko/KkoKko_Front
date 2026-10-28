import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import type { AppNotification } from '@/mock/notifications';

type NotificationRowProps = {
  notification: AppNotification;
  onPress: () => void;
};

/** 알림 한 줄. 안 읽은 알림은 왼쪽에 점이 붙는다. 누가 눌렀는지, 몇 명인지는 보여주지 않는다. */
export function NotificationRow({ notification, onPress }: NotificationRowProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={[styles.dot, notification.isUnread && styles.unreadDot]} />
      <View style={styles.texts}>
        <AppText variant="subtitle04">{notification.title}</AppText>
        <AppText variant="caption02" color="textTertiary">
          {notification.detail}
        </AppText>
      </View>
      <PhotoPlaceholder width={52} height={52} />
    </Pressable>
  );
}

/** 휴대폰 잠금 화면에 뜰 푸시 알림 모양 예시 */
export function PushPreview() {
  return (
    <View style={styles.push}>
      <View style={styles.appIcon} />
      <View style={styles.texts}>
        <AppText variant="subtitle04">가까이</AppText>
        <AppText variant="caption01">누군가 당신의 순간에 다녀갔어요</AppText>
      </View>
      <PhotoPlaceholder width={40} height={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.background02,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
  },
  unreadDot: {
    backgroundColor: colors.primary,
  },
  texts: {
    flex: 1,
    gap: spacing.xxs,
  },
  push: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.background02,
  },
  appIcon: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
  },
});
