import { ScrollView, StyleSheet } from 'react-native';

import { Chip } from '@/components/chip';
import { spacing } from '@/constants/layout';

const allLabel = '전체';

type HashtagFilterProps = {
  hashtags: string[];
  selected: string;
  onSelect: (hashtag: string) => void;
};

/** 지도 검색창 아래 해시태그 필터. '전체'는 필터를 끈다. */
export function HashtagFilter({ hashtags, selected, onSelect }: HashtagFilterProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {[allLabel, ...hashtags].map((hashtag) => (
        <Chip key={hashtag} label={hashtag} selected={selected === hashtag} onPress={() => onSelect(hashtag)} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.xs,
  },
});
