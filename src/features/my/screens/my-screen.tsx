import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { ScreenContainer } from '@/components/screen-container';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { MenuGroup, MenuRow } from '@/features/my/components/menu-group';
import { AiReportTeaser, ProfileCard, StatsCard } from '@/features/my/components/profile-summary';
import { mockMyStats, mockProfile } from '@/mock/my-activity';

/** 와이어프레임 ③ 마이 탭: 프로필, 내 숫자, AI 리포트(준비 중), 메뉴 */
export function MyScreen() {
  return (
    <ScreenContainer withBottomInset={false} background="gray">
      <AppText variant="heading02" style={styles.title}>
        마이
      </AppText>

      <View style={styles.sections}>
        <ProfileCard {...mockProfile} />
        <StatsCard
          stats={[
            { label: '남긴 자리', value: mockMyStats.leftCount },
            { label: '연 자리', value: mockMyStats.openedCount },
            { label: '좋아요한 자리', value: mockMyStats.likedCount },
          ]}
        />
        <AiReportTeaser />

        <MenuGroup>
          <MenuRow icon="heart" label="좋아요 내역" onPress={() => router.push('/my/likes')} />
          <MenuRow icon="unlock" label="연 자리 기록" onPress={() => router.push('/my/opened-history')} />
          <MenuRow
            icon="bell"
            label="다녀갔어요 알림"
            trailing={<UnreadCount count={mockMyStats.unreadNotificationCount} />}
            onPress={() => router.push('/my/notifications')}
          />
          <MenuRow icon="hashtag" label="사용자 기호 수정" onPress={() => router.push('/my/preferences')} />
          <MenuRow icon="settings" label="설정" onPress={() => router.push('/my/settings')} isLast />
        </MenuGroup>
      </View>
    </ScreenContainer>
  );
}

function UnreadCount({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <View style={styles.unread}>
      <AppText variant="caption03">{count}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  sections: {
    gap: spacing.md,
  },
  unread: {
    minWidth: 22,
    height: 22,
    paddingHorizontal: spacing.xxs,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
