import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/layout';

export type SearchTab = 'place' | 'hashtag';

const tabLabels: Record<SearchTab, string> = { place: '장소', hashtag: '해시태그' };

type SearchTabsProps = {
  /** 검색어 종류에 맞는 탭을 앞에 둔다 (Figma: '#' 검색이면 해시태그가 먼저) */
  order: SearchTab[];
  selected: SearchTab;
  onSelect: (tab: SearchTab) => void;
};

/** 검색결과 화면의 장소 / 해시태그 탭. 고른 탭 아래에 검은 밑줄을 긋는다. */
export function SearchTabs({ order, selected, onSelect }: SearchTabsProps) {
  return (
    <View style={styles.row} accessibilityRole="tablist">
      {order.map((tab) => {
        const isSelected = tab === selected;
        return (
          <Pressable
            key={tab}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(tab)}
            style={[styles.tab, isSelected && styles.selectedTab]}>
            <AppText variant="button03" color={isSelected ? 'textPrimary' : 'textDeactivated'}>
              {tabLabels[tab]}
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
    gap: spacing.sm,
  },
  tab: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedTab: {
    borderBottomColor: colors.textPrimary,
  },
});
