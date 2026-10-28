import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { TextField } from '@/components/text-field';
import { spacing } from '@/constants/layout';
import { AiHashtagPicker, maxHashtagCount, minHashtagCount } from '@/features/upload/components/ai-hashtag-picker';
import { useUploadDraft } from '@/features/upload/upload-draft';
import { mockAiHashtagSets } from '@/mock/ai-hashtags';

/** 입력 부담을 줄이려고 한 줄은 한 문장, 40자까지만 받는다 */
const maxOneLineLength = 40;

/**
 * 와이어프레임 ② 기록 탭: 남기기 2/3 한 줄.
 * 지금은 정해진 추천 묶음을 보여준다. AI API가 나오면 한 줄을 다 쓴 뒤 그 내용으로 추천을 요청한다.
 */
export function WriteScreen() {
  const { draft, updateDraft } = useUploadDraft();
  const [suggestionSetIndex, setSuggestionSetIndex] = useState(0);

  const hashtagCount = draft.hashtags.length;
  const canGoNext =
    draft.oneLine.trim().length > 0 && hashtagCount >= minHashtagCount && hashtagCount <= maxHashtagCount;

  const showOtherSuggestions = () => {
    setSuggestionSetIndex((suggestionSetIndex + 1) % mockAiHashtagSets.length);
    updateDraft({ hashtags: [] });
  };

  return (
    <ScreenContainer
      header={<ScreenHeader centerText="2 / 3 · 한 줄 남기기" />}
      footer={
        <Button label="다음" variant="primary" disabled={!canGoNext} onPress={() => router.push('/upload/confirm')} />
      }>
      <View style={styles.title}>
        <PhotoPlaceholder width={64} height={80} />
        <AppText variant="heading03" style={styles.titleText}>
          {'이 자리에서\n어떤 마음을 받았나요?'}
        </AppText>
      </View>

      <TextField
        label="한 문장으로 짧게"
        value={draft.oneLine}
        onChangeText={(oneLine) => updateDraft({ oneLine })}
        placeholder="공강마다 앉는 그 벤치, 오늘도 비어 있었다."
        helper="예) 사장님이 말없이 고기 더 얹어주는 국밥집."
        maxLength={maxOneLineLength}
        showCount
      />

      <View style={styles.hashtags}>
        <AiHashtagPicker
          suggestions={mockAiHashtagSets[suggestionSetIndex]}
          selected={draft.hashtags}
          onChange={(hashtags) => updateDraft({ hashtags })}
          onRefresh={showOtherSuggestions}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  titleText: {
    flex: 1,
  },
  hashtags: {
    marginTop: spacing.xl,
  },
});
