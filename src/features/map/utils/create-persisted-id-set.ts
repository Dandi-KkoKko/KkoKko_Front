import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';

/**
 * 폰에 저장되는 id 모음 ('열린 기록', '좋아요한 기록' 등).
 * 여러 화면이 같은 값을 구독해서, 한 화면에서 바꾸면 다른 화면도 바로 바뀐다.
 * 저장이나 불러오기가 실패해도 화면은 계속 동작해야 하므로 조용히 넘어간다.
 */
export function createPersistedIdSet(storageKey: string) {
  let ids: string[] = [];
  let hasLoaded = false;
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((listener) => listener());

  const save = (next: string[]) => {
    ids = next;
    notify();
    AsyncStorage.setItem(storageKey, JSON.stringify(next)).catch(() => {});
  };

  const subscribe = (listener: () => void) => {
    if (!hasLoaded) {
      hasLoaded = true;
      AsyncStorage.getItem(storageKey)
        .then((saved) => {
          if (!saved) return;
          // 불러오는 사이에 더한 id도 지우지 않는다.
          ids = [...new Set([...JSON.parse(saved), ...ids])];
          notify();
        })
        .catch(() => {});
    }
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const getSnapshot = () => ids;

  return {
    add: (id: string) => {
      if (!ids.includes(id)) save([...ids, id]);
    },
    toggle: (id: string) => save(ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]),
    useIds: () => useSyncExternalStore(subscribe, getSnapshot, getSnapshot),
  };
}
