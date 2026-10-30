import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';

import { AppText } from '@/components/app-text';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { radius, spacing } from '@/constants/layout';
import { CardCloseButton, MapBottomCard } from '@/features/map/components/map-bottom-card';
import type { PhotoMarker } from '@/features/map/types/home-map-marker';
import { formatDistance } from '@/features/map/utils/format-distance';

const photoSize = 72;

type RecordPlaceCardProps = {
  record: PhotoMarker;
  hashtag: string;
  regionName: string;
  /** 내 위치를 모르면 null */
  distanceMeters: number | null;
  onClose: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
};

/**
 * Figma '지도 해시태그 선택 시 경로 추천 UI (화면 축소 버전) > 해시태그 표시'의 아래 카드.
 * 해시태그 결과에서 기록 핀 하나를 누르면, 그 기록이 남겨진 장소와 고른 해시태그를 보여준다.
 */
export function RecordPlaceCard({ record, hashtag, regionName, distanceMeters, onClose, onLayout }: RecordPlaceCardProps) {
  const details = [regionName, distanceMeters !== null && `내 위치에서 ${formatDistance(distanceMeters)}`]
    .filter(Boolean)
    .join(' · ');

  return (
    <MapBottomCard onLayout={onLayout}>
      <View style={styles.row}>
        <PhotoPlaceholder width={photoSize} height={photoSize} style={styles.photo} />
        <View style={styles.texts}>
          <AppText variant="heading03" numberOfLines={1}>
            {record.placeName ?? regionName}
          </AppText>
          {details.length > 0 && (
            <AppText variant="caption01" color="textTertiary" numberOfLines={1}>
              {details}
            </AppText>
          )}
          <AppText variant="button03" color="primary">
            {hashtag}
          </AppText>
        </View>
        <CardCloseButton onPress={onClose} label="기록 닫기" />
      </View>
    </MapBottomCard>
  );
}

const styles = StyleSheet.create({
  row: {
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
});
