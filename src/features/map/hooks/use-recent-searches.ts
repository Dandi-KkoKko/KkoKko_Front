import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';

const storageKey = 'kkokko.map.recentSearches';
/** 칩이 한 줄을 넘어 길어지지 않을 만큼만 남긴다. */
const maxRecentSearches = 10;

/*
 * 검색 화면과 검색결과 화면이 동시에 떠 있어서, 화면마다 따로 기억하면 한쪽이 다른 쪽 기록을 덮어쓴다.
 * 그래서 기록은 이 파일 하나에만 두고, 두 화면은 같은 값을 구독한다.
 */
let recentSearches: string[] = [];
let hasLoaded = false;
const listeners = new Set<() => void>();

function setRecentSearches(next: string[]) {
  recentSearches = next;
  listeners.forEach((listener) => listener());
  // 저장이 실패해도 검색은 되어야 하므로 조용히 넘어간다.
  AsyncStorage.setItem(storageKey, JSON.stringify(next)).catch(() => {});
}

function loadOnce() {
  if (hasLoaded) return;
  hasLoaded = true;
  AsyncStorage.getItem(storageKey)
    .then((saved) => {
      // 불러오는 사이에 새로 검색했으면 그 기록을 지우지 않는다.
      if (!saved || recentSearches.length > 0) return;
      recentSearches = JSON.parse(saved);
      listeners.forEach((listener) => listener());
    })
    .catch(() => {});
}

function subscribe(listener: () => void) {
  loadOnce();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const getSnapshot = () => recentSearches;

/** 같은 검색어는 맨 앞으로 옮긴다. */
function addRecentSearch(keyword: string) {
  const trimmed = keyword.trim();
  if (!trimmed) return;
  setRecentSearches([trimmed, ...recentSearches.filter((item) => item !== trimmed)].slice(0, maxRecentSearches));
}

function removeRecentSearch(keyword: string) {
  setRecentSearches(recentSearches.filter((item) => item !== keyword));
}

/** 최근 검색어. 앱을 꺼도 남도록 폰에 저장한다. */
export function useRecentSearches() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return { recentSearches: items, addRecentSearch, removeRecentSearch };
}
