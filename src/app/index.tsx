import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';

export default function Index() {
  return (
    <View style={styles.container}>
      <AppText variant="heading01">가까이</AppText>
      <Link href="/design-system">
        <AppText variant="button01" color="primary">
          디자인 시스템 보기
        </AppText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
});
