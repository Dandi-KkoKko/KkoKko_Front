import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { ScreenContainer } from '@/components/screen-container';
import { spacing } from '@/constants/layout';
import { PermissionCard } from '@/features/auth/components/permission-card';

/**
 * 와이어프레임 ⓪ 시작: 권한 안내.
 * 실제 권한 요청은 지도(expo-location)와 카메라(expo-camera)를 붙일 때 '확인하고 허용하기'에서 차례로 띄운다.
 */
export function PermissionScreen() {
  const goNext = () => router.push('/survey');

  return (
    <ScreenContainer
      footer={
        <>
          <Button label="확인하고 허용하기" variant="primary" onPress={goNext} />
          <AppText variant="caption02" color="textTertiary" style={styles.center}>
            다음에 휴대폰 권한 창이 차례로 떠요
          </AppText>
        </>
      }>
      <View style={styles.title}>
        <AppText variant="heading03">{'걸어서 열고, 그 자리에 남기려면\n이 권한이 필요해요'}</AppText>
        <AppText variant="body02" color="textTertiary">
          허용하지 않아도 둘러보기는 할 수 있어요
        </AppText>
      </View>

      <View style={styles.cards}>
        <PermissionCard
          icon="location"
          title="위치"
          required
          description="가까이 다가가면 사진이 열려요. 앱 사용 중에만 써요"
        />
        <PermissionCard
          icon="camera"
          title="카메라"
          required
          description="그 자리의 순간은 앱 카메라로만 남겨요. 갤러리는 쓰지 않아요"
        />
        <PermissionCard
          icon="bell"
          title="알림"
          required={false}
          description="내 순간에 누군가 다녀가면 조용히 알려드려요"
        />
      </View>

      <AppText variant="caption02" color="textTertiary" style={[styles.center, styles.note]}>
        정확한 좌표 대신 반경으로 저장하고, 2~3시간 뒤에 공개해요
      </AppText>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.xxxl,
    gap: spacing.xs,
  },
  cards: {
    marginTop: spacing.xxl,
    gap: spacing.sm,
  },
  center: {
    textAlign: 'center',
  },
  note: {
    marginTop: 'auto',
    paddingTop: spacing.xxl,
  },
});
