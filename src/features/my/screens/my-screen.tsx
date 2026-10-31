import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { IconButton } from '@/components/icon-button';
import { ScreenContainer } from '@/components/screen-container';
import { spacing } from '@/constants/layout';
import { MenuGroup, MenuRow } from '@/features/my/components/menu-group';
import { ProfileCard, StatsCard } from '@/features/my/components/profile-summary';
import { mockMyStats, mockProfile } from '@/mock/my-activity';

/** ③ 마이 탭: 프로필, 내 숫자, 메뉴. 알림은 오른쪽 위 종 버튼으로 들어간다. */
export function MyScreen() {
  return (
    <ScreenContainer withBottomInset={false} background="gray">
      <View style={styles.titleRow}>
        <AppText variant="heading02" style={styles.title}>
          마이
        </AppText>
        <IconButton icon="bell" size={48} accessibilityLabel="알림" onPress={() => router.push('/my/notifications')} />
      </View>

      <View style={styles.sections}>
        <ProfileCard {...mockProfile} />
        <StatsCard
          stats={[
            { label: '남긴 자리', value: mockMyStats.leftCount },
            { label: '연 자리', value: mockMyStats.openedCount },
            { label: '좋아요한 자리', value: mockMyStats.likedCount },
          ]}
        />
        <MenuGroup>
          <MenuRow icon="heartSmall" label="좋아요 내역" onPress={() => router.push('/my/likes')} />
          <MenuRow icon="unlock" label="연 자리 기록" onPress={() => router.push('/my/opened-history')} />
          <MenuRow icon="hashtagSmall" label="사용자 기호 설정" onPress={() => router.push('/my/preferences')} />
          <MenuRow icon="settings" label="설정" onPress={() => router.push('/my/settings')} />
        </MenuGroup>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  title: {
    paddingHorizontal: spacing.xs,
  },
  sections: {
    gap: spacing.xl,
  },
});
