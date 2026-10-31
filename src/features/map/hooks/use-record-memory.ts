import { createPersistedIdSet } from '@/features/map/utils/create-persisted-id-set';

/**
 * 기록에 대해 이 폰이 기억하는 것. 서버가 나오면 '열람 기록', '좋아요' API로 바꾼다.
 * - 열린 기록: 다가가서 한 번 연 기록은 멀어져도 다시 잠기지 않는다 (사진 해금).
 * - 좋아요한 기록
 */
const unlockedRecords = createPersistedIdSet('kkokko.map.unlockedRecords');
const likedRecords = createPersistedIdSet('kkokko.map.likedRecords');

export const unlockRecord = unlockedRecords.add;
export const toggleLikedRecord = likedRecords.toggle;
export const useUnlockedRecordIds = unlockedRecords.useIds;
export const useLikedRecordIds = likedRecords.useIds;
