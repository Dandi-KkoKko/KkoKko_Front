import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors, palette } from '@/constants/colors';
import { typography, type TypographyVariant } from '@/constants/typography';

/** 디자인 토큰이 Figma와 같게 보이는지 폰에서 확인하는 화면 */
export default function DesignSystemScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: '디자인 시스템' }} />

      <AppText variant="heading02">Typography</AppText>
      {(Object.keys(typography) as TypographyVariant[]).map((variant) => (
        <View key={variant} style={styles.row}>
          <AppText variant="caption02" color="textTertiary" style={styles.label}>
            {variant}
          </AppText>
          <AppText variant={variant}>안녕하세요 123!#@</AppText>
        </View>
      ))}

      <AppText variant="heading02" style={styles.section}>
        Color
      </AppText>
      <Swatches title="Primary" values={palette.primary} />
      <Swatches title="Gray" values={palette.gray} />
      <Swatches title="Error" values={palette.error} />
      <Swatches title="Warning" values={palette.warning} />
      <Swatches title="Success" values={palette.success} />
      <Swatches title="Information" values={palette.information} />
      <Swatches title="Semantic" values={colors} />
    </ScrollView>
  );
}

function Swatches({ title, values }: { title: string; values: Record<string, string> }) {
  return (
    <View style={styles.swatchGroup}>
      <AppText variant="subtitle03">{title}</AppText>
      <View style={styles.swatches}>
        {Object.entries(values).map(([name, hex]) => (
          <View key={name} style={styles.swatch}>
            <View style={[styles.chip, { backgroundColor: hex }]} />
            <AppText variant="caption04" color="textSecondary" numberOfLines={1}>
              {name}
            </AppText>
            <AppText variant="caption04" color="textTertiary">
              {hex}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  section: {
    marginTop: 24,
  },
  row: {
    gap: 2,
  },
  label: {
    marginTop: 4,
  },
  swatchGroup: {
    gap: 8,
  },
  swatches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  swatch: {
    width: 76,
    gap: 2,
  },
  chip: {
    height: 48,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderDeactivated,
  },
});
