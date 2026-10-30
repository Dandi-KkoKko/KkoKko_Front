/** 520 → '520m', 1240 → '1.2km'. 1km부터는 m 단위가 너무 길어져서 km로 바꾼다. */
export function formatDistance(meters: number) {
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}
