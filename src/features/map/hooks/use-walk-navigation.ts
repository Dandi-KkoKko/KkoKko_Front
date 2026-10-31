import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';

import { getWalkRoute } from '@/features/map/api/get-walk-route';
import { defaultMapCenter, openRadiusMeters, walkingSpeedMetersPerSecond } from '@/features/map/constants/map-config';
import { useHomeMapMarkers } from '@/features/map/hooks/use-home-map-markers';
import type { Coordinate } from '@/features/map/types/home-map-marker';
import type { WalkRoute } from '@/features/map/types/walk-route';
import { getDistanceMeters } from '@/features/map/utils/get-distance-meters';
import { locateOnRoute, splitRoute } from '@/features/map/utils/route-progress';

type NavigationParams = {
  destinationName?: string;
  latitude?: string;
  longitude?: string;
  stopIds?: string;
};

/** 들를 자리·목적지에 이만큼(m) 다가오면 도착한 것으로 본다. GPS 오차를 생각한 값이다. */
const arrivalMeters = 25;

/** 목적지에서 이 거리 안에 남겨진 기록을 '이 자리의 기록'으로 보고, 도착하면 연다. */
const unlockMatchMeters = 50;

/**
 * 길안내 (Figma '지도 길안내 UI'). 경로 추천에서 넘겨받은 목적지와 들를 자리로 걷는 길을 받고,
 * 내 위치가 바뀔 때마다 경로 위 어디쯤인지, 다음 자리까지 몇 분인지, 열림 반경 안에 어떤 기록이 있는지 다시 센다.
 */
export function useWalkNavigation(myLocation: Coordinate | null) {
  const params = useLocalSearchParams<NavigationParams>();
  const { records } = useHomeMapMarkers(myLocation);

  const destination = useMemo<Coordinate | null>(
    () =>
      params.latitude && params.longitude
        ? { latitude: Number(params.latitude), longitude: Number(params.longitude) }
        : null,
    [params.latitude, params.longitude],
  );
  const stops = useMemo(() => {
    const ids = params.stopIds ? params.stopIds.split(',') : [];
    return ids.map((id) => records.find((record) => record.id === id)).filter((stop) => stop !== undefined);
  }, [params.stopIds, records]);

  // 출발점은 길안내를 시작한 순간의 위치로 고정한다. 위치를 모르면 캠퍼스에서 출발한다고 본다.
  const [start, setStart] = useState<Coordinate | null>(null);
  if (!start && myLocation) setStart(myLocation);
  const routeStart = start ?? defaultMapCenter;

  const [route, setRoute] = useState<WalkRoute | null>(null);
  useEffect(() => {
    if (!destination) return;
    const controller = new AbortController();
    getWalkRoute(
      { start: routeStart, destination, destinationName: params.destinationName ?? '', stops },
      controller.signal,
    )
      .then(setRoute)
      .catch(() => {});
    return () => controller.abort();
  }, [routeStart, destination, params.destinationName, stops]);

  const current = myLocation ?? routeStart;

  const progress = useMemo(() => {
    if (!route || !destination) return null;
    const position = locateOnRoute(route.path, current);
    // 들를 자리를 경로 위 거리로 바꿔, 아직 지나지 않은 첫 자리를 다음 목표로 삼는다.
    const nextStop = stops.find((stop) => {
      const stopAlong = locateOnRoute(route.path, stop.coordinate).alongMeters;
      return stopAlong - position.alongMeters > arrivalMeters && getDistanceMeters(current, stop.coordinate) > arrivalMeters;
    });
    const target = nextStop?.coordinate ?? destination;
    const remainingMeters = Math.max(0, locateOnRoute(route.path, target).alongMeters - position.alongMeters);
    return {
      ...splitRoute(route.path, position),
      isHeadingToDestination: !nextStop,
      hasArrived: !nextStop && getDistanceMeters(current, destination) <= arrivalMeters,
      minutesToTarget: Math.max(1, Math.ceil(remainingMeters / walkingSpeedMetersPerSecond / 60)),
    };
  }, [route, destination, stops, current]);

  // '범위 내 기록들': 내 위치 열림 반경 안의 기록. AI 추천순은 팀원 AI가 붙기 전까지 가까운 순으로 대신한다.
  const recordsInRange = useMemo(
    () =>
      records
        .map((record) => ({ record, distance: getDistanceMeters(current, record.coordinate) }))
        .filter(({ distance }) => distance <= openRadiusMeters)
        .sort((a, b) => a.distance - b.distance)
        .map(({ record }) => record),
    [records, current],
  );

  // 도착하면 목적지에 가장 가까이 남겨진 기록 하나가 열린다 (Figma '사진 해금 UI'). 없으면 열 기록이 없다.
  const unlockedRecord = useMemo(() => {
    if (!progress?.hasArrived || !destination) return null;
    const nearest = records
      .map((record) => ({ record, distance: getDistanceMeters(destination, record.coordinate) }))
      .filter(({ distance }) => distance <= unlockMatchMeters)
      .sort((a, b) => a.distance - b.distance)[0];
    return nearest?.record ?? null;
  }, [progress?.hasArrived, destination, records]);

  return {
    destinationName: params.destinationName ?? '',
    destination,
    /** 출발점부터 목적지까지 전체 경로. 지도를 처음 맞출 때 쓴다. */
    fullPath: route?.path ?? null,
    progress,
    recordsInRange,
    unlockedRecord,
  };
}
