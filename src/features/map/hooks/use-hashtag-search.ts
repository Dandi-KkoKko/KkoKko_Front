import { useEffect, useMemo, useState } from 'react';

import { getRegionName } from '@/features/map/api/get-region-name';
import { defaultMapCenter } from '@/features/map/constants/map-config';
import { useHomeMapMarkers } from '@/features/map/hooks/use-home-map-markers';
import type { Coordinate, PhotoMarker } from '@/features/map/types/home-map-marker';
import { searchHashtags } from '@/features/map/utils/search-hashtags';

const isPhoto = (marker: { kind: string }): marker is PhotoMarker => marker.kind === 'photo';

/**
 * 지도에 남겨진 기록에서 해시태그를 찾는다. 기록은 지도 홈과 같은 곳(useHomeMapMarkers)에서 가져온다.
 * 결과마다 대표 기록이 있는 동네 이름('경산시 대동')을 카카오 로컬 API로 찾아 붙인다.
 * 동네 이름을 못 찾아도 결과는 보여준다.
 */
export function useHashtagSearch(query: string, myLocation: Coordinate | null) {
  const { markers } = useHomeMapMarkers(myLocation);
  const from = myLocation ?? defaultMapCenter;

  const results = useMemo(() => searchHashtags(markers.filter(isPhoto), query, from), [markers, query, from]);
  const [regionNames, setRegionNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const controller = new AbortController();
    const records = results.map(({ record }) => record);
    Promise.all(
      records.map((record) =>
        getRegionName(record.coordinate, controller.signal)
          .then((name) => [record.id, name] as const)
          .catch(() => [record.id, ''] as const),
      ),
    ).then((entries) => {
      if (!controller.signal.aborted) setRegionNames((current) => ({ ...current, ...Object.fromEntries(entries) }));
    });
    return () => controller.abort();
  }, [results]);

  return useMemo(
    () => results.map((result) => ({ ...result, regionName: regionNames[result.record.id] ?? '' })),
    [results, regionNames],
  );
}
