import { useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { HashtagChoiceChips } from '@/features/map/components/hashtag-choice-chips';
import { CardCloseButton, MapBottomCard } from '@/features/map/components/map-bottom-card';
import type { SearchResultItem } from '@/features/map/types/search-result-item';
import type { NearbyRecordSummary } from '@/features/map/utils/summarize-nearby-records';
import { formatItemDetails } from '@/features/map/utils/to-search-result-items';

const photoSize = 72;

type RouteStartCardProps = {
  item: SearchResultItem;
  nearby: NearbyRecordSummary;
  onClose: () => void;
  onRecommend: (hashtags: string[]) => void;
  onLayout: (event: LayoutChangeEvent) => void;
};

/**
 * Figma '지도 장소 검색 시 경로 추천 UI > 장소 선택'의 아래 카드. 검색결과에서 장소를 고르면 목록 대신 뜬다.
 * 이 근처 기록의 해시태그를 골라 '경로 추천'을 누르면, 그 해시태그 자리를 지나는 산책 경로를 만들러 간다.
 */
export function RouteStartCard({ item, nearby, onClose, onRecommend, onLayout }: RouteStartCardProps) {
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const details = formatItemDetails(item);

  const toggleHashtag = (hashtag: string) =>
    setSelectedHashtags((current) =>
      current.includes(hashtag) ? current.filter((tag) => tag !== hashtag) : [...current, hashtag],
    );

  return (
    <MapBottomCard onLayout={onLayout}>
      <View style={styles.summary}>
        <PhotoPlaceholder width={photoSize} height={photoSize} style={styles.photo} />
        <View style={styles.texts}>
          <AppText variant="heading03" numberOfLines={1}>
            {item.title}
          </AppText>
          {details.length > 0 && (
            <AppText variant="caption02" color="textTertiary" numberOfLines={1}>
              {details}
            </AppText>
          )}
          <AppText variant="button03" color="primary">
            이 근처 남겨진 기록 {nearby.recordCount}곳
          </AppText>
        </View>
        <CardCloseButton onPress={onClose} />
      </View>

      <View style={styles.divider} />

      {nearby.hashtags.length > 0 && (
        <HashtagChoiceChips hashtags={nearby.hashtags} selected={selectedHashtags} onToggle={toggleHashtag} />
      )}
      <AppText variant="caption01" color="textDeactivated">
        {'원하는 해시태그를 선택하고 경로 추천을 누르면\n현재 위치를 기반으로 산책 경로를 생성해요'}
      </AppText>
      <Button label="경로 추천" variant="primary" onPress={() => onRecommend(selectedHashtags)} />
    </MapBottomCard>
  );
}

const styles = StyleSheet.create({
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  photo: {
    borderRadius: radius.sm,
  },
  texts: {
    flex: 1,
    gap: spacing.xxs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderDeactivated,
  },
});
