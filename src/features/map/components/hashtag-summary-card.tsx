import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';

import { AppText } from '@/components/app-text';
import { spacing } from '@/constants/layout';
import { CardCloseButton, MapBottomCard } from '@/features/map/components/map-bottom-card';
import type { SearchResultItem } from '@/features/map/types/search-result-item';
import { formatItemDetails, getItemLabel } from '@/features/map/utils/to-search-result-items';

type HashtagSummaryCardProps = {
  item: SearchResultItem;
  nearbyRecordCount: number;
  onClose: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
};

/**
 * Figma '지도 장소 검색 시 경로 추천 UI > 해시태그 선택'의 아래 카드. 검색결과에서 해시태그를 고르면 목록 대신 뜬다.
 * Figma대로 해시태그 이름, 동네·거리, 근처 기록 수만 보여주고 경로 추천 버튼은 두지 않는다.
 */
export function HashtagSummaryCard({ item, nearbyRecordCount, onClose, onLayout }: HashtagSummaryCardProps) {
  const details = formatItemDetails(item);

  return (
    <MapBottomCard onLayout={onLayout}>
      <View style={styles.row}>
        <View style={styles.texts}>
          <AppText variant="heading03" numberOfLines={1}>
            {getItemLabel(item)}
          </AppText>
          {details.length > 0 && (
            <AppText variant="caption01" color="textTertiary" numberOfLines={1}>
              {details}
            </AppText>
          )}
        </View>
        <CardCloseButton onPress={onClose} />
      </View>
      <AppText variant="button03" color="primary">
        이 근처 남겨진 기록 {nearbyRecordCount}곳
      </AppText>
    </MapBottomCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  texts: {
    flex: 1,
    gap: spacing.xxs,
  },
});
