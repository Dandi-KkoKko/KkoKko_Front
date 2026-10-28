import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

import { AppText } from '@/components/app-text';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { spacing } from '@/constants/layout';
import { BottomPanel } from '@/features/map/components/bottom-panel';

type EmptySpotPanelProps = {
  placeName: string;
  distanceMeters: number;
};

/** 빈 자리: 처음 남기면 '이 자리를 처음 연 사람'으로 조용히 기록된다 */
export function EmptySpotPanel({ placeName, distanceMeters }: EmptySpotPanelProps) {
  return (
    <BottomPanel>
      <Badge label="빈 자리" tone="dashed" />
      <AppText variant="heading03">{'아직 아무도 정을\n남기지 않은 자리'}</AppText>
      <AppText variant="body02" color="textSecondary">
        {`${placeName} · ${distanceMeters}m\n처음 남기면 '이 자리를 처음 연 사람'으로 조용히 기록돼요.`}
      </AppText>
      <Button
        label="도착해서 첫 기록 남기기"
        variant="primary"
        style={styles.button}
        onPress={() => router.push('/upload/camera')}
      />
      <AppText variant="caption02" color="textTertiary" style={styles.center}>
        기록은 그 자리에서 앱 카메라로만 남길 수 있어요
      </AppText>
    </BottomPanel>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: spacing.xs,
  },
  center: {
    textAlign: 'center',
  },
});
