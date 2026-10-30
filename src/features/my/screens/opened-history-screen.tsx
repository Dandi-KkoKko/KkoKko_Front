import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { spacing } from '@/constants/layout';
import { OpenedWeekCard, StatTile } from '@/features/my/components/opened-week-card';
import { mockOpenedHistory, mockOpenedWeek } from '@/mock/my-activity';

/**
 * 와이어프레임 ③ 마이 탭: 연 자리 기록.
 * 게임처럼 보상을 주면 아무 사진이나 올리게 돼서, 순위·공개 경쟁 없이 나만 보는 조용한 기록만 남긴다.
 */
export function OpenedHistoryScreen() {
  return (
    <ScreenContainer withBottomInset={false} header={<ScreenHeader title="연 자리 기록" />}>
      <AppText variant="subtitle03" style={styles.sectionTitle}>
        조용한 발견
      </AppText>
      <OpenedWeekCard totalCount={mockOpenedWeek.totalCount} days={mockOpenedWeek.days} />
      <View style={styles.tiles}>
        <StatTile label="이 자리를 처음 연 사람" value={`${mockOpenedWeek.firstOpenerCount}곳`} />
        <StatTile label="걸어서 다가간 거리" value={`${mockOpenedWeek.walkedKilometers}km`} />
      </View>
      <AppText variant="caption04" color="textTertiary">
        순위나 공개 경쟁 없이, 나만 보는 기록이에요
      </AppText>

      <AppText variant="subtitle03" style={[styles.sectionTitle, styles.historyTitle]}>
        열어 본 자리
      </AppText>
      {mockOpenedHistory.map((group) => (
        <View key={group.dateLabel} style={styles.group}>
          <AppText variant="caption04" color="textTertiary">
            {group.dateLabel}
          </AppText>
          {group.items.map((item) => (
            <Pressable key={item.spotId} style={styles.item} onPress={() => router.push(`/map/opened/${item.spotId}`)}>
              <PhotoPlaceholder width={52} height={52} />
              <View style={styles.itemTexts}>
                <AppText variant="subtitle04">{item.oneLine}</AppText>
                <AppText variant="caption04" color="textSecondary">
                  {item.meta}
                </AppText>
              </View>
            </Pressable>
          ))}
        </View>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  tiles: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginVertical: spacing.sm,
  },
  historyTitle: {
    marginTop: spacing.xxl,
  },
  group: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  itemTexts: {
    flex: 1,
    gap: spacing.xxs,
  },
});
