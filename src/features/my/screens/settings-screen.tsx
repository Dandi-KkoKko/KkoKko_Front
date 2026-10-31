import Constants from 'expo-constants';
import { router } from 'expo-router';
import { useState } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { Toggle } from '@/components/toggle';
import { spacing } from '@/constants/layout';
import { MenuGroup, MenuRow } from '@/features/my/components/menu-group';
import { usePermissionLabels } from '@/features/my/hooks/use-permission-labels';

/**
 * ③ 마이 탭: 설정. 위치·카메라는 휴대폰의 실제 권한 상태를 보여주고, 허용이 안 됐으면 누르면 휴대폰 설정으로 간다.
 * 스위치와 로그아웃·탈퇴는 계정 API가 나오면 서버에 저장한다.
 */
export function SettingsScreen() {
  const permissionLabels = usePermissionLabels();
  const [savesPhotoLocation, setSavesPhotoLocation] = useState(true);
  const [visitNotification, setVisitNotification] = useState(true);
  const openPhoneSettings = permissionLabels.isAllGranted ? undefined : () => Linking.openSettings();

  return (
    <ScreenContainer background="gray" header={<ScreenHeader title="설정" />}>
      <View style={styles.groups}>
        <MenuGroup title="권한">
          <MenuRow
            label="위치 권한"
            description="다가가서 열리려면 '앱 사용 중' 이상 필요"
            trailing={permissionLabels.location}
            onPress={openPhoneSettings}
          />
          <MenuRow
            label="카메라"
            description="앱 카메라로만 남길 수 있어요"
            trailing={permissionLabels.camera}
            onPress={openPhoneSettings}
          />
          <MenuRow
            label="사진 위치·시간 저장"
            description="꺼져 있으면 기록을 남길 수 없어요"
            trailing={<Toggle value={savesPhotoLocation} onChange={setSavesPhotoLocation} />}
          />
        </MenuGroup>

        <MenuGroup title="알림">
          <MenuRow
            label="다녀갔어요 알림"
            description="내 순간에 좋아요가 닿으면 조용히 알려요"
            trailing={<Toggle value={visitNotification} onChange={setVisitNotification} />}
          />
        </MenuGroup>

        <MenuGroup title="계정 · 안전">
          <MenuRow label="로그인 계정" trailing="이메일" />
          <MenuRow label="이용약관 · 개인정보 처리방침" onPress={() => router.push('/terms')} />
          <MenuRow label="버전" trailing={Constants.expoConfig?.version ?? '-'} />
        </MenuGroup>
      </View>

      <View style={styles.accountActions}>
        <Pressable hitSlop={8}>
          <AppText variant="body02" color="textTertiary">
            회원 탈퇴
          </AppText>
        </Pressable>
        <Pressable hitSlop={8} onPress={() => router.replace('/login')}>
          <AppText variant="body02" color="error">
            로그아웃
          </AppText>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  groups: {
    gap: spacing.xl,
  },
  accountActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});
