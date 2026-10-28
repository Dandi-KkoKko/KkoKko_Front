import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { MapPlaceholder } from '@/components/map-placeholder';
import { PhotoPlaceholder } from '@/components/photo-placeholder';
import { screenPaddingX, spacing } from '@/constants/layout';
import { BottomPanel } from '@/features/map/components/bottom-panel';
import { ClusterMarker, PhotoMarker } from '@/features/map/components/map-markers';
import { MapSearchBar } from '@/features/map/components/map-search-bar';
import { mockPlaceResults } from '@/mock/search-results';

/**
 * 와이어프레임 ① 지도 탭: 검색 결과 장소로 이동한 지도.
 * 장소를 가운데 두고, 아래 창에 이 근처에 남겨진 자리 수와 '걸어서 가기'를 보여준다.
 */
export function PlaceScreen() {
  const insets = useSafeAreaInsets();
  // 장소 API가 나오면 주소의 id로 불러온다
  const place = mockPlaceResults[0];

  return (
    <View style={styles.screen}>
      <MapPlaceholder>
        <ClusterMarker top={100} left="10%" label="#정문앞 · 붕어빵" moreCount={4} />
        <PhotoMarker top={90} left="72%" hashtag="#덤" status="preview" />
        <PhotoMarker top={330} left="16%" hashtag="#학교앞분식" />
        <PhotoMarker top={330} left="68%" hashtag="#버스정류장" />
        <View style={styles.centerPin}>
          <Badge label={place.name} tone="dark" style={styles.pinLabel} />
          <Icon name="location" size={32} />
        </View>
      </MapPlaceholder>

      <View style={[styles.top, { paddingTop: insets.top + spacing.xs }]}>
        <MapSearchBar query={place.name} />
      </View>

      <BottomPanel>
        <View style={styles.titles}>
          <AppText variant="subtitle01">{place.name}</AppText>
          <AppText variant="caption02" color="textTertiary">
            {place.address} · 내 위치에서 {place.distanceMeters}m
          </AppText>
        </View>

        <View style={styles.preview}>
          <PhotoPlaceholder width={44} height={44} />
          <PhotoPlaceholder width={44} height={44} />
          <PhotoPlaceholder width={44} height={44} />
          <AppText variant="subtitle04">이 근처 남겨진 자리 {place.spotCount}곳</AppText>
        </View>

        <View style={styles.buttons}>
          <Button label="이 근처 산책길" variant="outline" style={styles.button} onPress={() => router.push('/map/walk')} />
          <Button
            label="걸어서 가기"
            variant="primary"
            style={styles.button}
            onPress={() => router.push(`/map/spot/${place.id}`)}
          />
        </View>
      </BottomPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: screenPaddingX,
  },
  centerPin: {
    position: 'absolute',
    top: 230,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: spacing.xxs,
  },
  pinLabel: {
    alignSelf: 'center',
  },
  titles: {
    gap: spacing.xxs,
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  button: {
    flex: 1,
  },
});
