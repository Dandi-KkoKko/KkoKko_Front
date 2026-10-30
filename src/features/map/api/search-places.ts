import { kakaoRestApiKey } from '@/features/map/constants/map-config';
import type { Coordinate } from '@/features/map/types/home-map-marker';
import type { Place } from '@/features/map/types/place';

const keywordSearchUrl = 'https://dapi.kakao.com/v2/local/search/keyword.json';
const resultLimit = 15;

/** 카카오 로컬 API 응답 중 쓰는 값만. 좌표와 거리는 문자열로 온다. */
type KakaoPlaceDocument = {
  id: string;
  place_name: string;
  address_name: string;
  distance: string;
  x: string;
  y: string;
};

type SearchPlacesOptions = {
  query: string;
  /** 있으면 이 근처 결과를 앞에 두고 거리도 받아 온다. */
  near: Coordinate | null;
  signal?: AbortSignal;
};

export class MissingKakaoRestKeyError extends Error {
  constructor() {
    super('카카오 REST API 키가 없어요');
  }
}

/**
 * '경북 경산시 대동 161-1' → '경산시 대동'.
 * Figma 검색 결과는 시·도와 번지를 빼고 보여줘서, 맨 앞 시·도와 번지(산 번지의 '산'까지)를 버린다.
 */
function toShortAddress(addressName: string) {
  return addressName
    .split(' ')
    .slice(1)
    .filter((part) => part !== '산' && !/^\d/.test(part))
    .join(' ');
}

/** 카카오 로컬 키워드 검색. https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword */
export async function searchPlaces({ query, near, signal }: SearchPlacesOptions): Promise<Place[]> {
  if (!kakaoRestApiKey) throw new MissingKakaoRestKeyError();

  const params = new URLSearchParams({ query, size: String(resultLimit) });
  if (near) {
    params.set('x', String(near.longitude));
    params.set('y', String(near.latitude));
  }

  const response = await fetch(`${keywordSearchUrl}?${params}`, {
    headers: { Authorization: `KakaoAK ${kakaoRestApiKey}` },
    signal,
  });
  if (!response.ok) throw new Error(`장소 검색 실패 (${response.status})`);

  const { documents } = (await response.json()) as { documents: KakaoPlaceDocument[] };
  return documents.map((document) => ({
    id: document.id,
    name: document.place_name,
    shortAddress: toShortAddress(document.address_name),
    distanceMeters: document.distance ? Number(document.distance) : null,
    coordinate: { latitude: Number(document.y), longitude: Number(document.x) },
  }));
}
