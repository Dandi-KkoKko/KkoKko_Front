import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Chip } from '@/components/chip';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { spacing } from '@/constants/layout';
import { mockSelectedPreferences, preferenceGroups } from '@/features/my/constants/preference-options';

/**
 * 와이어프레임 ③ 마이 탭: 사용자 기호 수정. 온보딩 설문에서 고른 취향을 다시 고친다.
 * 취향 API가 나오면 '저장하기'에서 서버로 보낸다. 지금은 닫기만 한다.
 */
export function PreferencesScreen() {
  const [selected, setSelected] = useState<string[]>(mockSelectedPreferences);

  const toggle = (hashtag: string) =>
    setSelected(selected.includes(hashtag) ? selected.filter((item) => item !== hashtag) : [...selected, hashtag]);

  return (
    <ScreenContainer
      header={<ScreenHeader title="사용자 기호 수정" />}
      footer={<Button label="저장하기" variant="primary" onPress={() => router.back()} />}>
      <AppText variant="heading03">어떤 자리에 끌리나요?</AppText>
      <AppText variant="caption02" color="textTertiary" style={styles.caption}>
        고른 해시태그로 지도에 띄울 사진과 산책길을 골라요 · {selected.length}개 선택
      </AppText>

      {preferenceGroups.map((group) => (
        <View key={group.title} style={styles.group}>
          <AppText variant="subtitle04">{group.title}</AppText>
          <View style={styles.chips}>
            {group.hashtags.map((hashtag) => (
              <Chip key={hashtag} label={hashtag} selected={selected.includes(hashtag)} onPress={() => toggle(hashtag)} />
            ))}
          </View>
        </View>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  caption: {
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  group: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
});
