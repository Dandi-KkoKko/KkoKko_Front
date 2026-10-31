import { createPersistedList } from '@/features/map/utils/create-persisted-list';

/** 칩이 한 줄을 넘어 길어지지 않을 만큼만 남긴다. */
const maxRecentSearches = 10;

/*
 * 검색 화면과 검색결과 화면이 동시에 떠 있어서, 화면마다 따로 기억하면 한쪽이 다른 쪽 기록을 덮어쓴다.
 * 그래서 기록은 저장소 하나에만 두고, 두 화면은 같은 값을 구독한다.
 */
const recentSearches = createPersistedList('kkokko.map.recentSearches');

/** 같은 검색어는 맨 앞으로 옮긴다. */
function addRecentSearch(keyword: string) {
  const trimmed = keyword.trim();
  if (!trimmed) return;
  recentSearches.update((items) => [trimmed, ...items.filter((item) => item !== trimmed)].slice(0, maxRecentSearches));
}

function removeRecentSearch(keyword: string) {
  recentSearches.update((items) => items.filter((item) => item !== keyword));
}

/** 최근 검색어. 앱을 꺼도 남도록 폰에 저장한다. */
export function useRecentSearches() {
  return { recentSearches: recentSearches.useItems(), addRecentSearch, removeRecentSearch };
}
