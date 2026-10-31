import { useMemo } from 'react';
import { PanResponder } from 'react-native';

import { spacing } from '@/constants/layout';

/** 손가락을 이만큼(px) 밀어야 펼치기·접기로 본다. 살짝 건드린 것까지 잡으면 지도를 끌다가 패널이 움직인다. */
const swipeThreshold = 24;

/**
 * 아래 패널을 위로 밀면 펼치고, 아래로 밀면 접는다. 반환값을 패널 View에 펼쳐 넣는다.
 * 패널을 따라 움직이는 애니메이션 없이 방향만 보는 가벼운 방식이다.
 */
export function useVerticalSwipe(onExpandedChange: (isExpanded: boolean) => void) {
  return useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > spacing.xs,
        onPanResponderRelease: (_, { dy }) => {
          if (dy < -swipeThreshold) onExpandedChange(true);
          if (dy > swipeThreshold) onExpandedChange(false);
        },
      }).panHandlers,
    [onExpandedChange],
  );
}
