import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { BottomPanel } from '@/features/map/components/bottom-panel';
import type { WalkStop } from '@/features/map/constants/preview-walk-route';

type WalkRecommendPanelProps = {
  title: string;
  reason: string;
  stops: WalkStop[];
  onStart: () => void;
  onShowOther: () => void;
};

/** AI 추천 산책길: 이유와 자리 목록, '이 길로 걷기' */
export function WalkRecommendPanel({ title, reason, stops, onStart, onShowOther }: WalkRecommendPanelProps) {
  return (
    <BottomPanel>
      <Badge label="AI 추천 산책길" tone="highlight" />
      <AppText variant="subtitle01">{title}</AppText>
      <AppText variant="caption01" color="textSecondary">
        {reason}
      </AppText>

      <View style={styles.stops}>
        {stops.map((stop, index) => (
          <View key={stop.spotId} style={styles.stop}>
            <View style={styles.number}>
              <AppText variant="caption03" color="textInverse">
                {index + 1}
              </AppText>
            </View>
            <AppText variant="subtitle04" style={styles.hashtags}>
              {stop.hashtags.join(' ')}
            </AppText>
            <AppText variant="caption02" color="textTertiary">
              {index === 0 ? '출발' : `${stop.minutesFromStart}분`}
            </AppText>
          </View>
        ))}
      </View>

      <View style={styles.buttons}>
        <Button label="다른 길 보기" variant="outline" style={styles.button} onPress={onShowOther} />
        <Button label="이 길로 걷기" variant="primary" style={styles.wideButton} onPress={onStart} />
      </View>
    </BottomPanel>
  );
}

const styles = StyleSheet.create({
  stops: {
    marginTop: spacing.xs,
    gap: spacing.sm,
  },
  stop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  number: {
    width: 22,
    height: 22,
    borderRadius: radius.full,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hashtags: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  button: {
    flex: 1,
  },
  wideButton: {
    flex: 1.6,
  },
});
