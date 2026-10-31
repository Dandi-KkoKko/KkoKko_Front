import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

type SearchQueryBarProps = {
  query: string;
};

/**
 * 검색결과 화면 맨 위: 뒤로 버튼과 검색어. 검색 화면의 입력칸과 같은 모양이지만 글자를 고칠 수는 없다.
 * 검색어를 누르면 검색 화면으로 돌아가 이어서 고치고, X를 누르면 검색을 닫고 지도 홈으로 간다.
 */
export function SearchQueryBar({ query }: SearchQueryBarProps) {
  return (
    <View style={styles.row}>
      <Pressable accessibilityRole="button" accessibilityLabel="뒤로" hitSlop={spacing.sm} onPress={() => router.back()}>
        <Icon name="back" />
      </Pressable>
      <Pressable accessibilityRole="search" accessibilityLabel="검색어 고치기" onPress={() => router.back()} style={styles.box}>
        <AppText variant="button03" numberOfLines={1} style={styles.query}>
          {query}
        </AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="검색 닫기"
          hitSlop={spacing.xs}
          onPress={() => router.dismissTo('/map')}>
          <Icon name="close" />
        </Pressable>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.background02,
  },
  query: {
    flex: 1,
  },
});
