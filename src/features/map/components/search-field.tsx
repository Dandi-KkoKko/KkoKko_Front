import { router } from 'expo-router';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { typography } from '@/constants/typography';

type SearchFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  /** 키보드의 검색 버튼 */
  onSubmit: () => void;
};

/** 검색 화면 맨 위: 뒤로 버튼과 검색어 입력칸. 글자가 있으면 오른쪽에 지우기 버튼이 생긴다. */
export function SearchField({ value, onChangeText, onSubmit }: SearchFieldProps) {
  return (
    <View style={styles.row}>
      <Pressable accessibilityRole="button" accessibilityLabel="뒤로" hitSlop={spacing.sm} onPress={() => router.back()}>
        <Icon name="back" />
      </Pressable>
      <View style={styles.inputBox}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          placeholder="장소나 #해시태그 검색"
          placeholderTextColor={colors.textPlaceholder}
          returnKeyType="search"
          autoFocus
          style={styles.input}
        />
        {value.length > 0 && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="검색어 지우기"
            hitSlop={spacing.xs}
            onPress={() => onChangeText('')}>
            <Icon name="close" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.background02,
  },
  input: {
    ...typography.button03,
    flex: 1,
    padding: 0,
    color: colors.textPrimary,
  },
});
