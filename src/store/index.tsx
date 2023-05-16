import React, { createContext, useReducer } from 'react';
import { createReducer } from './utils';
//@ts-ignore
import { Building, Poi } from 'react-native-situm-plugin';

export interface Location {
  position?: Position;
  accuracy?: number;
  bearing?: {
    degrees: number;
    degreesClockwise: number;
  };
  hasBearing?: boolean;
  status: PositioningStatus;
}

export interface Position {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  cartesianCoordinate: {
    x: number;
    y: number;
  };
  isIndoor?: boolean;
  isOutdoor?: boolean;
  buildingIdentifier?: string;
  floorIdentifier?: string;
}

export enum PositioningStatus {
  STARTING = 'STARTING',
  CALCULATING = 'CALCULATING',
  // This status will always be sent to mapviewer-web, in case we recieve
  // a location from SDK.
  POSITIONING = 'POSITIONING',
  USER_NOT_IN_BUILDING = 'USER_NOT_IN_BUILDING',
  STOPPED = 'STOPPED',
}

export interface Navigation {
  //closestPositionInRoute: any;
  currentIndication?: any;
  //currentStepIndex:number;
  //distanceToEndStep: number;
  distanceToGoal?: number;
  //nextIndication: any;
  points?: any;
  routeStep: any;
  segments?: any;
  route?: Route;
  //timeToEndStep: number;
  //timeToGoal: number;
  type?: NavigationUpdateType;
  status: NavigationStatus;
}

export enum NavigationStatus {
  START = 'start',
  STOP = 'stop',
  UPDATE = 'update',
}

export enum NavigationUpdateType {
  'progress' = 'progress',
  'userOutsideRoute' = 'out_of_route',
  'destinationReached' = 'destination_reached',
}

// TODO: add types
export interface Route {}

interface User {
  email?: string;
  apiKey?: string;
}

export interface State {
  sdkInitialized: boolean;
  user?: User;
  subscriptionId?: number;
  location?: Location;
  buildings: Building[];
  currentBuilding: Building;
  pois: Poi[];
  route?: Route;
  navigation?: Navigation;
}

export const initialState: State = {
  sdkInitialized: false,
  user: undefined,
  subscriptionId: undefined,
  location: { status: PositioningStatus.STOPPED },
  buildings: [],
  currentBuilding: undefined,
  pois: [],
  route: undefined,
  //navigation: {status: NavigationStatus.STOP},
};

export const SitumContext = createContext<
  { state: State; dispatch: React.Dispatch<(s: State) => State> } | undefined
>(undefined);

const Reducer = createReducer<State>({
  setSdkInitialized: (state: State, payload: State['sdkInitialized']) => {
    return { ...state, sdkInitialized: payload };
  },
  setAuth: (state: State, payload: State['user']) => {
    return { ...state, user: payload };
  },
  setSubscriptionId: (state: State, payload: State['subscriptionId']) => {
    return { ...state, subscriptionId: payload };
  },
  setLocation: (state: State, payload: State['location']) => {
    return { ...state, location: payload };
  },
  setLocationStatus: (state: State, payload: PositioningStatus) => {
    return { ...state, location: { ...state.location, status: payload } };
  },
  resetLocation: (state: State) => {
    return {
      ...state,
      location: initialState.location,
      subscriptionId: initialState.subscriptionId,
    };
  },
  setBuildings: (state: State, payload: State['buildings']) => {
    return { ...state, buildings: payload };
  },
  setCurrentBuilding: (state: State, payload: State['currentBuilding']) => {
    return { ...state, currentBuilding: payload };
  },
  setPois: (state: State, payload: State['pois']) => {
    return { ...state, pois: payload };
  },
  setRoute: (state: State, payload: State['route']) => {
    return { ...state, route: payload };
  },
  setNavigation: (state: State, payload: State['navigation']) => {
    return { ...state, navigation: payload };
  },
});

export const selectIsSDKInitialized = (state: State) => {
  return state.sdkInitialized;
};

export const selectUser = (state: State) => {
  return state.user;
};

export const selectLocation = (state: State) => {
  return state.location;
};

export const selectSubscriptionId = (state: State) => {
  return state.subscriptionId;
};

export const selectBuildings = (state: State) => {
  return state.buildings;
};

export const selectCurrentBuilding = (state: State) => {
  return state.currentBuilding;
};

export const selectPois = (state: State) => {
  return state.pois;
};

export const selectRoute = (state: State) => {
  return state.route;
};

export const selectNavigation = (state: State) => {
  return state.navigation;
};

export const {
  setSdkInitialized,
  setAuth,
  setSubscriptionId,
  setLocation,
  setLocationStatus,
  resetLocation,
  setBuildings,
  setCurrentBuilding,
  setPois,
  setRoute,
  setNavigation,
} = Reducer.actions;

export const SitumProvider: React.FC<
  React.PropsWithChildren<{
    email?: string;
    apiKey?: string;
  }>
> = ({ email, apiKey, children }) => {
  const [state, dispatch] = useReducer(Reducer.reducer, {
    ...initialState,
    user: { email, apiKey },
  });

  return (
    <SitumContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </SitumContext.Provider>
  );
};
