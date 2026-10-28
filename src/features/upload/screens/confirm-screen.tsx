import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { MapPlaceholder } from '@/components/map-placeholder';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { UploadChecklist } from '@/features/upload/components/upload-checklist';
import { useUploadDraft } from '@/features/upload/upload-draft';

const radiusCircleSize = 96;

/**
 * 와이어프레임 ② 기록 탭: 남기기 3/3 위치 확인.
 * 집 위치 같은 개인정보가 드러나지 않게 정확한 좌표 대신 반경으로 저장한다는 것을 보여준다.
 * 업로드 API가 나오면 '남기기 완료'에서 draft를 서버로 보낸다.
 */
export function ConfirmScreen() {
  const { draft } = useUploadDraft();

  return (
    <ScreenContainer
      header={<ScreenHeader centerText="3 / 3 · 위치 확인" />}
      footer={<Button label="남기기 완료" variant="primary" onPress={() => router.dismissTo('/record')} />}>
      <AppText variant="heading03" style={styles.title}>
        이 자리에 남길게요
      </AppText>

      <View style={styles.mapBox}>
        <MapPlaceholder>
          <View style={styles.radiusCircle}>
            <Icon name="location" size={28} />
          </View>
          <Badge label={`${draft.placeLabel} · 정확한 좌표 대신 반경으로 저장`} style={styles.mapLabel} />
        </MapPlaceholder>
      </View>

      <View style={styles.preview}>
        <PhotoPlaceholder width={56} height={70} />
        <View style={styles.previewTexts}>
          <AppText variant="subtitle04">{draft.oneLine || '한 줄을 아직 쓰지 않았어요'}</AppText>
          <AppText variant="caption02" color="textSecondary">
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
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  mapBox: {
    height: 170,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  radiusCircle: {
    position: 'absolute',
    top: '15%',
    left: '50%',
    width: radiusCircleSize,
    height: radiusCircleSize,
    marginLeft: -radiusCircleSize / 2,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    backgroundColor: colors.selectedBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapLabel: {
    position: 'absolute',
    left: spacing.sm,
    bottom: spacing.sm,
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginVertical: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.disabledBackground,
  },
  previewTexts: {
    flex: 1,
    gap: spacing.xxs,
  },
});
