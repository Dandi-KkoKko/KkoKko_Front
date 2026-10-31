import { createPersistedList } from '@/features/map/utils/create-persisted-list';

/**
 * 기록에 대해 이 폰이 기억하는 것. 서버가 나오면 '열람 기록', '좋아요' API로 바꾼다.
 * - 열린 기록: 다가가서 한 번 연 기록은 멀어져도 다시 잠기지 않는다 (사진 해금).
 * - 좋아요한 기록
 */
const unlockedRecords = createPersistedList('kkokko.map.unlockedRecords');
const likedRecords = createPersistedList('kkokko.map.likedRecords');

export const unlockRecord = (id: string) => unlockedRecords.update((ids) => (ids.includes(id) ? ids : [...ids, id]));

export const toggleLikedRecord = (id: string) =>
  likedRecords.update((ids) => (ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]));

export const useUnlockedRecordIds = unlockedRecords.useItems;
export const useLikedRecordIds = likedRecords.useItems;
