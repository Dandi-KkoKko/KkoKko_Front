import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { floatingShadow, radius, spacing } from '@/constants/layout';

export type SortOrder = 'distance' | 'relevance';

const sortLabels: Record<SortOrder, string> = { distance: '가까운순', relevance: '정확도순' };
const sortOrders: SortOrder[] = ['distance', 'relevance'];

type SortMenuProps = {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
};

/** '가까운순 ⌄' 정렬 버튼. 누르면 아래로 고를 수 있는 순서가 펼쳐진다. 펼치면 화살표가 위를 본다. */
export function SortMenu({ value, onChange }: SortMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const choose = (next: SortOrder) => {
    onChange(next);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`정렬: ${sortLabels[value]}`}
        accessibilityState={{ expanded: isOpen }}
        onPress={() => setIsOpen(!isOpen)}
        style={styles.button}>
        <AppText variant="caption01" color="textTertiary">
          {sortLabels[value]}
        </AppText>
        <View style={isOpen && styles.arrowUp}>
          <Icon name="chevronDown" size={16} color="textTertiary" />
        </View>
      </Pressable>

      {isOpen && (
        <View style={styles.menu}>
          {sortOrders.map((order) => (
            <Pressable
              key={order}
              accessibilityRole="menuitem"
              accessibilityState={{ selected: order === value }}
              onPress={() => choose(order)}
              style={styles.menuItem}>
              <AppText variant={order === value ? 'button04' : 'caption01'} color={order === value ? 'textPrimary' : 'textTertiary'}>
                {sortLabels[order]}
              </AppText>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.sm,
    backgroundColor: colors.disabledBackground,
  },
  arrowUp: {
    transform: [{ rotate: '180deg' }],
  },
  menu: {
    ...floatingShadow,
    position: 'absolute',
    top: '100%',
    marginTop: spacing.xxs,
    paddingVertical: spacing.xxs,
    borderRadius: radius.sm,
    backgroundColor: colors.background01,
  },
  menuItem: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
});
