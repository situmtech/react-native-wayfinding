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
import { requireNativeComponent } from 'react-native'; // , , Text

var RCTMapView = requireNativeComponent('RCTMapView'); // , MapView, {}

export class MapView extends React.PureComponent {
  
  constructor(props:any) {
    super(props);
    this._onMapReady = this._onMapReady.bind(this);
  }

  static propTypes = {
    user: PropTypes.string.isRequired,
    apikey: PropTypes.string.isRequired,
    googleApiKey: PropTypes.string.isRequired,
    onMapReady: PropTypes.func
  }

  _onMapReady = (event:any) => {
    console.log("Received on map ready message from native");
    if (!this.props.onMapReady) {
      return;
    }

    this.props.onMapReady(event.nativeEvent);
  }
  /*
  _onClick = (event) => {
        if (!this.props.onClick) {
            return;
        }

        // process raw event
        this.props.onClick(event.nativeEvent);
    }
    */

    render() {
        return <RCTMapView 
        {...this.props} 
        onMapReady={this._onMapReady}/> 
        //     {{/*onClick={this._onClick}*/}}
        // return <Text>Hello World 3</Text>
    }
    
    
}





// module.exports = MapView;
