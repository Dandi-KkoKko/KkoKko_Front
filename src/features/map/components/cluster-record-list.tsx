import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import type { ClusterRecord } from '@/features/map/constants/preview-cluster';

type ClusterRecordListProps = {
  records: ClusterRecord[];
  onPress: (record: ClusterRecord) => void;
};

const thumbnailSize = 36;

/** 묶음에 들어 있는 기록 목록: 작은 사진, 해시태그, 오른쪽 화살표. 줄 사이에 얇은 구분선을 둔다. */
export function ClusterRecordList({ records, onPress }: ClusterRecordListProps) {
  return (
    <View>
      {records.map((record, index) => (
        <View key={record.id}>
          {index > 0 && <View style={styles.divider} />}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={record.hashtags.join(' ')}
            onPress={() => onPress(record)}
            style={styles.row}>
            <PhotoPlaceholder width={thumbnailSize} height={thumbnailSize} style={styles.thumbnail} />
            <View style={styles.hashtags}>
              {record.hashtags.map((hashtag) => (
                <AppText key={hashtag} variant="button03" color="textSecondary">
                  {hashtag}
                </AppText>
              ))}
            </View>
            <Icon name="forward" size={24} color="textDeactivated" />
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  thumbnail: {
    borderRadius: radius.sm,
  },
  hashtags: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderDeactivated,
  },
});
