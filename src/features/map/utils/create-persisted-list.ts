import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';

/**
 * 폰에 저장되는 목록 ('열린 기록', '좋아요', '최근 검색어' 등). 여러 화면이 같은 값을 구독한다.
 *
 * 저장된 값을 다 불러오기 전에 쓰면 빈 목록으로 저장된 값을 덮어써 버린다.
 * 그래서 모든 변경은 '불러오기가 끝난 뒤'에 차례로 적용하고 저장한다.
 * 저장·불러오기가 실패해도 화면은 계속 동작해야 하므로 조용히 넘어간다.
 */
export function createPersistedList(storageKey: string) {
  let items: string[] = [];
  let loading: Promise<void> | null = null;
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((listener) => listener());

  const load = () => {
    loading ??= AsyncStorage.getItem(storageKey)
      .then((saved) => {
        if (saved) items = JSON.parse(saved);
        notify();
      })
      .catch(() => {});
    return loading;
  };

  /** 불러오기가 끝난 뒤의 목록에 변경을 적용하고 저장한다. 여러 번 불러도 부른 순서대로 적용된다. */
  const update = (change: (current: string[]) => string[]) =>
    load().then(() => {
      items = change(items);
      notify();
      AsyncStorage.setItem(storageKey, JSON.stringify(items)).catch(() => {});
    });

  const subscribe = (listener: () => void) => {
    load();
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const getSnapshot = () => items;

  return {
    update,
    useItems: () => useSyncExternalStore(subscribe, getSnapshot, getSnapshot),
  };
}
