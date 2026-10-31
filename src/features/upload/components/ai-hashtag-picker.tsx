import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Chip } from '@/components/chip';
import { spacing } from '@/constants/layout';

export const maxHashtagCount = 3;

type AiHashtagPickerProps = {
  suggestions: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

/**
 * AI가 한 줄을 읽고 고른 해시태그 중 최대 3개를 고른다.
 * 직접 쓰지 않고 AI 추천 안에서만 고르게 해서 한 줄과 상관없는 해시태그가 붙는 것을 막는다.
 */
export function AiHashtagPicker({ suggestions, selected, onChange }: AiHashtagPickerProps) {
  const toggle = (hashtag: string) => {
    if (selected.includes(hashtag)) {
      onChange(selected.filter((item) => item !== hashtag));
      return;
    }
    if (selected.length < maxHashtagCount) {
      onChange([...selected, hashtag]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <AppText variant="subtitle03">한 줄을 읽고 고른 해시태그</AppText>
        <AppText variant="caption03" color="textDeactivated">
          최대 {maxHashtagCount}개 선택
        </AppText>
      </View>
      <View style={styles.chips}>
        {suggestions.map((hashtag) => (
          <Chip key={hashtag} label={hashtag} selected={selected.includes(hashtag)} onPress={() => toggle(hashtag)} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
});
