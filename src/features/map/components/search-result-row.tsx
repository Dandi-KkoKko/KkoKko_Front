import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { HighlightedText } from '@/features/map/components/highlighted-text';

type SearchResultRowProps = {
  kind: 'place' | 'emptyPlace' | 'hashtag';
  title: string;
  subtitle: string;
  query: string;
  /** 오른쪽 끝 (자리 수 등) */
  trailing?: string;
  onPress: () => void;
};

/** 검색 결과 한 줄. 장소는 핀, 빈 자리는 점선 +, 해시태그는 # 아이콘. */
export function SearchResultRow({ kind, title, subtitle, query, trailing, onPress }: SearchResultRowProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={[styles.icon, kind === 'emptyPlace' && styles.emptyIcon, kind === 'hashtag' && styles.hashtagIcon]}>
        {kind === 'place' && <Icon name="location" size={20} />}
        {kind === 'emptyPlace' && <Icon name="plus" size={20} />}
        {kind === 'hashtag' && <AppText variant="subtitle03">#</AppText>}
      </View>

      <View style={styles.texts}>
        <HighlightedText text={title} highlight={query} />
        <AppText variant="caption02" color="textTertiary">
          {subtitle}
        </AppText>
      </View>

      {trailing && (
        <View style={kind === 'place' && styles.trailingBox}>
          <AppText variant="caption03" color={kind === 'place' ? 'textPrimary' : 'textSecondary'}>
            {trailing}
          </AppText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.background02,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.background02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    backgroundColor: colors.background01,
  },
  hashtagIcon: {
    backgroundColor: colors.selectedBackground,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  trailingBox: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: radius.sm,
    backgroundColor: colors.background02,
  },
});
