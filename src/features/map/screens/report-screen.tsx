import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { Radio } from '@/components/radio';
import { ScreenContainer } from '@/components/screen-container';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/layout';
import { reportReasons, type ReportReasonId } from '@/features/map/constants/report-reasons';

/**
 * 와이어프레임 ①-B: 신고. 아래에서 올라오는 모달로 열린다.
 * 신고 API가 나오면 '신고하기'에서 자리 id와 사유를 보낸다. 지금은 닫기만 한다.
 */
export function ReportScreen() {
  const [reason, setReason] = useState<ReportReasonId | null>(null);

  return (
    <ScreenContainer
      footer={
        <>
          <Button label="신고하기" disabled={reason === null} onPress={() => router.back()} />
          <AppText variant="caption04" color="textTertiary" style={styles.center}>
            신고한 사람은 공개되지 않아요 · 로그인 사용자만 신고할 수 있어요
          </AppText>
        </>
      }>
      <View style={styles.titleRow}>
        <AppText variant="subtitle01">어떤 점이 불편했나요?</AppText>
        <Pressable accessibilityLabel="닫기" hitSlop={12} onPress={() => router.back()}>
          <Icon name="close" size={22} />
        </Pressable>
      </View>
      <AppText variant="caption04" color="textTertiary">
        하나를 골라주세요
      </AppText>

      <View style={styles.list}>
        {reportReasons.map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole="radio"
            accessibilityState={{ selected: reason === item.id }}
            style={styles.row}
            onPress={() => setReason(item.id)}>
            <Radio selected={reason === item.id} />
            <AppText variant="body01">{item.label}</AppText>
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  list: {
    marginTop: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.background02,
  },
  center: {
    textAlign: 'center',
  },
});
