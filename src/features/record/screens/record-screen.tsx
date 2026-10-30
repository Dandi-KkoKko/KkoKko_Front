import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { AreaMapView } from '@/components/area-map-view';
import { Button } from '@/components/button';
import { ScreenContainer } from '@/components/screen-container';
import { SegmentedToggle } from '@/components/segmented-toggle';
import { spacing } from '@/constants/layout';
import { RecordListItem } from '@/features/record/components/record-list-item';
import { mockMyRecordAreas, mockMyRecords, mockMyRecordSummary } from '@/mock/my-records';

const viewModes = ['리스트', '지도'] as const;
type ViewMode = (typeof viewModes)[number];

/**
 * 와이어프레임 ② 기록 탭: 내 기록. 지도가 비어 있어도 혼자 쓸 이유가 되도록 내가 남긴 자리를 모아 본다.
 * 리스트와 정적 지도 두 가지로 볼 수 있다.
 */
export function RecordScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('리스트');
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const isList = viewMode === '리스트';

  return (
    <ScreenContainer
      withBottomInset={false}
      footer={
        isList && (
          <Button
            label="지금 이 자리 남기기"
            icon="camera"
            variant="primary"
            onPress={() => router.push('/upload/camera')}
          />
        )
      }>
      <View style={styles.header}>
        <AppText variant="heading02">내 기록</AppText>
        <SegmentedToggle options={viewModes} selected={viewMode} onSelect={setViewMode} />
      </View>
      <AppText variant="caption02" color="textTertiary" style={styles.summary}>
        남긴 자리 <AppText variant="caption03">{mockMyRecordSummary.totalCount}곳</AppText>
        {isList ? ` · 이번 주 ${mockMyRecordSummary.thisWeekCount}곳` : ' · 마커를 누르면 그 영역 기록만 보여요'}
      </AppText>

      {isList ? (
        mockMyRecords.map((record) => <RecordListItem key={record.id} record={record} />)
      ) : (
        <AreaMapView areas={mockMyRecordAreas} selectedAreaId={selectedAreaId} onSelectArea={setSelectedAreaId} />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  summary: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
});
