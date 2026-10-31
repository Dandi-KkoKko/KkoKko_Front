import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/layout';
import { SearchResultRow } from '@/features/map/components/search-result-row';
import type { SearchResultItem } from '@/features/map/types/search-result-item';

type SearchResultListProps = {
  items: SearchResultItem[];
  iconSize?: 36 | 48;
  onPress: (item: SearchResultItem) => void;
};

/** 검색결과 목록. 줄 사이에 얇은 구분선을 둔다. */
export function SearchResultList({ items, iconSize, onPress }: SearchResultListProps) {
  return (
    <View style={styles.list}>
      {items.map((item, index) => (
        <View key={item.key}>
          {index > 0 && <View style={styles.divider} />}
          <SearchResultRow
            kind={item.kind}
            title={item.title}
            address={item.address}
            distanceMeters={item.distanceMeters}
            iconSize={iconSize}
            onPress={() => onPress(item)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.xxs,
  },
  divider: {
    height: 1,
    marginBottom: spacing.xxs,
    backgroundColor: colors.borderDeactivated,
  },
});
