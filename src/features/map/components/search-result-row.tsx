import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { formatDistance } from '@/features/map/utils/format-distance';

type SearchResultRowProps = {
  /** 장소는 핀, 해시태그는 # 아이콘 */
  kind: 'place' | 'hashtag';
  title: string;
  /** '경산시 대동' */
  address: string;
  /** 내 위치를 모르면 null */
  distanceMeters: number | null;
  /** 검색 화면(키보드가 열린 좁은 목록)은 36, 검색결과 화면은 Figma대로 48 */
  iconSize?: 36 | 48;
  onPress: () => void;
};

/** 검색결과 한 줄: 아이콘, 이름, '경산시 대동 · 520m' */
export function SearchResultRow({ kind, title, address, distanceMeters, iconSize = 36, onPress }: SearchResultRowProps) {
  const details = [address, distanceMeters !== null && formatDistance(distanceMeters)].filter(Boolean).join(' · ');

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.row}>
      <View style={[styles.icon, { width: iconSize, height: iconSize }]}>
        <Icon name={kind === 'place' ? 'location' : 'hashtag'} size={iconSize / 2} color="textTertiary" />
      </View>
      <View style={styles.texts}>
        <AppText variant="button03" numberOfLines={1}>
          {title}
        </AppText>
        {details.length > 0 && (
          <AppText variant="caption01" color="textTertiary" numberOfLines={1}>
            {details}
          </AppText>
        )}
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
    borderRadius: radius.full,
    backgroundColor: colors.background02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
  },
});
