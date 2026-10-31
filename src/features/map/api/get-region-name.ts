import { MissingKakaoRestKeyError } from '@/features/map/api/search-places';
import { kakaoRestApiKey } from '@/features/map/constants/map-config';
import type { Coordinate } from '@/features/map/types/home-map-marker';

const regionCodeUrl = 'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json';

type KakaoRegionDocument = {
  /** B: 법정동, H: 행정동 */
  region_type: 'B' | 'H';
  region_2depth_name: string;
  region_3depth_name: string;
};

/**
 * 같은 동네를 여러 번 묻지 않도록 앱이 켜져 있는 동안 기억한다.
 * 좌표를 소수 넷째 자리(약 10m)로 묶어, 거의 같은 자리는 한 번만 묻는다.
 */
const cache = new Map<string, string>();

const toCacheKey = ({ latitude, longitude }: Coordinate) => `${latitude.toFixed(4)},${longitude.toFixed(4)}`;

/**
 * 좌표 → '경산시 대동'. 장소 검색 결과(법정동 주소)와 같은 이름이 나오도록 법정동을 쓴다.
 * https://developers.kakao.com/docs/latest/ko/local/dev-guide#coord-to-district
 */
export async function getRegionName(coordinate: Coordinate, signal?: AbortSignal): Promise<string> {
  const key = toCacheKey(coordinate);
  // 동네 이름이 없는 곳('')도 기억해 둔 값이라, 값이 있는지가 아니라 기억했는지로 본다.
  const cached = cache.get(key);
  if (cached !== undefined) return cached;
  if (!kakaoRestApiKey) throw new MissingKakaoRestKeyError();

  const params = new URLSearchParams({ x: String(coordinate.longitude), y: String(coordinate.latitude) });
  const response = await fetch(`${regionCodeUrl}?${params}`, {
    headers: { Authorization: `KakaoAK ${kakaoRestApiKey}` },
    signal,
  });
  if (!response.ok) throw new Error(`동네 이름 찾기 실패 (${response.status})`);

  const { documents } = (await response.json()) as { documents: KakaoRegionDocument[] };
  const region = documents.find((document) => document.region_type === 'B') ?? documents[0];
  const name = region ? `${region.region_2depth_name} ${region.region_3depth_name}`.trim() : '';
  cache.set(key, name);
  return name;
}
