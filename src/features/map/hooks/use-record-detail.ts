import { useMemo } from 'react';

import { openRadiusMeters } from '@/features/map/constants/map-config';
import { getPreviewClusterRecords, previewClusterPlaceName } from '@/features/map/constants/preview-cluster';
import { useHomeMapMarkers } from '@/features/map/hooks/use-home-map-markers';
import { useLikedRecordIds, useUnlockedRecordIds } from '@/features/map/hooks/use-record-memory';
import type { Coordinate } from '@/features/map/types/home-map-marker';
import { getDistanceMeters } from '@/features/map/utils/get-distance-meters';

/** 사진 카드에 필요한 기록 한 건 */
export type RecordDetail = {
  id: string;
  placeName: string;
  hashtags: string[];
  comment: string;
  /** 다가가서 열었거나 지금 열림 반경 안이면 한 줄과 버튼을 보여준다 */
  isUnlocked: boolean;
  isLiked: boolean;
};

/**
 * 기록 한 건을 찾는다. 지도 홈의 사진 기록과 묶음 안 기록을 함께 찾는다.
 * 서버가 나오면 '기록 상세' API 하나로 바꾼다.
 */
export function useRecordDetail(recordId: string, myLocation: Coordinate | null): RecordDetail | null {
  const { markers } = useHomeMapMarkers(myLocation);
  const unlockedIds = useUnlockedRecordIds();
  const likedIds = useLikedRecordIds();

  return useMemo(() => {
    const photo = markers.find((marker) => marker.kind === 'photo' && marker.id === recordId);
    const cluster = markers.find((marker) => marker.kind === 'cluster');
    const clusterRecord = cluster ? getPreviewClusterRecords(cluster.id).find((record) => record.id === recordId) : undefined;

    const found =
      photo?.kind === 'photo'
        ? { coordinate: photo.coordinate, placeName: photo.placeName ?? '', hashtags: photo.hashtags, comment: photo.comment ?? '' }
        : clusterRecord && cluster
          ? { coordinate: cluster.coordinate, placeName: previewClusterPlaceName, hashtags: clusterRecord.hashtags, comment: clusterRecord.comment ?? '' }
          : null;
    if (!found) return null;

    const isNearby = myLocation !== null && getDistanceMeters(myLocation, found.coordinate) <= openRadiusMeters;
    return {
      id: recordId,
      placeName: found.placeName,
      hashtags: found.hashtags,
      comment: found.comment,
      isUnlocked: isNearby || unlockedIds.includes(recordId),
      isLiked: likedIds.includes(recordId),
    };
  }, [markers, recordId, myLocation, unlockedIds, likedIds]);
}
