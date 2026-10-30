import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { getPreviewOpenedSpot } from '@/features/map/constants/preview-spots';

/**
 * 와이어프레임 ①-B: 열린 자리. 원본 사진과 남긴 사람의 한 줄을 보여준다.
 * 좋아요 수는 아무에게도 보이지 않고, 남긴 사람에게만 조용히 알림으로 전해진다.
 */
export function OpenedSpotScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const spot = getPreviewOpenedSpot(id);
  // 좋아요 API가 나오면 서버 값으로 시작하고, 누를 때 요청한다
  const [liked, setLiked] = useState(false);

  return (
    <ScreenContainer
      withBottomInset={false}
      header={
        <ScreenHeader
          title="열린 자리"
          right={
            <Pressable style={styles.reportButton} onPress={() => router.push(`/report/${spot.id}`)}>
              <Icon name="report" size={14} />
              <AppText variant="caption02">신고</AppText>
            </Pressable>
          }
        />
      }
      footer={
        <>
          <AppText variant="caption04" color="textTertiary" style={styles.center}>
            좋아요는 남긴 사람에게만 조용히 전해져요
          </AppText>
          <View style={styles.buttons}>
            <Button
              label={liked ? '좋아요 했어요' : '좋아요'}
              icon={liked ? 'heartFilled' : 'heart'}
              variant="outline"
              style={styles.likeButton}
              onPress={() => setLiked(!liked)}
            />
            <Button
              label="이 자리에 나도 남기기"
              variant="primary"
              style={styles.leaveButton}
              onPress={() => router.push('/upload/camera')}
            />
          </View>
        </>
      }>
      {/* 인앱 카메라 원본 비율(4:5) */}
      <PhotoPlaceholder width="100%" height="auto" style={styles.photo}>
        <View style={styles.photoBadge}>
          <Badge label="열렸어요" tone="highlight" />
        </View>
      </PhotoPlaceholder>

      <View style={styles.texts}>
        <AppText variant="subtitle02">“{spot.oneLine}”</AppText>
        <View style={styles.hashtags}>
          {spot.hashtags.map((hashtag) => (
            <Badge key={hashtag} label={hashtag} tone="muted" />
          ))}
        </View>
        <AppText variant="caption04" color="textTertiary">
          {spot.placeLabel} · 익명의 누군가가 남김
        </AppText>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.borderDeactivated,
  },
  photo: {
    aspectRatio: 4 / 5,
  },
  photoBadge: {
    padding: spacing.sm,
  },
  texts: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  hashtags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xxs,
  },
  center: {
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  likeButton: {
    flex: 1,
  },
  leaveButton: {
    flex: 1.6,
  },
});
