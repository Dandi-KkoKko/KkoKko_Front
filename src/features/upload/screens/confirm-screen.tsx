import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { IconButton } from '@/components/icon-button';
import { ScreenContainer } from '@/components/screen-container';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { DraftPhoto } from '@/features/upload/components/draft-photo';
import { UploadChecklist } from '@/features/upload/components/upload-checklist';
import { UploadStepHeader } from '@/features/upload/components/upload-step-header';
import { useUploadDraft } from '@/features/upload/upload-draft';

const locationPin = require('@/assets/icons/location-pick.svg');

/**
 * ② 기록 탭: 남기기 3/3 위치 확인.
 * 집 위치 같은 개인정보가 드러나지 않게 정확한 좌표 대신 장소 이름(반경)으로 저장한다.
 * 지도 API가 정해지면 회색 칸을 작은 지도로 바꾸고, 새로고침 버튼으로 위치를 다시 잡는다.
 * 업로드 API가 나오면 '기록 완료'에서 draft를 서버로 보낸다.
 */
export function ConfirmScreen() {
  const { draft } = useUploadDraft();

  return (
    <ScreenContainer
      header={<UploadStepHeader title="위치 확인" step={3} />}
      footer={<Button label="기록 완료" variant="primary" onPress={() => router.dismissTo('/record')} />}>
      <AppText variant="heading03" style={styles.title}>
        이 자리에 남길게요
      </AppText>

      <View style={styles.mapBox}>
        <View style={styles.reload}>
          <IconButton icon="reload" size={48} accessibilityLabel="위치 다시 찾기" />
        </View>
        <View style={styles.pin}>
          <Badge label={draft.placeLabel} tone="dark" />
          <Image source={locationPin} style={styles.pinImage} contentFit="contain" />
        </View>
      </View>

      <View style={styles.preview}>
        <DraftPhoto uri={draft.photoUri} width={100} height={100} />
        <View style={styles.previewTexts}>
          <AppText variant="subtitle02" numberOfLines={1}>
            {draft.title || '제목'}
          </AppText>
          <AppText variant="body01" numberOfLines={2}>
            {draft.oneLine || '한 줄을 아직 쓰지 않았어요'}
          </AppText>
          <AppText variant="caption04" color="textTertiary">
            {draft.hashtags.join(' ')}
          </AppText>
        </View>
      </View>

      <UploadChecklist />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: spacing.xs,
    marginBottom: spacing.xl,
  },
  mapBox: {
    height: 145,
    borderRadius: radius.lg,
    backgroundColor: colors.mapBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reload: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
  },
  pin: {
    alignItems: 'center',
  },
  // Figma location_pick은 그림자까지 포함한 크기라 핀 본체(38x45)보다 조금 크다
  pinImage: {
    width: 45,
    height: 53,
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginVertical: spacing.xl,
    padding: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderDeactivated,
  },
  previewTexts: {
    flex: 1,
  },
});
