import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { ScreenContainer } from '@/components/screen-container';
import { TextField } from '@/components/text-field';
import { sectionGap, spacing } from '@/constants/layout';
import { AiHashtagPicker } from '@/features/upload/components/ai-hashtag-picker';
import { UploadStepHeader } from '@/features/upload/components/upload-step-header';
import { useUploadDraft } from '@/features/upload/upload-draft';
import { mockAiHashtags } from '@/mock/ai-hashtags';

// 입력 부담을 줄이려고 제목은 짧게, 한 줄은 한 문장 길이까지만 받는다 (GUI 7/10, 22/40)
const maxTitleLength = 10;
const maxOneLineLength = 40;

/**
 * ② 기록 탭: 남기기 2/3 한 줄 남기기.
 * 지금은 정해진 해시태그 추천을 보여준다. AI API가 나오면 한 줄을 다 쓴 뒤 그 내용으로 추천을 요청한다.
 */
export function WriteScreen() {
  const { draft, updateDraft } = useUploadDraft();
  const canGoNext = draft.title.trim().length > 0 && draft.oneLine.trim().length > 0 && draft.hashtags.length > 0;

  return (
    <ScreenContainer
      header={<UploadStepHeader title="한 줄 남기기" step={2} />}
      footer={
        <Button label="다음" variant="primary" disabled={!canGoNext} onPress={() => router.push('/upload/confirm')} />
      }>
      <View style={styles.title}>
        <PhotoPlaceholder width={100} height={100} />
        <AppText variant="heading03" style={styles.titleText}>
          {'이 자리에서\n어떤 마음을 받았나요?'}
        </AppText>
      </View>

      <View style={styles.fields}>
        <TextField
          label="제목"
          required
          value={draft.title}
          onChangeText={(title) => updateDraft({ title })}
          placeholder="이 자리의 이름을 지어주세요"
          maxLength={maxTitleLength}
          showCount
        />
        <TextField
          label="한줄 코멘트"
          required
          value={draft.oneLine}
          onChangeText={(oneLine) => updateDraft({ oneLine })}
          placeholder="공강마다 앉는 그 벤치, 오늘도 비어 있었다"
          maxLength={maxOneLineLength}
          showCount
        />
        <AiHashtagPicker
          suggestions={mockAiHashtags}
          selected={draft.hashtags}
          onChange={(hashtags) => updateDraft({ hashtags })}
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
  },
  titleText: {
    flex: 1,
  },
  fields: {
    marginTop: sectionGap,
    gap: spacing.xl,
  },
});
