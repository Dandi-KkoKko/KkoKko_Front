import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { Radio } from '@/components/radio';
import { colors } from '@/constants/colors';
import { screenPaddingX, spacing } from '@/constants/layout';
import { SheetHandle } from '@/features/map/components/sheet-handle';
import { sheetCornerRadius } from '@/features/map/constants/map-layout';
import { reportReasons, type ReportReasonId } from '@/features/map/constants/report-reasons';

type ReportSheetProps = {
  onClose: () => void;
  onSubmit: (reason: ReportReasonId) => void;
};

/**
 * Figma '지도 사진 남기기 UI'의 신고 창. 사진 카드 위로 아래에서 올라온다.
 * 이유를 하나 골라야 '신고하기'를 누를 수 있다. 신고 API가 나오면 onSubmit에서 서버로 보낸다.
 */
export function ReportSheet({ onClose, onSubmit }: ReportSheetProps) {
  const [reason, setReason] = useState<ReportReasonId | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submit = () => {
    if (!reason) return;
    onSubmit(reason);
    setIsSubmitted(true);
  };

  return (
    <View style={styles.sheet}>
      <SheetHandle />
      <View style={styles.titleRow}>
        <AppText variant="subtitle01">{isSubmitted ? '신고가 접수됐어요' : '어떤 점이 불편했나요?'}</AppText>
        <Pressable accessibilityRole="button" accessibilityLabel="신고 닫기" hitSlop={spacing.xs} onPress={onClose}>
          <Icon name="close" />
        </Pressable>
      </View>

      {isSubmitted ? (
        <>
          <AppText variant="caption01" color="textDeactivated">
            확인한 뒤 이 사진을 정리할게요. 알려 줘서 고마워요.
          </AppText>
          <Button label="닫기" variant="dark" onPress={onClose} />
        </>
      ) : (
        <>
          <AppText variant="caption01" color="textDeactivated">
            하나를 골라주세요
          </AppText>
          <View accessibilityRole="radiogroup">
            {reportReasons.map((item) => (
              <Pressable
                key={item.id}
                accessibilityRole="radio"
                accessibilityState={{ checked: reason === item.id }}
                onPress={() => setReason(item.id)}
                style={styles.reason}>
                <Radio selected={reason === item.id} size={24} />
                <AppText variant="body01">{item.label}</AppText>
              </Pressable>
            ))}
          </View>
          <Button label="신고하기" variant="dark" disabled={!reason} onPress={submit} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    gap: spacing.sm,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
    paddingHorizontal: screenPaddingX,
    borderTopLeftRadius: sheetCornerRadius,
    borderTopRightRadius: sheetCornerRadius,
    backgroundColor: colors.background01,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reason: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
});
