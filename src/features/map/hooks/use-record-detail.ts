import { useEffect, useMemo } from 'react';

import { openRadiusMeters } from '@/features/map/constants/map-config';
import { getPreviewClusterRecords, previewClusterPlaceName } from '@/features/map/constants/preview-cluster';
import { useHomeMapMarkers } from '@/features/map/hooks/use-home-map-markers';
import { unlockRecord, useLikedRecordIds, useUnlockedRecordIds } from '@/features/map/hooks/use-record-memory';
import type { Coordinate, HomeMapMarker } from '@/features/map/types/home-map-marker';
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
  /** 지금 열림 반경 안이면 true */
  isNearby: boolean;
};

/**
 * 기록 한 건을 찾는다. 지도 홈의 사진 기록과 묶음 안 기록을 함께 찾는다.
 * 서버가 나오면 '기록 상세' API 하나로 바꾼다.
 */
export function useRecordDetail(recordId: string, myLocation: Coordinate | null): RecordDetail | null {
  const { markers } = useHomeMapMarkers(myLocation);
  const unlockedIds = useUnlockedRecordIds();
  const likedIds = useLikedRecordIds();

  const detail = useMemo(() => {
    const found = findRecord(markers, recordId);
    if (!found) return null;

    const isNearby = myLocation !== null && getDistanceMeters(myLocation, found.coordinate) <= openRadiusMeters;
    return {
      id: recordId,
      placeName: found.placeName,
      hashtags: found.hashtags,
      comment: found.comment,
      isNearby,
      isUnlocked: isNearby || unlockedIds.includes(recordId),
      isLiked: likedIds.includes(recordId),
    };
  }, [markers, recordId, myLocation, unlockedIds, likedIds]);

  // 가까이 와서 열린 기록은 멀어져도 다시 잠기지 않게 이 폰에 기억해 둔다.
  const shouldRemember = detail?.isNearby === true && !unlockedIds.includes(recordId);
  useEffect(() => {
    if (shouldRemember) unlockRecord(recordId);
  }, [shouldRemember, recordId]);

  return detail;
}

/** 지도 홈의 사진 기록이나, 어느 묶음 안의 기록에서 찾는다. 묶음 안 기록은 묶음 자리에 있다고 본다. */
function findRecord(markers: HomeMapMarker[], recordId: string) {
  for (const marker of markers) {
    if (marker.kind === 'photo' && marker.id === recordId) {
      return { coordinate: marker.coordinate, placeName: marker.placeName ?? '', hashtags: marker.hashtags, comment: marker.comment ?? '' };
    }
    if (marker.kind === 'cluster') {
      const record = getPreviewClusterRecords(marker.id).find(({ id }) => id === recordId);
      if (record) {
        return { coordinate: marker.coordinate, placeName: previewClusterPlaceName, hashtags: record.hashtags, comment: record.comment ?? '' };
      }
    }
  }
  return null;
}
