import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

/**
 * 카메라 화면 자리. expo-camera의 CameraView를 붙이면 이 회색 칸이 실제 카메라 화면으로 바뀐다.
 * 3x3 격자선과 위치 안내는 그 위에 그대로 겹쳐 쓴다.
 */
export function CameraViewfinder({ placeLabel }: { placeLabel: string }) {
  return (
    <View style={styles.viewfinder}>
      <View style={[styles.gridLine, styles.vertical, { left: '33.3%' }]} />
      <View style={[styles.gridLine, styles.vertical, { left: '66.6%' }]} />
      <View style={[styles.gridLine, styles.horizontal, { top: '33.3%' }]} />
      <View style={[styles.gridLine, styles.horizontal, { top: '66.6%' }]} />

      <View style={styles.location}>
        <Icon name="location" size={14} color="textInverse" />
        <AppText variant="caption02" color="textInverse">
          {placeLabel} · 위치 저장 켜짐
        </AppText>
      </View>

      <AppText variant="body02" color="textInverse" style={styles.label}>
        카메라 뷰파인더
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  viewfinder: {
    flex: 1,
    backgroundColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: colors.borderStrong,
  },
  vertical: {
    top: 0,
    bottom: 0,
    width: 1,
  },
  horizontal: {
    left: 0,
    right: 0,
    height: 1,
  },
  location: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.full,
    backgroundColor: colors.textPrimary,
  },
  label: {
    opacity: 0.8,
  },
});
