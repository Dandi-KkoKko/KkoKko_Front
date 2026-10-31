import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { colors } from '@/constants/colors';
import { photoShadow, radius, spacing } from '@/constants/layout';
import { mockMyRecords } from '@/mock/my-records';

/**
 * ② 기록 탭: 내 기록 상세. 사진은 앱 카메라 비율(세로 3:4) 그대로 크게 보여준다.
 * 기록 API가 나오면 id로 서버에서 불러온다.
 */
export function RecordDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const record = mockMyRecords.find((item) => item.id === id) ?? mockMyRecords[0];

  return (
    <ScreenContainer
      withBottomInset={false}
      header={
        <ScreenHeader
          title={record.title}
          right={
            <Pressable accessibilityLabel="신고하기" hitSlop={8} onPress={() => router.push(`/report/${record.id}`)}>
              <Icon name="report" size={28} />
            </Pressable>
          }
        />
      }>
      <View style={styles.photoBox}>
        <Image source={record.photo} style={styles.photo} contentFit="cover" />
        <View style={styles.heart}>
          <Icon name="heartFilled" size={32} />
        </View>
      </View>

      <View style={styles.texts}>
        <AppText variant="body01">{record.comment}</AppText>
        <AppText variant="caption02" color="textDeactivated">
          {record.dateLabel}
        </AppText>
        <View style={styles.hashtags}>
          {record.hashtags.map((hashtag) => (
            <View key={hashtag} style={styles.hashtag}>
              <AppText variant="caption02" color="textSecondary">
                {hashtag}
              </AppText>
            </View>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  photoBox: {
    aspectRatio: 3 / 4,
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
  photo: {
    flex: 1,
  },
  heart: {
    ...photoShadow,
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
  },
  texts: {
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  hashtags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  hashtag: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: radius.sm,
    backgroundColor: colors.background02,
  },
});
