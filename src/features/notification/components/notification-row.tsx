import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import type { AppNotification } from '@/mock/notifications';

type NotificationRowProps = {
  notification: AppNotification;
  onPress: () => void;
};

/** 알림 한 줄 (Figma alert). 안 읽은 알림은 왼쪽에 빨간 점이 붙는다. 누가 눌렀는지, 몇 명인지는 보여주지 않는다. */
export function NotificationRow({ notification, onPress }: NotificationRowProps) {
  return (
    <Pressable accessibilityRole="button" style={styles.row} onPress={onPress}>
      <View style={[styles.dot, notification.isUnread && styles.unreadDot]} />
      <View style={styles.texts}>
        <AppText variant="subtitle04" numberOfLines={1}>
          {notification.title}
        </AppText>
        <AppText variant="caption04" color="textTertiary" numberOfLines={1}>
          {notification.detail}
        </AppText>
      </View>
      <Image source={notification.photo} style={styles.photo} contentFit="cover" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  // 읽은 알림도 같은 자리를 비워 둬서 글자 시작 위치가 줄마다 같게 한다
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
  },
  unreadDot: {
    backgroundColor: colors.error,
  },
  texts: {
    flex: 1,
    gap: spacing.xxs,
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
  },
});
