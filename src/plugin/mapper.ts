import { Location, Navigation, Route } from './useSitum/store/index';

const mapperWrapper = (type: string, payload: any) =>
  JSON.stringify({type, payload});

export const Mapper = {
  location: (location: Location) =>
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
    }),
  route: (route: Route) => mapperWrapper('directions.update', route),
  navigation: (navigation: Navigation) =>
    mapperWrapper(`navigation.${navigation.status}`, navigation),
  followUser: (follow: boolean) => mapperWrapper('camera.follow_user', follow),
};
