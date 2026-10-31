import { router } from 'expo-router';
import { Fragment, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { AreaMapView } from '@/components/area-map-view';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { SegmentedToggle } from '@/components/segmented-toggle';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/layout';
import { RecordListItem } from '@/features/record/components/record-list-item';
import { mockMyRecordAreas, mockMyRecords, mockMyRecordSummary } from '@/mock/my-records';

const viewModes = ['리스트', '지도'] as const;
type ViewMode = (typeof viewModes)[number];

/**
 * ② 기록 탭: 내 기록. 지도가 비어 있어도 혼자 쓸 이유가 되도록 내가 남긴 자리를 모아 본다.
 * 새로 남기기는 지도의 카메라 버튼에서 시작한다. '지도' 보기는 Figma에서 보류라 회색 지도를 그대로 둔다.
 */
export function RecordScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('리스트');
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);

  return (
    <ScreenContainer
      withBottomInset={false}
      header={
        <ScreenHeader
          title="내 기록"
          showBack={false}
          right={<SegmentedToggle options={viewModes} selected={viewMode} onSelect={setViewMode} />}
        />
      }>
      <View style={styles.summary}>
        <AppText variant="caption02" color="textTertiary">
          남긴 자리
        </AppText>
        <AppText variant="caption01">{mockMyRecordSummary.totalCount}곳</AppText>
      </View>

      {viewMode === '리스트' ? (
        <View>
          {mockMyRecords.map((record, index) => (
            <Fragment key={record.id}>
              {index > 0 && <View style={styles.divider} />}
              <RecordListItem record={record} onPress={() => router.push(`/record/${record.id}`)} />
            </Fragment>
          ))}
        </View>
      ) : (
        <AreaMapView areas={mockMyRecordAreas} selectedAreaId={selectedAreaId} onSelectArea={setSelectedAreaId} />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  summary: {
    flexDirection: 'row',
    gap: spacing.xxs,
    marginBottom: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.disabledBackground,
  },
});
