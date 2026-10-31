import { router } from 'expo-router';
import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/layout';
import { NotificationRow } from '@/features/notification/components/notification-row';
import { mockNotificationGroups } from '@/mock/notifications';

/**
 * ③ 마이 탭: 알림. 푸시 알림은 1차에서 하지 않아서, 앱 안 알림 목록으로만 보여준다.
 * 알림을 누르면 내가 남긴 기록으로 간다.
 */
export function NotificationsScreen() {
  return (
    <ScreenContainer withBottomInset={false} header={<ScreenHeader title="알림" />}>
      <View style={styles.groups}>
        {mockNotificationGroups.map((group) => (
          <View key={group.label} style={styles.group}>
            <AppText variant="caption02" color="textTertiary">
              {group.label}
            </AppText>
            <View>
              {group.items.map((notification, index) => (
                <Fragment key={notification.id}>
                  {index > 0 && <View style={styles.divider} />}
                  <NotificationRow notification={notification} onPress={() => router.push('/record')} />
                </Fragment>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  groups: {
    gap: spacing.xl,
  },
  group: {
    gap: spacing.xxs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.disabledBackground,
  },
});
