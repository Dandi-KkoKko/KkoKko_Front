import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { palette } from '@/constants/colors';
import { screenPaddingX, spacing } from '@/constants/layout';
import { PhotoDetailCard } from '@/features/map/components/photo-detail-card';
import { ReportSheet } from '@/features/map/components/report-sheet';
import { useMyLocation } from '@/features/map/hooks/use-my-location';
import { useRecordDetail } from '@/features/map/hooks/use-record-detail';
import { toggleLikedRecord } from '@/features/map/hooks/use-record-memory';

/** Figma 사진 높이. 작은 폰에서는 화면 높이의 절반을 넘지 않게 줄인다. */
const maxPhotoHeight = 410;

/**
 * Figma '지도 사진 남기기 UI'. 지도 위 사진, 묶음 기록, '사진과 한 줄 보기'를 누르면 어둡게 덮고 사진 카드를 띄운다.
 * 열린 기록이면 좋아요·신고·'나도 이 자리에 남기기'(카메라로 바로 찍기)를 할 수 있다.
 * 바깥 어두운 곳이나 X를 누르면 닫힌다.
 */
export function PhotoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { height: windowHeight } = useWindowDimensions();
  const { location } = useMyLocation();
  const record = useRecordDetail(id, location);
  const [isReporting, setIsReporting] = useState(false);

  const photoHeight = Math.min(maxPhotoHeight, Math.round(windowHeight * 0.45));

  return (
    <View style={styles.screen}>
      <Pressable accessibilityRole="button" accessibilityLabel="사진 닫기" onPress={() => router.back()} style={styles.backdrop} />

      <View style={styles.content}>
        {record ? (
          <PhotoDetailCard
            record={record}
            photoHeight={photoHeight}
            onClose={() => router.back()}
            onReport={() => setIsReporting(true)}
            // 남기기는 앱 카메라로 바로 찍는다. 갤러리에서 고르는 길은 없다.
            onLeaveMine={() => router.push('/upload/camera')}
            onToggleLike={() => toggleLikedRecord(record.id)}
          />
        ) : (
          <AppText variant="body01" color="textInverse" style={styles.notFound}>
            이 기록을 찾지 못했어요
          </AppText>
        )}
      </View>

      {/* 신고 API가 나오면 고른 이유를 서버로 보낸다. 지금은 접수 안내만 보여준다. */}
      {isReporting && <ReportSheet onClose={() => setIsReporting(false)} onSubmit={() => {}} />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: screenPaddingX,
  },
  // Figma 덮개 색(#313131, 80%)을 팔레트 색 + 투명도로 만든다.
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: palette.gray[800],
    opacity: 0.8,
  },
  content: {
    gap: spacing.md,
  },
  notFound: {
    textAlign: 'center',
  },
});
