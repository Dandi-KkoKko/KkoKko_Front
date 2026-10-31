import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

type HashtagChoiceChipsProps = {
  hashtags: string[];
  selected: string[];
  onToggle: (hashtag: string) => void;
};

/**
 * 산책 경로에 담고 싶은 해시태그를 여러 개 고르는 칩.
 * Figma에는 고른 모습이 없어서, 앱의 강조색(주황 테두리·연한 주황 배경)으로 고른 칩을 구분한다.
 */
export function HashtagChoiceChips({ hashtags, selected, onToggle }: HashtagChoiceChipsProps) {
  return (
    <View style={styles.chips}>
      {hashtags.map((hashtag) => {
        const isSelected = selected.includes(hashtag);
        return (
          <Pressable
            key={hashtag}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: isSelected }}
            onPress={() => onToggle(hashtag)}
            style={[styles.chip, isSelected && styles.selectedChip]}>
            <AppText variant="caption01" color={isSelected ? 'primary' : 'textPrimary'}>
              {hashtag}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderDeactivated,
    borderRadius: radius.full,
    backgroundColor: colors.background01,
  },
  selectedChip: {
    borderColor: colors.primary,
    backgroundColor: colors.selectedBackground,
  },
});
