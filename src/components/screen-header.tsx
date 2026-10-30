import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { spacing } from '@/constants/layout';

type ScreenHeaderProps = {
  title?: string;
  /** 가운데에 두는 것 (예: 설문 단계 '1/3', 회원가입 제목) */
  center?: ReactNode;
  /** 오른쪽 끝 (예: 건너뛰기) */
  right?: ReactNode;
  showBack?: boolean;
  /** 뒤로가기를 눌렀을 때 화면 이동 대신 할 일 (예: 설문 이전 단계) */
  onBack?: () => void;
};

export function ScreenHeader({ title, center, right, showBack = true, onBack }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack && (
          <Pressable accessibilityLabel="뒤로" hitSlop={12} onPress={onBack ?? (() => router.back())}>
            <Icon name="back" />
          </Pressable>
        )}
        {title && <AppText variant="subtitle03">{title}</AppText>}
      </View>

      {center && (
        <View style={styles.center}>
          {center}
        </View>
      )}

      <View>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  // 좌우 내용 길이와 상관없이 정확히 가운데 두려고 겹쳐 놓고, 뒤로가기·오른쪽 버튼 누르기를 막지 않게 터치는 통과시킨다
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'none',
  },
});
