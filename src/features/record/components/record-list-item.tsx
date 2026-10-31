import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { radius, spacing } from '@/constants/layout';
import type { MyRecord } from '@/mock/my-records';

type RecordListItemProps = {
  record: MyRecord;
  onPress: () => void;
};

/** 내 기록 한 줄 (Figma list): 사진, 제목, 한 줄, 해시태그, 날짜, 받은 좋아요 수 */
export function RecordListItem({ record, onPress }: RecordListItemProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.row}>
      <Image source={record.photo} style={styles.photo} contentFit="cover" />
      <View style={styles.body}>
        <View style={styles.top}>
          <View style={styles.texts}>
            <AppText variant="subtitle02" numberOfLines={1}>
              {record.title}
            </AppText>
            <AppText variant="body01" numberOfLines={1}>
              {record.comment}
            </AppText>
            <AppText variant="caption02" color="textTertiary" style={styles.hashtags}>
              {record.hashtags.join(' ')}
            </AppText>
          </View>
          <AppText variant="caption02" color="textDeactivated" style={styles.date}>
            {record.dateLabel}
          </AppText>
        </View>
        <View style={styles.likes}>
          <Icon name="heartSmall" size={16} color="textDeactivated" />
          <AppText variant="caption02" color="textDeactivated">
            {record.likeCount}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: radius.md,
  },
  // 좋아요 수를 사진 아래쪽 끝에 맞추려고 위·아래로 벌린다
  body: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacing.xxs,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  texts: {
    flex: 1,
  },
  hashtags: {
    marginTop: spacing.xxs,
  },
  date: {
    paddingLeft: spacing.xs,
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: spacing.xxs,
  },
});
