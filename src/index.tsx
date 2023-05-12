import { NativeModules, Platform } from 'react-native';
import React from 'react';
import * as wyf from './definitions';
import CustomMapView from './plugin/CustomMapView';
import { SitumProvider } from './plugin';

export { SitumProvider };

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
/*export function multiply(a: number, b: number): Promise<number> {
  return SitumWayfindingPlugin.multiply(a, b);
}*/

// Export WYF interfaces:
export * from './definitions';
// MapView will wrapp the given callbacks so the passed data can be typed:
export class MapView extends React.PureComponent<wyf.MapViewProps> {
  render() {
    return <CustomMapView {...this.props} />;
  }
}
