import Constants from 'expo-constants';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/layout';
import { MenuGroup, MenuRow } from '@/features/my/components/menu-group';
import { mockProfile } from '@/mock/my-activity';

/**
 * 와이어프레임 ③ 마이 탭: 설정.
 * 권한 상태는 지도·카메라 기능을 붙이면 실제 값으로 바꾼다. 지금은 와이어프레임 예시 값이다.
 */
export function SettingsScreen() {
  const [savesPhotoLocation, setSavesPhotoLocation] = useState(true);
  const [visitNotification, setVisitNotification] = useState(true);

  return (
    <ScreenContainer withBottomInset={false} background="gray" header={<ScreenHeader title="설정" />}>
      <View style={styles.groups}>
        <MenuGroup title="권한">
          <MenuRow label="위치 권한" description="다가가면 열리려면 '앱 사용 중' 이상 필요" trailing={<Value text="앱 사용 중" />} />
          <MenuRow label="카메라" description="앱 카메라로만 남길 수 있어요" trailing={<Value text="허용됨" />} />
          <MenuRow
            label="사진 위치·시간 저장"
            description="꺼져 있으면 기록을 남길 수 없어요"
            trailing={<Toggle value={savesPhotoLocation} onChange={setSavesPhotoLocation} />}
            isLast
          />
        </MenuGroup>

        <MenuGroup title="알림">
          <MenuRow
            label="다녀갔어요 알림"
            description="내 순간에 좋아요가 닿으면 조용히 알려요"
            trailing={<Toggle value={visitNotification} onChange={setVisitNotification} />}
            isLast
          />
        </MenuGroup>

        <MenuGroup title="계정 · 안전">
          <MenuRow label="로그인 계정" trailing={<Value text={mockProfile.loginProvider} />} />
          <MenuRow label="내 신고 내역" onPress={() => {}} />
          <MenuRow label="이용약관 · 개인정보 처리방침" onPress={() => {}} />
          <MenuRow label="버전" trailing={<Value text={Constants.expoConfig?.version ?? '-'} />} isLast />
        </MenuGroup>
      </View>

      <View style={styles.accountActions}>
        <Pressable hitSlop={8} onPress={() => router.replace('/login')}>
          <AppText variant="button04" color="textSecondary">
            로그아웃
          </AppText>
        </Pressable>
        <Pressable hitSlop={8}>
          <AppText variant="button04" color="textSecondary">
            회원 탈퇴
          </AppText>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

function Value({ text }: { text: string }) {
  return (
    <AppText variant="body02" color="textSecondary">
      {text}
    </AppText>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (value: boolean) => void }) {
  return (
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: colors.borderDeactivated, true: colors.textPrimary }}
      thumbColor={colors.background01}
    />
  );
}

const styles = StyleSheet.create({
  groups: {
    gap: spacing.lg,
  },
  accountActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xxl,
    marginTop: spacing.xl,
  },
});
