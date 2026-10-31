import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { ScreenContainer } from '@/components/screen-container';
import { TextField } from '@/components/text-field';
import { sectionGap, spacing } from '@/constants/layout';
import { AiHashtagPicker } from '@/features/upload/components/ai-hashtag-picker';
import { DraftPhoto } from '@/features/upload/components/draft-photo';
import { UploadStepHeader } from '@/features/upload/components/upload-step-header';
import { pickRandomQuestion } from '@/features/upload/constants/write-questions';
import { useHashtagSuggestions } from '@/features/upload/hooks/use-hashtag-suggestions';
import { useUploadDraft } from '@/features/upload/upload-draft';

// 입력 부담을 줄이려고 제목은 짧게, 한 줄은 한 문장 길이까지만 받는다 (GUI 0/15, 22/40)
const maxTitleLength = 15;
const maxOneLineLength = 40;

/**
 * ② 기록 탭: 남기기 2/3 한 줄 남기기.
 * 위쪽 질문은 들어올 때마다 10개 중 하나가 무작위로 나온다.
 * 해시태그는 한 줄 코멘트를 다 쓰고 입력칸을 벗어나면 AI에게 받아 와서 보여준다 (지금은 가짜 응답, api/hashtag-suggestions.ts).
 */
export function WriteScreen() {
  const { draft, updateDraft } = useUploadDraft();
  // 화면에 들어올 때 한 번만 고른다. 글자를 칠 때마다 질문이 바뀌면 안 되기 때문이다.
  const [question] = useState(pickRandomQuestion);
  const { suggestions, requestSuggestions, clearSuggestions } = useHashtagSuggestions();

  // 한 줄을 고치면 그 한 줄로 고른 해시태그도 더는 맞지 않으니 함께 지운다
  const changeOneLine = (oneLine: string) => {
    updateDraft({ oneLine, hashtags: [] });
    clearSuggestions();
  };
  const canGoNext = draft.title.trim().length > 0 && draft.oneLine.trim().length > 0 && draft.hashtags.length > 0;

  return (
    <ScreenContainer
      header={<UploadStepHeader title="한 줄 남기기" step={2} />}
      footer={
        <Button label="다음" variant="primary" disabled={!canGoNext} onPress={() => router.push('/upload/confirm')} />
      }>
      <View style={styles.title}>
        <DraftPhoto uri={draft.photoUri} width={100} height={100} />
        <AppText variant="heading03" style={styles.titleText}>
          {question}
        </AppText>
      </View>

      <View style={styles.fields}>
        <TextField
          label="제목"
          required
          value={draft.title}
          onChangeText={(title) => updateDraft({ title })}
          placeholder="제목을 입력해 주세요"
          maxLength={maxTitleLength}
          showCount
        />
        <TextField
          label="한줄 코멘트"
          required
          value={draft.oneLine}
          onChangeText={changeOneLine}
          onBlur={() => requestSuggestions(draft.oneLine)}
          returnKeyType="done"
          placeholder="한줄 코멘트를 적어주세요"
          maxLength={maxOneLineLength}
          showCount
        />
        {/* 후보를 받아 오기 전에는 칸을 아예 숨긴다 */}
        {suggestions.length > 0 && (
          <AiHashtagPicker
            suggestions={suggestions}
            selected={draft.hashtags}
            onChange={(hashtags) => updateDraft({ hashtags })}
          />
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  titleText: {
    flex: 1,
  },
  fields: {
    marginTop: sectionGap,
    gap: spacing.xl,
  },
});
