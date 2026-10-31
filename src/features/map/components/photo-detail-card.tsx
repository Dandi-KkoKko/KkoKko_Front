import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { colors, palette } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import type { RecordDetail } from '@/features/map/hooks/use-record-detail';

const headerButtonSize = 36;

type PhotoDetailCardProps = {
  record: RecordDetail;
  photoHeight: number;
  onClose: () => void;
  onReport: () => void;
  onLeaveMine: () => void;
  onToggleLike: () => void;
};

/**
 * Figma '지도 사진 남기기 UI'의 흰 사진 카드. 다른 사람이 이 자리에 남긴 사진 한 장을 크게 보여준다.
 * - 열린 기록: 한 줄, 해시태그, '나도 이 자리에 남기기', '좋아요' (Figma '장소 사진 촬영 후 화면', '코멘트 작성' 화면)
 * - 아직 안 열린 기록: 한 줄 대신 '가까이 가면 열려요' 안내만, 버튼 없음 (Figma '사진 신고' 화면)
 */
export function PhotoDetailCard({ record, photoHeight, onClose, onReport, onLeaveMine, onToggleLike }: PhotoDetailCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <AppText variant="heading03" numberOfLines={1} style={styles.title}>
          {record.placeName}
        </AppText>
        {record.isUnlocked && (
          <Pressable accessibilityRole="button" accessibilityLabel="신고" onPress={onReport} style={styles.headerButton}>
            <Icon name="flag" size={20} color="error" />
          </Pressable>
        )}
        <Pressable accessibilityRole="button" accessibilityLabel="닫기" onPress={onClose} style={styles.headerButton}>
          <Icon name="close" size={20} />
        </Pressable>
      </View>

      <PhotoPlaceholder width="100%" height={photoHeight} style={styles.photo} />

      <AppText variant="button02" color={record.isUnlocked ? 'textPrimary' : 'textDeactivated'}>
        {record.isUnlocked ? record.comment : '한줄 코멘트는 가까이 가면 열려요'}
      </AppText>

      <View style={styles.hashtags}>
        {record.hashtags.map((hashtag) => (
          <View key={hashtag} style={styles.hashtag}>
            <AppText variant="caption01" color="textSecondary">
              {hashtag}
            </AppText>
          </View>
        ))}
      </View>

      {record.isUnlocked && (
        <View style={styles.actions}>
          <Pressable accessibilityRole="button" onPress={onLeaveMine} style={[styles.action, styles.leaveMine]}>
            <AppText variant="button03" color="textInverse">
              나도 이 자리에 남기기
            </AppText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: record.isLiked }}
            onPress={onToggleLike}
            style={[styles.action, styles.like, record.isLiked && styles.liked]}>
            <Icon name={record.isLiked ? 'heartFilled' : 'heart'} size={20} color={record.isLiked ? 'error' : 'textDeactivated'} />
            <AppText variant="button03" color={record.isLiked ? 'error' : 'textDeactivated'}>
              좋아요
            </AppText>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Figma 카드 모서리 32, 사진 모서리 22
  card: {
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.xl + spacing.xs,
    backgroundColor: colors.background01,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    flex: 1,
  },
  headerButton: {
    width: headerButtonSize,
    height: headerButtonSize,
    borderRadius: radius.full,
    backgroundColor: colors.disabledBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    borderRadius: radius.xl,
  },
  hashtags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  hashtag: {
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.sm,
    backgroundColor: colors.background02,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  action: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxs,
    borderRadius: radius.md,
  },
  leaveMine: {
    flex: 2,
    backgroundColor: colors.primary,
  },
  like: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderDeactivated,
    backgroundColor: colors.background01,
  },
  // Figma 좋아요 누른 테두리(#FF6165)는 용도별 색 이름에 없어서 팔레트의 옅은 오류 색을 쓴다.
  liked: {
    borderColor: palette.error[3],
  },
});
