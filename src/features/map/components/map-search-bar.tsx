import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { floatingShadow, radius, spacing } from '@/constants/layout';

type MapSearchBarProps = {
  /** 검색한 장소 이름. 있으면 뒤로·닫기가 붙은 '검색 결과' 모양이 된다. */
  query?: string;
};

/** 지도 맨 위 검색창. 누르면 검색 화면으로 간다. */
export function MapSearchBar({ query }: MapSearchBarProps) {
  if (query) {
    return (
      <View style={styles.bar}>
        <Pressable accessibilityLabel="뒤로" hitSlop={12} onPress={() => router.back()}>
          <Icon name="back" size={20} />
        </Pressable>
        <AppText variant="subtitle04" style={styles.text}>
          {query}
        </AppText>
        <Pressable accessibilityLabel="검색 지우기" hitSlop={12} onPress={() => router.dismissTo('/map')}>
          <Icon name="close" size={18} color="textTertiary" />
        </Pressable>
      </View>
    );
  }

  return (
    <Pressable accessibilityRole="search" style={styles.bar} onPress={() => router.push('/map/search')}>
      <Icon name="search" size={24} color="textPlaceholder" />
      <AppText variant="button03" color="textPlaceholder" style={styles.text}>
        장소나 #해시태그 검색
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    ...floatingShadow,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.background01,
  },
  text: {
    flex: 1,
  },
});
