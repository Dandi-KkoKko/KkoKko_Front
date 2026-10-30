import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Badge } from '@/components/badge';
import { MapPlaceholder } from '@/components/map-placeholder';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import type { MapArea } from '@/types/map-area';

type AreaMapViewProps = {
  areas: MapArea[];
  selectedAreaId: string | null;
  onSelectArea: (areaId: string | null) => void;
};

const maxVisibleAreas = 4;

/**
 * 구역별 사진을 올린 정적 지도 (내 기록, 좋아요 내역의 '지도' 보기).
 * 움직이지 않는 지도에 사진을 최대 4개만 올린다. 흐린 사진과 드래그가 한 화면에 겹치면 난잡해서다.
 * 마커를 누르면 그 구역의 사진만 아래에 보여준다.
 */
export function AreaMapView({ areas, selectedAreaId, onSelectArea }: AreaMapViewProps) {
  const selectedArea = areas.find((area) => area.id === selectedAreaId);

  return (
    <View style={styles.container}>
      <View style={styles.mapBox}>
        <MapPlaceholder>
          {areas.slice(0, maxVisibleAreas).map((area) => {
            const isSelected = area.id === selectedAreaId;
            return (
              <Pressable
                key={area.id}
                accessibilityLabel={`${area.name} ${area.count}개`}
                style={[styles.marker, area.position]}
                onPress={() => onSelectArea(isSelected ? null : area.id)}>
                <PhotoPlaceholder width={48} height={48} highlighted={isSelected} />
                <View style={styles.count}>
                  <AppText variant="caption03" color="textInverse">
                    {area.count}
                  </AppText>
                </View>
              </Pressable>
            );
          })}
          <Badge label="정적 지도 · 사진 최대 4개" style={styles.caption} />
        </MapPlaceholder>
      </View>

      {selectedArea ? (
        <View style={styles.selected}>
          <View style={styles.selectedHeader}>
            <AppText variant="subtitle03">
              {selectedArea.name} · {selectedArea.count}개
            </AppText>
            <Pressable hitSlop={8} onPress={() => onSelectArea(null)}>
              <AppText variant="caption04" color="textTertiary">
                선택 해제
              </AppText>
            </Pressable>
          </View>
          <View style={styles.photos}>
            {selectedArea.hashtags.map((hashtag) => (
              <View key={hashtag} style={styles.photoItem}>
                <PhotoPlaceholder width="100%" height={140} />
                <AppText variant="caption04">{hashtag}</AppText>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <AppText variant="caption02" color="textTertiary" style={styles.hint}>
          지도의 사진을 누르면 그 구역 사진이 여기에 보여요
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
  },
  mapBox: {
    height: 300,
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
  marker: {
    position: 'absolute',
  },
  count: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 20,
    height: 20,
    paddingHorizontal: spacing.xxs,
    borderRadius: radius.full,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    position: 'absolute',
    right: spacing.sm,
    bottom: spacing.sm,
  },
  selected: {
    gap: spacing.sm,
  },
  selectedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photos: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  photoItem: {
    flex: 1,
    gap: spacing.xxs,
  },
  hint: {
    textAlign: 'center',
  },
});
