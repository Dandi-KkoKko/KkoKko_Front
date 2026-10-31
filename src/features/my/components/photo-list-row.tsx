import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import type { MySpotItem } from '@/mock/my-activity';

type PhotoListRowProps = {
  item: MySpotItem;
  onPress: () => void;
  /** 오른쪽 위 (예: 좋아요 하트) */
  right?: ReactNode;
};

/** Figma list_s. 좋아요 내역·연 자리 기록에서 쓰는 사진 한 줄. */
export function PhotoListRow({ item, onPress, right }: PhotoListRowProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.row}>
      <Image source={item.photo} style={styles.photo} contentFit="cover" />
      <View style={styles.texts}>
        <AppText variant="subtitle03" numberOfLines={1}>
          {item.title}
        </AppText>
        <AppText variant="caption02" color="textTertiary" numberOfLines={1}>
          {item.hashtags.join(' ')}
        </AppText>
      </View>
      {right}
    </Pressable>
  );
}

/** 목록 줄 사이 구분선 */
export function ListDivider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  photo: {
    width: 64,
    height: 64,
    borderRadius: radius.sm,
  },
  texts: {
    flex: 1,
    gap: spacing.xxs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.disabledBackground,
  },
});
