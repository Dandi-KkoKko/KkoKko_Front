import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Badge } from '@/components/badge';
import { IconButton } from '@/components/icon-button';
import { MapPlaceholder } from '@/components/map-placeholder';
import { screenPaddingX, spacing } from '@/constants/layout';
import { HashtagFilter } from '@/features/map/components/hashtag-filter';
import { LocationPermissionCard } from '@/features/map/components/location-permission-card';
import { CampusSummaryCard, MapLegend } from '@/features/map/components/map-bottom-info';
import { MapControls } from '@/features/map/components/map-controls';
import { ClusterMarker, EmptySpotMarker, PhotoMarker } from '@/features/map/components/map-markers';
import { MapSearchBar } from '@/features/map/components/map-search-bar';
import { NearestSpotCard } from '@/features/map/components/nearest-spot-card';
import { MyLocationDot, OpenRadius } from '@/features/map/components/open-radius';
import {
  previewCampusSummary,
  previewFilterHashtags,
  previewMapLevels,
  previewNearestSpot,
  zoomLevels,
  type ZoomLevel,
} from '@/features/map/constants/preview-markers';
import { useLocationPermission } from '@/features/map/hooks/use-location-permission';

/**
 * 와이어프레임 ① 지도(홈) 탭, ①-A 축척.
 * 확대 단계(넓게 / 기본 / 자세히)마다 보이는 마커와 아래 카드가 바뀐다.
 * 위치 권한이 없으면 지도 위에 권한 안내를 덮는다.
 */
export function MapScreen() {
  const insets = useSafeAreaInsets();
  const { granted, request } = useLocationPermission();
  const [isBrowsing, setIsBrowsing] = useState(false);
  const [selectedHashtag, setSelectedHashtag] = useState('전체');
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('default');

  const level = previewMapLevels[zoomLevel];
  const isDefaultZoom = zoomLevel === 'default';
  const showPermissionCard = !granted && !isBrowsing;

  const changeZoom = (step: 1 | -1) => {
    const nextIndex = zoomLevels.indexOf(zoomLevel) + step;
    const next = zoomLevels[Math.min(Math.max(nextIndex, 0), zoomLevels.length - 1)];
    setZoomLevel(next);
  };

  return (
    <View style={styles.screen}>
      <MapPlaceholder>
        {level.clusters.map(({ id, ...cluster }) => (
          <ClusterMarker key={id} {...cluster} onPress={() => router.push(`/map/cluster/${id}`)} />
        ))}
        {level.emptySpot && (
          <EmptySpotMarker
            {...level.emptySpot}
            onPress={() => router.push(`/map/spot/${level.emptySpot?.id}`)}
          />
        )}
        {level.myLocation.showRadius ? (
          <OpenRadius {...level.myLocation} showLabel={isDefaultZoom} />
        ) : (
          <MyLocationDot {...level.myLocation} />
        )}
        {level.photos.map(({ id, ...photo }) => (
          <PhotoMarker key={`${zoomLevel}-${id}`} {...photo} onPress={() => router.push(`/map/spot/${id}`)} />
        ))}
      </MapPlaceholder>

      <View style={[styles.top, { paddingTop: insets.top + spacing.xs }]}>
        <MapSearchBar regionLabel={level.regionLabel} />
        {level.notice ? (
          <View style={styles.notice}>
            <Badge label={level.notice} tone="dark" />
          </View>
        ) : (
          <HashtagFilter hashtags={previewFilterHashtags} selected={selectedHashtag} onSelect={setSelectedHashtag} />
        )}
      </View>

      <View style={styles.bottom}>
        <View style={styles.sideButtons}>
          <MapControls onZoomIn={() => changeZoom(1)} onZoomOut={() => changeZoom(-1)} zoomOnly={!isDefaultZoom} />
          {isDefaultZoom && (
            <IconButton
              icon="camera"
              accessibilityLabel="지금 이 자리 남기기"
              emphasized
              size={56}
              onPress={() => router.push('/upload/camera')}
            />
          )}
        </View>
        {zoomLevel === 'overview' && <CampusSummaryCard spotCount={previewCampusSummary.spotCount} />}
        {zoomLevel === 'default' && <NearestSpotCard {...previewNearestSpot} />}
        {zoomLevel === 'detail' && <MapLegend />}
      </View>

      {showPermissionCard && <LocationPermissionCard onRequest={request} onBrowse={() => setIsBrowsing(true)} />}
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
    gap: spacing.sm,
  },
  notice: {
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    left: screenPaddingX,
    right: screenPaddingX,
    bottom: spacing.md,
    gap: spacing.md,
  },
  sideButtons: {
    alignItems: 'flex-end',
    gap: spacing.md,
  },
});
