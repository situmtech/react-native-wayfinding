import { useEffect, useRef, useState } from 'react';
import SitumPlugin, {
  Building,
  BuildingInfo,
  Poi,
  //@ts-ignore
} from 'react-native-situm-plugin';
import {
  PositioningStatus,
  Position,
  State,
  NavigationUpdateType,
  NavigationStatus,
  Navigation,
  selectIsSDKInitialized as selectIsSdkInitialized,
  setSdkInitialized,
  setAuth,
  selectUser,
} from '../store/index';
import { useDispatch, useSelector } from '../store/utils';
import {
  resetLocation,
  selectBuildings,
  selectCurrentBuilding,
  selectLocation,
  selectNavigation,
  selectPois,
  selectDirections,
  selectSubscriptionId,
  setBuildings,
  setCurrentBuilding,
  setLocation,
  setLocationStatus,
  setNavigation,
  setPois,
  setRoute,
  setSubscriptionId,
} from '../store/index';
import requestPermission from '../utils/requestPermission';

const defaultNavigationOptions = {
  distanceToGoalThreshold: 4,
  outsideRouteThreshold: 5,
};

export interface LocationStatus {
  statusName: string;
  statusCode: number;
}

// Hook to define references that point to functions
// used on listeners. These references are updated whenever
// one of the dependencies on the array change
const useCallbackRef = <T>(fn: T, deps: any[]) => {
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, deps);

  return fnRef;
};

const useSitum = () => {
  const dispatch = useDispatch();
  const isSdkInitialized = useSelector(selectIsSdkInitialized);
  const user = useSelector(selectUser);
  const location = useSelector(selectLocation);
  const subscriptionId = useSelector(selectSubscriptionId);
  const buildings = useSelector(selectBuildings);
  const currentBuilding = useSelector(selectCurrentBuilding);
  const pois = useSelector(selectPois);
  const directions = useSelector(selectDirections);
  const navigation = useSelector(selectNavigation);
  const [lockDirections, setLockDirections] = useState<boolean>(false);

  const initSitumSdk = async ({
    email,
    apiKey,
    withPosition,
    fetch,
  }: {
    email?: string;
    apiKey?: string;
    withPosition?: boolean;
    fetch?: boolean;
  }) =>
    new Promise<void>(async (resolve, reject) => {
      if (!isSdkInitialized) {
        SitumPlugin.initSitumSDK();
        //@ts-ignore
        setSdkInitialized(true);
      }

      if (email && apiKey) {
        //@ts-ignore
        dispatch(setAuth({ email, apiKey }));
      } else {
        email = user.email;
        apiKey = user.apiKey;
      }

      SitumPlugin.setApiKey(email, apiKey, (response: any) => {
        if (response && Boolean(response.success) === true) {
          console.info('\u2713 Successful authentication.');
        } else {
          reject('Failure while authenticating.');
        }
      });

      SitumPlugin.setUseRemoteConfig('true', () => {});

      withPosition &&
        (await requestPermission()
          .then(() => {
            subscriptionId === undefined && startPositioning();
          })
          .catch((e: string) => {
            console.error(e);
            reject(e);
          }));

      fetch &&
        (await initializeBuildings().catch((e: string) => {
          console.error(e);
          reject(e);
        }));

      resolve();
    });

  // Cartography
  const initializeBuildings = async () =>
    new Promise<Building[]>((resolve, reject) => {
      console.log('Retrieving buildings from Situm Dashboard');
      SitumPlugin.fetchBuildings(
        (buildingArray: Building[]) => {
          //@ts-ignore
          dispatch(setBuildings(buildingArray));
          console.info('\u2713 Successfully retrieved buildings.');
          resolve(buildingArray);
        },
        (error: string) => {
          console.error(`Could not retrieve buildings: ${error}`);
          reject(`Could not retrieve buildings: ${error}`);
        }
      );
    });

  const initializeBuildingById = async (buildingId: string) => {
    if (buildings.length == 0) return;
    const newBuilding = buildings.find(
      (b: Building) => b.buildingIdentifier === buildingId
    );
    if (newBuilding) {
      //@ts-ignore
      dispatch(setCurrentBuilding(newBuilding));
      initializeBuildingPois(newBuilding);
    } else {
      console.warn(`No building found for id ${buildingId}`);
    }
  };

  const initializeBuilding = async (b: Building) => {
    //@ts-ignore
    dispatch(setCurrentBuilding(b));
    initializeBuildingPois(b);
  };

  const initializeBuildingPois = (b: Building) => {
    SitumPlugin.fetchBuildingInfo(
      b,
      (buildingInfo: BuildingInfo) => {
        console.info(
          '\u2713 Successfully retrieved pois of the selected building. '
        );
        const buildingPois =
          buildingInfo?.indoorPOIs || buildingInfo?.indoorPois || [];
        //@ts-ignore
        dispatch(setPois(buildingPois));
      },
      (error: string) => {
        console.error(`Could not initialize building pois: ${error}`);
      }
    );
  };

  const startPositioning = () => {
    console.debug('Starting positioning');

    if (subscriptionId !== undefined) {
      console.warn('Positioning has already started');
      return;
    }

    // Declare the locationOptions (empty = default parameters)
    const locationOptions = {};
    // Start positioning
    const newId = SitumPlugin.startPositioning(
      (newLocation: State['location']) => {
        dispatch(
          //@ts-ignore
          setLocation({
            ...newLocation,
            status: PositioningStatus.POSITIONING,
          })
        );
      },
      (status: LocationStatus) => {
        if (status.statusName in PositioningStatus) {
          console.debug(`Positioning state updated ${status.statusName}`);
          if (status.statusName === PositioningStatus.STOPPED) {
            stopPositioningRef.current();
          } else {
            //@ts-ignore
            dispatch(setLocationStatus(status.statusName as PositioningStatus));
          }
        }
      },
      (error: string) => {
        console.error(`Error while positioning: ${error}}`);
        stopPositioningRef.current();
      },
      locationOptions
    );
    //@ts-ignore
    dispatch(setSubscriptionId(newId));
    console.info(`\u2713 Successfully started positioning [id] => ${newId}`);
  };

  const stopPositioning = async () => {
    console.debug(`Stopping positioning => id: ${subscriptionId}`);
    SitumPlugin.stopPositioning(subscriptionId, (success: boolean) => {
      if (success) {
        //@ts-ignore
        dispatch(resetLocation());
        console.info('\u2713 Successfully stopped positioning');
      } else {
        console.error('Could not stop positioning');
      }
    });
  };

  const stopPositioningRef = useCallbackRef(stopPositioning, [subscriptionId]);

  // Routes
  const requestDirections = async (
    building: Building,
    from: Position,
    to: Position,
    directionsOptions?: any
  ): Promise<State['route']> => {
    console.debug('Requesting directions');
    const points = [
      {
        floorIdentifier: from.floorIdentifier,
        buildingIdentifier: from.buildingIdentifier,
        coordinate: from.coordinate,
      },
      {
        floorIdentifier: to.floorIdentifier,
        buildingIdentifier: to.buildingIdentifier,
        coordinate: to.coordinate,
      },
    ];

    return new Promise((resolve, reject) => {
      SitumPlugin.requestDirections(
        [building, ...points, { ...directionsOptions }],
        (newRoute: State['route']) => {
          console.info('\u2713 Successfully computed route');
          resolve(newRoute);
        },
        (error: string) => {
          console.error(`Could not compute route: ${error}`);
          reject(error);
        }
      );
    });
  };

  const calculateRoute = async ({
    originId,
    destinationId,
    directionsOptions,
    updateRoute = true,
  }: {
    originId: number;
    destinationId: number;
    directionsOptions?: any;
    updateRoute?: boolean;
  }) => {
    const poiOrigin = pois.find(
      (p: Poi) => p.identifier === originId.toString()
    );
    const poiDestination = pois.find(
      (p: Poi) => p.identifier === destinationId.toString()
    );

    if (!poiDestination || (!poiOrigin && originId !== -1) || lockDirections) {
      console.debug(
        `Could not compute route for origin: ${originId} or destination: ${destinationId} (lockDirections: ${lockDirections})`
      );
      return;
    }

    const from =
      originId === -1 && location
        ? location.position!
        : {
            buildingIdentifier: poiOrigin.buildingIdentifier,
            floorIdentifier: poiOrigin.floorIdentifier,
            cartesianCoordinate: poiOrigin.cartesianCoordinate,
            coordinate: poiOrigin.coordinate,
          };

    const to = {
      buildingIdentifier: poiDestination.buildingIdentifier,
      floorIdentifier: poiDestination.floorIdentifier,
      cartesianCoordinate: poiDestination.cartesianCoordinate,
      coordinate: poiDestination.coordinate,
    };

    // iOS workaround -> does not allow for several direction petitions
    setLockDirections(true);
    return requestDirections(currentBuilding, from, to, directionsOptions)
      .then((r: State['route']) => {
        const extendedRoute = {
          ...r,
          originId,
          destinationId,
          type: directionsOptions?.accessibilityMode,
        };
        //@ts-ignore
        updateRoute && dispatch(setRoute(extendedRoute));
        return directions;
      })
      .catch((e: string) => {
        //@ts-ignore
        dispatch(setRoute({ error: JSON.stringify(e) }));
      })
      .finally(() => setLockDirections(false));
  };

  // Navigation
  const startNavigation = async ({
    originId,
    destinationId,
    directionsOptions,
    navigationOptions,
  }: {
    originId: number;
    destinationId: number;
    navigationOptions?: any;
    directionsOptions?: any;
    updateRoute?: boolean;
  }) => {
    calculateRoute({
      originId,
      destinationId,
      directionsOptions,
      updateRoute: false,
    }).then((r) => {
      if (originId !== -1 || !location || !r) {
        return;
      }
      dispatch(
        //@ts-ignore
        setNavigation({
          status: NavigationStatus.START,
          ...r,
        })
      );
      SitumPlugin.requestNavigationUpdates(
        (update: Navigation) => {
          const newNavType =
            (update.type &&
              update.type in NavigationUpdateType &&
              NavigationUpdateType[
                update.type as keyof typeof NavigationUpdateType
              ]) ||
            NavigationUpdateType.progress;
          dispatch(
            //@ts-ignore
            setNavigation({
              currentIndication: update?.currentIndication,
              routeStep: update?.routeStep,
              distanceToGoal: update?.distanceToGoal,
              points: update?.points,
              type: newNavType,
              segments: update?.segments,
              status: NavigationStatus.UPDATE,
            })
          );
        },
        (error: string) => {
          console.error(`Could not update navigation: ${error}`);
          stopNavigationRef.current();
        },
        { ...defaultNavigationOptions, ...navigationOptions }
      );
    });
  };

  const stopNavigation = (): void => {
    console.debug('Stopping navigation');
    if (!navigation || navigation.status === NavigationStatus.STOP) {
      return;
    }
    SitumPlugin.removeNavigationUpdates((response: any) => {
      if (response && response.success) {
        console.debug('\u2713 Successfully removed navigation updates');
      } else {
        console.error('Could not remove navigation updates');
      }
    });
    //@ts-ignore
    dispatch(setNavigation({ status: NavigationStatus.STOP }));
  };

  const stopNavigationRef = useCallbackRef(stopNavigation, [navigation]);

  useEffect(() => {
    if (
      !navigation ||
      navigation.status === NavigationStatus.STOP ||
      !location
    ) {
      return;
    }
    SitumPlugin.updateNavigationWithLocation(
      location,
      (info: any) => {
        console.info(info);
      },
      (e: string) => {
        console.error(`Error on navigation update ${e}`);
      }
    );
  }, [location]);

  return {
    // States
    user,
    location,
    currentBuilding,
    buildings,
    pois,
    directions,
    navigation,

    // Functions
    initSitumSdk,
    initializeBuildings,
    initializeBuilding,
    initializeBuildingById,
    startPositioning,
    stopPositioning,
    calculateRoute,
    startNavigation,
    stopNavigation,
  };
};

export default useSitum;
