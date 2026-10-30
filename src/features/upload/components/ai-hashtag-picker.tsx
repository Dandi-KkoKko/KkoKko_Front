import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Badge } from '@/components/badge';
import { Chip } from '@/components/chip';
import { spacing } from '@/constants/layout';

export const minHashtagCount = 2;
export const maxHashtagCount = 3;

type AiHashtagPickerProps = {
  suggestions: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  onRefresh: () => void;
};

/**
 * AI가 한 줄을 읽고 고른 해시태그 중 2~3개를 고른다.
 * 직접 쓰지 않고 AI 추천 안에서만 고르게 해서 한 줄과 상관없는 해시태그가 붙는 것을 막는다.
 */
export function AiHashtagPicker({ suggestions, selected, onChange, onRefresh }: AiHashtagPickerProps) {
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
        <Badge label="AI" tone="highlight" />
        <AppText variant="subtitle03">한 줄을 읽고 고른 해시태그</AppText>
      </View>
      <AppText variant="caption04" color="textTertiary">
        {minHashtagCount}~{maxHashtagCount}개를 골라주세요 · {selected.length}개 선택됨
      </AppText>

      <View style={styles.chips}>
        {suggestions.map((hashtag) => (
          <Chip key={hashtag} label={hashtag} selected={selected.includes(hashtag)} onPress={() => toggle(hashtag)} />
        ))}
      </View>

      <Pressable hitSlop={8} onPress={onRefresh} style={styles.refresh}>
        <AppText variant="caption04" color="textSecondary" style={styles.underline}>
          다른 해시태그 추천받기
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
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
    marginTop: spacing.xs,
  },
  refresh: {
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
