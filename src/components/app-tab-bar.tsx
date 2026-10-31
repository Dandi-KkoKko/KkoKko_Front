import { useSegments } from 'expo-router';
import type { BottomTabBarProps } from 'expo-router/tabs';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon, type IconName } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

/** 탭 이름(app/(tabs)의 폴더)마다 Figma 탭 아이콘 */
const tabIcons: Record<string, IconName> = {
  map: 'location',
  record: 'record',
  my: 'person',
};

// GUI에서 탭 첫 화면에만 탭 바가 있고 안쪽 화면(좋아요 내역, 설정 등)에는 없는 탭.
// 지도 탭은 GUI가 화면마다 달라서 지도 담당이 정한 뒤에 추가한다.
const tabsHidingBarOnInnerScreens = ['my'];

const indicatorWidth = 32;
const indicatorHeight = spacing.xxs;

/**
 * Figma '지도 홈탭 컴포넌트'의 아래 탭 바.
 * 고른 탭은 위에 주황 막대를 달고 아이콘·글자를 검게, 나머지는 회색으로 둔다.
 */
export function AppTabBar({ state, descriptors, emitter, navigateToTab, insets }: BottomTabBarProps) {
  // 지금 주소를 조각으로 받는다. 예: /my → ['(tabs)', 'my'], /my/likes → ['(tabs)', 'my', 'likes']
  const segments = useSegments() as string[];
  const [, tabName, innerScreen] = segments;
  if (tabsHidingBarOnInnerScreens.includes(tabName) && innerScreen !== undefined) {
    return null;
  }

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const color = isFocused ? 'textPrimary' : 'textDeactivated';

        // 기본 탭 바와 같은 순서: 먼저 'tabPress'를 알려서 화면이 막을 기회를 주고, 막지 않으면 탭을 옮긴다.
        const press = () => {
          const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) navigateToTab(route.key);
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={label}
            onPress={press}
            style={styles.tab}>
            <View style={[styles.indicator, isFocused && styles.indicatorOn]} />
            <Icon name={tabIcons[route.name] ?? 'location'} color={color} />
            <AppText variant="caption03" color={color}>
              {label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.background01,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xxs,
    paddingBottom: spacing.xs,
  },
  // 고르지 않은 탭도 같은 자리를 비워 둬서, 탭을 바꿔도 아이콘 높이가 흔들리지 않게 한다.
  indicator: {
    width: indicatorWidth,
    height: indicatorHeight,
    marginBottom: spacing.xxs,
    borderBottomLeftRadius: radius.xs / 2,
    borderBottomRightRadius: radius.xs / 2,
  },
  indicatorOn: {
    backgroundColor: colors.primary,
  },
});
