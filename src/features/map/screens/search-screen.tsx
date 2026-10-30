import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { floatingShadow, radius, screenPaddingX, spacing } from '@/constants/layout';
import { PlaceResultRow } from '@/features/map/components/place-result-row';
import { RecentSearchChips } from '@/features/map/components/recent-search-chips';
import { SearchField } from '@/features/map/components/search-field';
import { useMyLocation } from '@/features/map/hooks/use-my-location';
import { usePlaceSearch } from '@/features/map/hooks/use-place-search';
import { useRecentSearches } from '@/features/map/hooks/use-recent-searches';
import type { Place } from '@/features/map/types/place';

/**
 * Figma '지도 검색 화면 UI'. 지도 홈 위에 흰 검색 창을 덮는다 (투명 모달이라 아래로 지도가 보인다).
 * 장소는 카카오 로컬 API로 찾고, 내 위치를 알면 가까운 곳을 앞에 두고 거리를 함께 보여준다.
 * 검색창 아래 빈 지도를 누르면 검색을 닫는다.
 */
export function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const { location } = useMyLocation();
  const { places, errorMessage } = usePlaceSearch(query, location);
  const { recentSearches, addRecentSearch, removeRecentSearch } = useRecentSearches();

  const openPlace = (place: Place) => {
    addRecentSearch(place.name);
    router.push({
      pathname: '/map/place/[id]',
      params: {
        id: place.id,
        name: place.name,
        address: place.shortAddress,
        latitude: String(place.coordinate.latitude),
        longitude: String(place.coordinate.longitude),
      },
    });
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.panel, { paddingTop: insets.top + spacing.xs }]}>
        <SearchField value={query} onChangeText={setQuery} onSubmit={() => addRecentSearch(query)} />

        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
          <RecentSearchChips keywords={recentSearches} onSelect={setQuery} onRemove={removeRecentSearch} />

          {errorMessage && (
            <AppText variant="caption01" color="textTertiary">
              {errorMessage}
            </AppText>
          )}

          {places.length > 0 && (
            <View style={styles.results}>
              <AppText variant="button03" style={styles.resultsTitle}>
                검색결과
              </AppText>
              {places.map((place, index) => (
                <View key={place.id}>
                  {index > 0 && <View style={styles.divider} />}
                  <PlaceResultRow place={place} onPress={() => openPlace(place)} />
                </View>
              ))}
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
  results: {
    gap: spacing.xxs,
  },
  resultsTitle: {
    marginBottom: spacing.sm,
  },
  divider: {
    height: 1,
    marginBottom: spacing.xxs,
    backgroundColor: colors.borderDeactivated,
  },
  backdrop: {
    flex: 1,
  },
});
