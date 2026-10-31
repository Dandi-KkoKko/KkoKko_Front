import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { spacing } from '@/constants/layout';
import { AiBadge } from '@/features/map/components/ai-badge';
import { MapBottomSheet } from '@/features/map/components/map-bottom-sheet';
import { RecordList } from '@/features/map/components/record-list';
import type { PhotoMarker } from '@/features/map/types/home-map-marker';

type RecordsInRangeSheetProps = {
  height: number;
  records: PhotoMarker[];
  isExpanded: boolean;
  onExpandedChange: (isExpanded: boolean) => void;
  onPressRecord: (record: PhotoMarker) => void;
};

/** 길안내 화면 아래 패널 '범위 내 기록들': 내 열림 반경 안에 남겨진 기록 목록 */
export function RecordsInRangeSheet({ height, records, isExpanded, onExpandedChange, onPressRecord }: RecordsInRangeSheetProps) {
  return (
    <MapBottomSheet
      height={height}
      isExpanded={isExpanded}
      onExpandedChange={onExpandedChange}
      label="범위 내 기록들"
      header={
        <View style={styles.titleRow}>
          <AppText variant="subtitle01">범위 내 기록들</AppText>
          <AiBadge label="AI 추천순" />
        </View>
      }>
      {records.length > 0 ? (
        <RecordList records={records} onPress={onPressRecord} />
      ) : (
        <AppText variant="caption01" color="textTertiary" style={styles.empty}>
          지금 열림 반경 안에 남겨진 기록이 없어요
        </AppText>
      )}
    </MapBottomSheet>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  empty: {
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
});
