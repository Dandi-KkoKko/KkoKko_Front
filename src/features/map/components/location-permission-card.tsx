import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { floatingShadow, radius, spacing } from '@/constants/layout';

type LocationPermissionCardProps = {
  onRequest: () => void;
  onBrowse: () => void;
};

/** 위치 권한이 없을 때 지도 위를 흐리게 덮고 띄우는 안내 */
export function LocationPermissionCard({ onRequest, onBrowse }: LocationPermissionCardProps) {
  return (
    <View style={styles.dim}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Icon name="location" size={26} />
        </View>
        <AppText variant="heading03" style={styles.center}>
          {'위치를 켜야\n다가갈 수 있어요'}
        </AppText>
        <AppText variant="body02" color="textSecondary" style={styles.center}>
          {'가까이 걸어가야 사진이 열리는 지도라서,\n지금 내 위치가 필요해요.'}
        </AppText>
        <Button label="위치 권한 켜기" variant="primary" onPress={onRequest} style={styles.button} />
        <Pressable hitSlop={8} onPress={onBrowse}>
          <AppText variant="button03">먼저 둘러보기</AppText>
        </Pressable>
        <AppText variant="caption04" color="textTertiary" style={styles.center}>
          둘러보기에서는 맛보기 사진과 해시태그만 보여요
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.dimWhite,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  card: {
    ...floatingShadow,
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.xl,
    borderRadius: radius.xl,
    backgroundColor: colors.background01,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: radius.full,
    backgroundColor: colors.selectedBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    textAlign: 'center',
  },
  button: {
    alignSelf: 'stretch',
  },
});
