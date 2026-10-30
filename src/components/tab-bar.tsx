import type { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon, type IconName } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

// expo-router가 tabBar에 넘겨주는 값의 모양 (react-navigation 타입을 직접 가져오지 않으려고 Tabs에서 꺼낸다)
type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const tabIcons: Record<string, IconName> = {
  map: 'location',
  record: 'record',
  my: 'person',
};

/** Figma 홈탭 navigation_bar. 고른 탭 위에 주황 막대, 아이콘·글자는 검정, 나머지는 회색. */
export function TabBar({ state, descriptors, navigateToTab, insets }: TabBarProps) {
  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom + spacing.xs }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const label = descriptors[route.key].options.title ?? route.name;
        const color = isFocused ? 'textPrimary' : 'textDeactivated';

        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={label}
            onPress={() => !isFocused && navigateToTab(route.key)}
            style={styles.tab}>
            <View style={[styles.indicator, isFocused && styles.activeIndicator]} />
            <Icon name={tabIcons[route.name] ?? 'location'} color={isFocused ? undefined : 'textDeactivated'} />
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
    borderTopWidth: 1,
    borderTopColor: colors.background02,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xxs,
  },
  indicator: {
    width: 32,
    height: 4,
    marginBottom: spacing.xs,
    borderBottomLeftRadius: radius.xs / 2,
    borderBottomRightRadius: radius.xs / 2,
  },
  activeIndicator: {
    backgroundColor: colors.primary,
  },
});
