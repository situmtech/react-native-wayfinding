import { Location, Navigation, Route } from '../store/index';

const mapperWrapper = (type: string, payload: any) =>
  JSON.stringify({ type, payload });

export const mapLocationToMessage = (location: Location) =>
  mapperWrapper('location.update', {
    ...(location.position && {
      latitude: location.position.coordinate.latitude,
      longitude: location.position.coordinate.longitude,
      buildingId: location.position.buildingIdentifier,
      floorId: location.position.floorIdentifier,
      bearing: location.bearing?.degreesClockwise,
      isIndoor: location.position.isIndoor,
      isOutdoor: location.position.isOutdoor,
      accuracy: location.accuracy,
      hasBearing: location.hasBearing,
    }),
    status: location.status,
  });

export const mapDirectionsToMessage = (route: Route) =>
  mapperWrapper('directions.update', route);

export const mapNavigationToMessage = (navigation: Navigation) =>
  mapperWrapper(`navigation.${navigation.status}`, navigation);

export const mapFollowUserToMessage = (follow: boolean) =>
  mapperWrapper('camera.follow_user', follow);
