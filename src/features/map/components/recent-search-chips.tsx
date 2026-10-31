import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

type RecentSearchChipsProps = {
  keywords: string[];
  onSelect: (keyword: string) => void;
  onRemove: (keyword: string) => void;
};

/**
 * '최근 검색기록' 칩 줄. 칩을 누르면 다시 검색하고, X를 누르면 그 기록만 지운다.
 * 공통 Chip에는 따로 누르는 X가 없어서 이 화면 전용으로 만들었다.
 */
export function RecentSearchChips({ keywords, onSelect, onRemove }: RecentSearchChipsProps) {
  if (keywords.length === 0) return null;

  return (
    <View style={styles.section}>
      <AppText variant="button03">최근 검색기록</AppText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.chips}>
          {keywords.map((keyword) => (
            <View key={keyword} style={styles.chip}>
              <Pressable accessibilityRole="button" onPress={() => onSelect(keyword)}>
                <AppText variant="caption01">{keyword}</AppText>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${keyword} 기록 지우기`}
                hitSlop={spacing.xs}
                onPress={() => onRemove(keyword)}>
                <Icon name="close" size={16} color="textDeactivated" />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.xs,
  },
  chips: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderDeactivated,
    borderRadius: radius.full,
    backgroundColor: colors.background01,
  },
});
