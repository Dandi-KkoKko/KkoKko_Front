import { router } from 'expo-router';
import { Fragment, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { AreaMapView } from '@/components/area-map-view';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { SegmentedToggle } from '@/components/segmented-toggle';
import { spacing } from '@/constants/layout';
import { ListDivider, PhotoListRow } from '@/features/my/components/photo-list-row';
import { mockLikedAreas, mockOpenedHistory } from '@/mock/my-activity';

const viewModes = ['리스트', '지도'] as const;
type ViewMode = (typeof viewModes)[number];

/**
 * ③ 마이 탭: 연 자리 기록. 순위·공개 경쟁 없이 날짜별로 내가 연 자리만 모아 둔다.
 * '지도' 보기는 Figma에서 보류라 와이어프레임 회색 지도를 그대로 두고, 구역 예시는 좋아요 내역 것을 같이 쓴다.
 */
export function OpenedHistoryScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('리스트');
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);

  return (
    <ScreenContainer
      withBottomInset={false}
      header={
        <ScreenHeader
          title="연 자리 기록"
          right={<SegmentedToggle options={viewModes} selected={viewMode} onSelect={setViewMode} />}
        />
      }>
      {viewMode === '리스트' ? (
        <View style={styles.groups}>
          {mockOpenedHistory.map((group) => (
            <View key={group.dateLabel} style={styles.group}>
              <AppText variant="caption02" color="textTertiary">
                {group.dateLabel}
              </AppText>
              <View>
                {group.items.map((item, index) => (
                  <Fragment key={item.spotId}>
                    {index > 0 && <ListDivider />}
                    <PhotoListRow item={item} onPress={() => router.push(`/map/opened/${item.spotId}`)} />
                  </Fragment>
                ))}
              </View>
            </View>
          ))}
        </View>
      ) : (
        <AreaMapView areas={mockLikedAreas} selectedAreaId={selectedAreaId} onSelectArea={setSelectedAreaId} />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  groups: {
    gap: spacing.xl,
  },
  group: {
    gap: spacing.xxs,
  },
});
