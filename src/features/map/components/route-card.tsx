import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { CardCloseButton, MapBottomCard } from '@/features/map/components/map-bottom-card';
import type { PhotoMarker } from '@/features/map/types/home-map-marker';
import type { SearchResultItem } from '@/features/map/types/search-result-item';
import { formatItemDetails } from '@/features/map/utils/to-search-result-items';

const stopNumberSize = 20;

type RouteCardProps = {
  item: SearchResultItem;
  stops: PhotoMarker[];
  isLoading: boolean;
  isExpanded: boolean;
  onExpandedChange: (isExpanded: boolean) => void;
  onClose: () => void;
  onWalk: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
};

/**
 * Figma '지도 장소 선택 시 경로 추천 UI (화면 축소 버전)'의 아래 카드.
 * 펼치면 '경로 정보 UI'(들르는 자리와 '이 길로 걷기'), 접으면 '경로·장소 정보 UI'(목적지 이름만)다.
 */
export function RouteCard({ item, stops, isLoading, isExpanded, onExpandedChange, onClose, onWalk, onLayout }: RouteCardProps) {
  const details = formatItemDetails(item);

  return (
    <MapBottomCard onLayout={onLayout} collapse={{ isExpanded, onExpandedChange, label: '경로 정보' }}>
      <View style={styles.summary}>
        <View style={styles.texts}>
          <AppText variant="heading03" numberOfLines={1}>
            {item.title}
          </AppText>
          {details.length > 0 && (
            <AppText variant="caption01" color="textTertiary" numberOfLines={1}>
              {details}
            </AppText>
          )}
        </View>
        <CardCloseButton onPress={onClose} label="경로 닫기" />
      </View>

      {isExpanded && (
        <>
          <View style={styles.divider} />
          {stops.map((stop, index) => (
            <View key={stop.id} style={styles.stop}>
              <View style={styles.stopNumber}>
                <AppText variant="caption03" color="textInverse">
                  {index + 1}
                </AppText>
              </View>
              <View style={styles.stopHashtags}>
                {stop.hashtags.map((hashtag) => (
                  <AppText key={hashtag} variant="button03">
                    {hashtag}
                  </AppText>
                ))}
              </View>
            </View>
          ))}
          <AppText variant="caption01" color="textDeactivated">
            {stops.length > 0 ? '가는 길에 취향에 맞는 자리를 찾았어요' : '가는 길에 들를 만한 자리를 찾지 못했어요'}
          </AppText>
          <Button label={isLoading ? '경로를 찾는 중' : '이 길로 걷기'} variant="primary" disabled={isLoading} onPress={onWalk} />
        </>
      )}
    </MapBottomCard>
  );
}

const styles = StyleSheet.create({
  summary: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  texts: {
    flex: 1,
    gap: spacing.xxs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderDeactivated,
  },
  stop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  stopNumber: {
    width: stopNumberSize,
    height: stopNumberSize,
    borderRadius: radius.xs / 2,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopHashtags: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: spacing.xs,
  },
});
