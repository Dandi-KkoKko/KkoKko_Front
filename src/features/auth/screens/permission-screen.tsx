import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { ScreenContainer } from '@/components/screen-container';
import { sectionGap, spacing } from '@/constants/layout';
import { PermissionCard } from '@/features/auth/components/permission-card';
import { requestAppPermissions } from '@/features/auth/utils/request-app-permissions';

/** 시작: 권한 안내. '확인하고 허용하기'를 누르면 휴대폰 권한 창을 띄우고 설문으로 넘어간다. */
export function PermissionScreen() {
  const handleAllow = async () => {
    await requestAppPermissions();
    router.push('/survey');
  };

  return (
    <ScreenContainer footer={<Button label="확인하고 허용하기" variant="primary" onPress={handleAllow} />}>
      <View style={styles.title}>
        <AppText variant="heading02">{'걸어서 열고, 그 자리에 남기려면\n이 권한이 필요해요'}</AppText>
        <AppText variant="body01" color="textTertiary">
          허용하지 않아도 둘러보기는 할 수 있어요
        </AppText>
      </View>

      <View style={styles.cards}>
        <PermissionCard
          icon="location"
          title="위치"
          required
          description={'가까이 다가가면 사진이 열려요\n앱 사용 중에만 써요'}
        />
        <PermissionCard
          icon="camera"
          title="카메라"
          required
          description={'그 자리의 순간은 앱 카메라로만 남겨요\n갤러리는 쓰지 않아요'}
        />
        <PermissionCard
          icon="bell"
          title="알림"
          required={false}
          description="내 순간에 누군가 다녀가면 조용히 알려드려요"
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    gap: spacing.xxs,
  },
  cards: {
    marginTop: sectionGap,
    gap: spacing.md,
  },
});
