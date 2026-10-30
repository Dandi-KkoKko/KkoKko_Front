import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const storageKey = 'kkokko.map.recentSearches';
/** 칩이 한 줄을 넘어 길어지지 않을 만큼만 남긴다. */
const maxRecentSearches = 10;

/**
 * 최근 검색어. 앱을 꺼도 남도록 폰에 저장한다.
 * 저장이나 불러오기가 실패해도 검색은 되어야 하므로, 실패하면 조용히 넘어간다.
 */
export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(storageKey)
      .then((saved) => {
        // 불러오는 사이에 새로 검색했으면 그 기록을 지우지 않는다.
        if (saved) setRecentSearches((current) => (current.length > 0 ? current : JSON.parse(saved)));
      })
      .catch(() => {});
  }, []);

  const save = (next: string[]) => {
    setRecentSearches(next);
    AsyncStorage.setItem(storageKey, JSON.stringify(next)).catch(() => {});
  };

  /** 같은 검색어는 맨 앞으로 옮긴다. */
  const addRecentSearch = (keyword: string) => {
    const trimmed = keyword.trim();
    if (!trimmed) return;
    save([trimmed, ...recentSearches.filter((item) => item !== trimmed)].slice(0, maxRecentSearches));
  };

  const removeRecentSearch = (keyword: string) => {
    save(recentSearches.filter((item) => item !== keyword));
  };

  return { recentSearches, addRecentSearch, removeRecentSearch };
}
