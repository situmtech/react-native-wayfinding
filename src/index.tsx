/* eslint-disable */

import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-situm-wayfinding-plugin' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const SitumWayfindingPlugin = NativeModules.SitumWayfindingPlugin  ? NativeModules.SitumWayfindingPlugin  : new Proxy(
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

import PropTypes from 'prop-types';
import React from 'react';
import { requireNativeComponent } from 'react-native';

var RCTMapView = requireNativeComponent('RCTMapView'); // , MapView, {}

export class MapView extends React.PureComponent {
  
  constructor(props:any) {
    super(props);
  }

  static get propTypes() {
    return {
      user: PropTypes.string.isRequired,
      apikey: PropTypes.string.isRequired,
      googleApikey: PropTypes.string.isRequired,
      buildingId: PropTypes.string.isRequired,
      onMapReady: PropTypes.func,
      onFloorChange: PropTypes.func,
      onPoiSelected: PropTypes.func,
      onPoiDeselected: PropTypes.func,
      onNavigationRequested: PropTypes.func,
      onNavigationError: PropTypes.func,
      onNavigationFinished: PropTypes.func
    }
  }
    

    render() {
        return <RCTMapView 
        {...this.props} 
        /> 
    }
    
    
}