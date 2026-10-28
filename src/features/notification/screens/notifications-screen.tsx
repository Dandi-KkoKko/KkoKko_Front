import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { NotificationRow, PushPreview } from '@/features/notification/components/notification-row';
import { mockNotificationGroups } from '@/mock/notifications';

/**
 * 와이어프레임 ③ 마이 탭: 다녀갔어요 알림.
 * Expo Go에서는 원격 푸시를 쓸 수 없어서, MVP에서는 앱 안 알림 목록으로 대신한다. 위의 푸시 모양은 예시다.
 */
export function NotificationsScreen() {
  return (
    <ScreenContainer withBottomInset={false} header={<ScreenHeader title="다녀갔어요 알림" />}>
      <AppText variant="caption02" color="textTertiary" style={styles.label}>
        푸시 알림 예시
      </AppText>
      <PushPreview />

      <View style={styles.notice}>
        <AppText variant="caption02" color="textSecondary">
          누가 눌렀는지, 몇 명인지는 보이지 않아요. 내 순간이 닿았다는 것만 알려드려요.
        </AppText>
      </View>

      {mockNotificationGroups.map((group) => (
        <View key={group.label} style={styles.group}>
          <AppText variant="caption02" color="textTertiary">
            {group.label}
          </AppText>
          {group.items.map((notification) => (
            <NotificationRow key={notification.id} notification={notification} onPress={() => router.push('/record')} />
          ))}
        </View>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: spacing.xs,
  },
  notice: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.background02,
  },
  group: {
    marginBottom: spacing.md,
  },
});
