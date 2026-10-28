import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/layout';

export const searchTabs = ['전체', '장소', '해시태그'] as const;
export type SearchTab = (typeof searchTabs)[number];

type SearchTabsProps = {
  selected: SearchTab;
  onSelect: (tab: SearchTab) => void;
};

/** 검색 결과 종류 탭 (전체 / 장소 / 해시태그) */
export function SearchTabs({ selected, onSelect }: SearchTabsProps) {
  return (
    <View style={styles.row}>
      {searchTabs.map((tab) => {
        const isSelected = tab === selected;
        return (
          <Pressable
            key={tab}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(tab)}
            style={[styles.tab, isSelected && styles.selectedTab]}>
            <AppText variant="button03" color={isSelected ? 'textPrimary' : 'textTertiary'}>
              {tab}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.disabledBackground,
  },
  tab: {
    paddingVertical: spacing.sm,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.textPrimary,
  },
});
