import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { floatingShadow, radius, screenPaddingX, spacing } from '@/constants/layout';
import { RecentSearchChips } from '@/features/map/components/recent-search-chips';
import { SearchField } from '@/features/map/components/search-field';
import { SearchResultList } from '@/features/map/components/search-result-list';
import { useMyLocation } from '@/features/map/hooks/use-my-location';
import { useRecentSearches } from '@/features/map/hooks/use-recent-searches';
import { useSearchResults } from '@/features/map/hooks/use-search-results';
import type { SearchResultItem } from '@/features/map/types/search-result-item';
import { openSearchResults } from '@/features/map/utils/open-search-result';

/**
 * Figma '지도 검색 화면 UI'. 지도 홈 위에 흰 검색 창을 덮는다 (투명 모달이라 아래로 지도가 보인다).
 * 글자를 치는 동안 결과를 바로 보여주고 ('#'으로 시작하면 해시태그, 아니면 장소), 키보드의 검색을 누르면 검색결과 화면으로 간다.
 * 결과 하나를 누르면 검색결과 화면을 그 결과를 고른 상태(경로 추천 카드)로 연다.
 * 검색창 아래 빈 지도를 누르면 검색을 닫는다.
 */
export function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const { location } = useMyLocation();
  const search = useSearchResults(query, location);
  const { recentSearches, addRecentSearch, removeRecentSearch } = useRecentSearches();

  const items = search.isHashtagQuery ? search.hashtagItems : search.placeItems;
  const errorMessage = search.isHashtagQuery ? null : search.placeErrorMessage;

  const submit = () => {
    const keyword = query.trim();
    if (!keyword) return;
    addRecentSearch(keyword);
    openSearchResults(keyword);
  };

  const openItem = (item: SearchResultItem) => {
    addRecentSearch(item.kind === 'place' ? item.title : query);
    openSearchResults(query.trim(), item.key);
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.panel, { paddingTop: insets.top + spacing.xs }]}>
        <SearchField value={query} onChangeText={setQuery} onSubmit={submit} />

        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
          <RecentSearchChips keywords={recentSearches} onSelect={setQuery} onRemove={removeRecentSearch} />

          {errorMessage && (
            <AppText variant="caption01" color="textTertiary">
              {errorMessage}
            </AppText>
          )}

          {items.length > 0 && (
            <View>
              <AppText variant="button03" style={styles.resultsTitle}>
                검색결과
              </AppText>
              <SearchResultList items={items} onPress={openItem} />
            </View>
          )}
        </ScrollView>
      </View>

      <Pressable accessibilityLabel="검색 닫기" style={styles.backdrop} onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  panel: {
    ...floatingShadow,
    // 결과가 많아도 아래 지도가 조금은 보여서 눌러 닫을 수 있게 한다.
    maxHeight: '75%',
    paddingHorizontal: screenPaddingX,
    paddingBottom: spacing.xs,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    backgroundColor: colors.background01,
  },
  content: {
    gap: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xs,
  },
  resultsTitle: {
    marginBottom: spacing.sm,
  },
  backdrop: {
    flex: 1,
  },
});
