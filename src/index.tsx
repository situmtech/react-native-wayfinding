import { NativeModules, Platform } from 'react-native';
import React from 'react';
import { requireNativeComponent } from 'react-native';
var RCTMapView = requireNativeComponent('RCTMapView');

const LINKING_ERROR =
  `The package '@situm/react-native-wayfinding' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const SitumWayfindingPlugin = NativeModules.SitumWayfindingPlugin
  ? NativeModules.SitumWayfindingPlugin
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return SitumWayfindingPlugin.multiply(a, b);
}

export interface MapViewProps {
  user: string;
  apikey: string;
  googleApikey: string;
  buildingId: string;
  onMapReady?: (event: any) => void;
  onFloorChange?: (event: any) => void;
  onPoiSelected?: (event: any) => void;
  onPoiDeselected?: (event: any) => void;
  onNavigationRequested?: (event: any) => void;
  onNavigationError?: (event: any) => void;
  onNavigationFinished?: (event: any) => void;
  style?: any;
  iOSMapViewIndex?: string;
  enablePoiClustering?: boolean;
  showPoiNames?: boolean;
  useRemoteConfig?: boolean;
}

export const MapView: React.FC<MapViewProps> = (props : MapViewProps) => (
  <RCTMapView {...props} />
);
