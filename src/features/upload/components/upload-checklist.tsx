import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';

/** 올리기 전 안심 안내 (Figma 위치 확인 '안내'). 얼굴 확인은 서버의 안전 필터가 한다. */
const guides = [
  '기록 완료 후, 사용자 위치 보호를 위해 다른 사용자 지도에는 2시간 뒤에 업로드돼요',
  '누가 남겼는지는 드러나지 않아요',
  '얼굴이 나오면 업로드가 거절될 수 있어요',
];

export function UploadChecklist() {
  return (
    <View style={styles.container}>
      <AppText variant="caption01" color="textTertiary">
        안내
      </AppText>
      <View style={styles.list}>
        {guides.map((guide) => (
          <View key={guide} style={styles.row}>
            <View style={styles.bullet} />
            <AppText variant="caption02" color="textDeactivated" style={styles.text}>
              {guide}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
    paddingLeft: spacing.xs,
  },
  list: {
    gap: spacing.xxs,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  // 점이 글자 첫 줄 가운데에 오도록 (글자 줄 높이 20, 점 4 → 위에서 8)
  bullet: {
    width: 4,
    height: 4,
    marginTop: 8,
    borderRadius: radius.full,
    backgroundColor: colors.textDeactivated,
  },
  text: {
    flex: 1,
  },
});
