import { useEffect, useState } from 'react';

import { getRegionName } from '@/features/map/api/get-region-name';
import type { Coordinate } from '@/features/map/types/home-map-marker';

/** 좌표의 동네 이름('경산시 대동'). 못 찾으면 빈 문자열이라, 화면은 동네 없이 나머지만 보여준다. */
export function useRegionName(coordinate: Coordinate | null) {
  const [result, setResult] = useState<{ coordinate: Coordinate; name: string } | null>(null);

  useEffect(() => {
    if (!coordinate) return;
    const controller = new AbortController();
    getRegionName(coordinate, controller.signal)
      .then((name) => setResult({ coordinate, name }))
      .catch(() => {});
    return () => controller.abort();
  }, [coordinate]);

  // 다른 좌표의 이름이 남아 있으면 보여주지 않는다.
  return result && result.coordinate === coordinate ? result.name : '';
}
