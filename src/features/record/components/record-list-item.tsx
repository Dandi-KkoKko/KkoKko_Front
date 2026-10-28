import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Badge } from '@/components/badge';
import { Icon } from '@/components/icon';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/layout';
import type { MyRecord } from '@/mock/my-records';

/** 내 기록 한 줄: 사진, 한 줄, 해시태그, 장소·날짜. 아직 공개 전이면 안내 배지, 누가 좋아요하면 조용한 표시. */
export function RecordListItem({ record }: { record: MyRecord }) {
  return (
    <View style={styles.row}>
      <PhotoPlaceholder width={76} height={96} />
      <View style={styles.texts}>
        {record.isPending && <Badge label="2시간 뒤 다른 지도에 건네져요" tone="highlight" />}
        <AppText variant="subtitle04">{record.oneLine}</AppText>
        <AppText variant="caption02" color="textSecondary">
          {record.hashtags.join(' ')}
        </AppText>
        <AppText variant="caption02" color="textTertiary">
          {record.placeLabel} · {record.dateLabel}
        </AppText>
        {record.wasVisited && (
          <View style={styles.visited}>
            <Icon name="heart" size={12} color="textSecondary" />
            <AppText variant="caption02" color="textSecondary">
              누군가 다녀갔어요
            </AppText>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.background02,
  },
  texts: {
    flex: 1,
    gap: spacing.xxs,
  },
  visited: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
});
