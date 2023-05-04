import { NativeModules, Platform } from 'react-native';
import React from 'react';
import { requireNativeComponent } from 'react-native';
import type * as wyf from './definitions';

var RCTMapView = requireNativeComponent('RCTMapView');

const LINKING_ERROR =
  `The package '@situm/react-native-wayfinding' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

export const SitumWayfindingPlugin = NativeModules.SitumWayfindingPlugin
  ? NativeModules.SitumWayfindingPlugin
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

// Plugin functions:
export function navigateToPoi(poi: wyf.Poi): Promise<void> {
  return SitumWayfindingPlugin.navigateToPoi(poi);
}

// Export WYF interfaces:
export * from './definitions';
// MapView will wrapp the given callbacks so the passed data can be typed:
export class MapView extends React.PureComponent<wyf.MapViewProps> {

  _onMapReady = (event: any) => {
    this.props.onMapReady?.(event.nativeEvent);
  }

  _onFloorChanged = (event: any) => {
    this.props.onFloorChanged?.(event.nativeEvent);
  }

  _onPoiSelected = (event:any) => {
    this.props.onPoiSelected?.(event.nativeEvent);
  }

  _onPoiDeselected = (event:any) => {
    this.props.onPoiDeselected?.(event.nativeEvent);
  }

  _onNavigationRequested = (event:any) => {
    this.props.onNavigationRequested?.(event.nativeEvent);
  }

  _onNavigationStarted = (event:any) => {
    this.props.onNavigationStarted?.(event.nativeEvent);
  }

  _onNavigationFinished = (event:any) => {
    this.props.onNavigationFinished?.(event.nativeEvent);
  }

  _onNavigationError = (event:any) => {
    this.props.onNavigationError?.(event.nativeEvent);
  }

  render() {
    let composedProperties = {
      ...this.props,
      onMapReady: this._onMapReady,
      onFloorChanged: this._onFloorChanged,
      onPoiSelected: this._onPoiSelected,
      onPoiDeselected: this._onPoiDeselected,
      onNavigationRequested: this._onNavigationRequested,
      onNavigationStarted: this._onNavigationStarted,
      onNavigationFinished: this._onNavigationFinished,
      onNavigationError: this._onNavigationError,
    };
    return <RCTMapView { ...composedProperties }/>
  }
}