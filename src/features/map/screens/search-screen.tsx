import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Chip } from '@/components/chip';
import { Icon } from '@/components/icon';
import { ScreenContainer } from '@/components/screen-container';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { typography } from '@/constants/typography';
import { SearchResultRow } from '@/features/map/components/search-result-row';
import { SearchTabs, type SearchTab } from '@/features/map/components/search-tabs';
import { mockHashtagResults, mockPlaceResults, mockRecentSearches } from '@/mock/search-results';

/**
 * 와이어프레임 ① 지도 탭: 검색.
 * 지금은 검색어와 상관없이 가짜 결과를 보여준다. 검색 API가 나오면 query로 요청한다.
 */
export function SearchScreen() {
  const [query, setQuery] = useState('정문');
  const [tab, setTab] = useState<SearchTab>('전체');

  const showPlaces = tab !== '해시태그';
  const showHashtags = tab !== '장소';

  return (
    <ScreenContainer withBottomInset={false}>
      <View style={styles.searchRow}>
        <Pressable accessibilityLabel="뒤로" hitSlop={12} onPress={() => router.back()}>
          <Icon name="back" />
        </Pressable>
        <View style={styles.inputBox}>
          <Icon name="search" size={18} color="textTertiary" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="장소나 #해시태그 검색"
            placeholderTextColor={colors.textPlaceholder}
            autoFocus
            style={styles.input}
          />
        </View>
      </View>

      <SearchTabs selected={tab} onSelect={setTab} />

      {showPlaces && (
        <View style={styles.section}>
          <SectionTitle title="장소" trailing="가까운 순" />
          {mockPlaceResults.map((place) => (
            <SearchResultRow
              key={place.id}
              kind={place.spotCount > 0 ? 'place' : 'emptyPlace'}
              title={place.name}
              subtitle={`${place.address} · ${place.distanceMeters}m`}
              query={query}
              trailing={place.spotCount > 0 ? `자리 ${place.spotCount}곳` : '아직 빈 자리'}
              onPress={() => router.push(`/map/place/${place.id}`)}
            />
          ))}
        </View>
      )}

      {showHashtags && (
        <View style={styles.section}>
          <SectionTitle title="해시태그" />
          {mockHashtagResults.map((result) => (
            <SearchResultRow
              key={result.hashtag}
              kind="hashtag"
              title={result.hashtag}
              subtitle={`이 근처 사진 ${result.photoCount}장`}
              query={query}
              onPress={() => router.back()}
            />
          ))}
        </View>
      )}

      <View style={styles.section}>
        <SectionTitle title="최근 검색" trailing="전체 삭제" />
        <View style={styles.chips}>
          {mockRecentSearches.map((item) => (
            <Chip
              key={item.label}
              label={item.label}
              icon={item.isPlace ? 'location' : undefined}
              onPress={() => setQuery(item.label)}
            />
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

function SectionTitle({ title, trailing }: { title: string; trailing?: string }) {
  return (
    <View style={styles.sectionTitle}>
      <AppText variant="subtitle03">{title}</AppText>
      {trailing && (
        <AppText variant="caption02" color="textTertiary">
          {trailing}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  inputBox: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.background02,
  },
  input: {
    ...typography.body01,
    flex: 1,
    color: colors.textPrimary,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
});
