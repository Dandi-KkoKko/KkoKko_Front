import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { colors } from '@/constants/colors';
import { floatingShadow, radius, spacing } from '@/constants/layout';

type NearestSpotCardProps = {
  spotId: string;
  hashtags: string[];
  distanceMeters: number;
};

/** 지도 아래 '가장 가까운 흐릿한 자리' 카드. 누르면 자리 상세로 간다. */
export function NearestSpotCard({ spotId, hashtags, distanceMeters }: NearestSpotCardProps) {
  return (
    <Pressable style={styles.card} onPress={() => router.push(`/map/spot/${spotId}`)}>
      <PhotoPlaceholder width={64} height={64} />
      <View style={styles.texts}>
        <AppText variant="caption04" color="textTertiary">
          가장 가까운 흐릿한 자리
        </AppText>
        <AppText variant="subtitle04">{hashtags.join(' ')}</AppText>
        <AppText variant="caption02" color="textSecondary">
          {distanceMeters}m · 조금 더 가까이 가 보세요
        </AppText>
      </View>
      <Icon name="forward" size={18} color="textTertiary" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    ...floatingShadow,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.background01,
  },
  texts: {
    flex: 1,
    gap: spacing.xxs,
  },
});
