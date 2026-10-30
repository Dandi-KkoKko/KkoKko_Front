import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import type { Place } from '@/features/map/types/place';
import { formatDistance } from '@/features/map/utils/format-distance';

const iconSize = 36;

type PlaceResultRowProps = {
  place: Place;
  onPress: () => void;
};

/** 검색결과 한 줄: 핀 아이콘, 장소 이름, '경산시 대동 · 520m' */
export function PlaceResultRow({ place, onPress }: PlaceResultRowProps) {
  const details = [place.shortAddress, place.distanceMeters !== null && formatDistance(place.distanceMeters)]
    .filter(Boolean)
    .join(' · ');

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.row}>
      <View style={styles.icon}>
        <Icon name="location" size={20} color="textTertiary" />
      </View>
      <View style={styles.texts}>
        <AppText variant="button03" numberOfLines={1}>
          {place.name}
        </AppText>
        <AppText variant="caption01" color="textTertiary" numberOfLines={1}>
          {details}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  icon: {
    width: iconSize,
    height: iconSize,
    borderRadius: radius.full,
    backgroundColor: colors.background02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
  },
});
