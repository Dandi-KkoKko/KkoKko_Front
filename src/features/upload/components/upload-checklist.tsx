import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon, type IconName } from '@/components/icon';
import { spacing } from '@/constants/layout';

/**
 * 올리기 전 안심 안내. 얼굴 확인은 서버의 안전 필터가 하고, 결과에 따라 첫 줄이 바뀐다.
 * 지금은 항상 통과한 것으로 보여준다.
 */
const checklist: { icon: IconName; text: string }[] = [
  { icon: 'check', text: '안전 확인 완료 (얼굴 없음)' },
  { icon: 'check', text: '누가 남겼는지는 드러나지 않아요' },
  { icon: 'clock', text: '약 2시간 뒤 다른 사람 지도에 흐릿하게 건네져요' },
];

export function UploadChecklist() {
  return (
    <View style={styles.list}>
      {checklist.map((item) => (
        <View key={item.text} style={styles.row}>
          <Icon name={item.icon} size={18} />
          <AppText variant="body02">{item.text}</AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
