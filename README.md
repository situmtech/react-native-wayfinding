# react-native-situm-wayfinding-plugin
Integrate plug&play navigation experience with floorplans, POIs, routes and turn-by-turn directions in no time.

## Installation

```sh
npm install react-native-situm-wayfinding-plugin
```

## Usage

```js
import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { MapView } from 'react-native-situm-wayfinding-plugin';

export default function App() {

  onMapReady = (event: any) => {
    console.log("Map is ready now" + event);
  }

  onFloorChange = (event: any) => {
    console.log("on floor change detected: " + event);
  }

  onPoiSelected = (event: any) => {
    console.log("on poi selected detected: " + event);
  }

  onPoiDeselected = (event: any) => {
    console.log("on poi deselected detected: " + event);
  }

  onNavigationRequested = (event: any) => {
    console.log("on navigation requested detected: " + event);
  }

  onNavigationError = (event: any) => {
    console.log("on navigation error detected: " + event);
  }

  onNavigationFinished = (event: any) => {
    console.log("on navigation finished detected: " + event);
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.mapview} 
      user="SITUM_USER" 
      apikey="SITUM_APIKEY" 
      googleApikey="GOOGLE_MAPS_APIKEY"
      onMapReadyCallback={this.onMapReady}
      onFloorChangeCallback={this.onFloorChange}
      onPoiSelectedCallback={this.onPoiSelected}
      onPoiDeselectedCallback={this.onPoiDeselected}
      onNavigationRequestedCallback={this.onNavigationRequested}
      onNavigationError={this.onNavigationError}
      onNavigationfinished={this.onNavigationFinished}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapview: {
    width: '100%',
    height: '100%',
  }
});

```

## Permissions

In order to work correctly the user will have to confirm the use of location and bluetooth services.

On Android this is handled automatically by the plugin.

On iOS you will need to include a pair of keys and its descriptions on the Info.plist file of the native .xcworkspace project. See below:

NSLocationAlwaysAndWhenInUseUsageDescription : Location is required to find out where you are
NSBluetoothAlwaysUsageDescription            : Bluetooth is required to find where you are

If these keys are not included in your native iOS project location will not work properly.

## Google Maps Apikey

This plugin uses google maps internally. You will need an apikey to use it.

On Android you need to include it on AndroidManifest.xml file as following:

<meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="GOOGLE_MAPS_APIKEY" />

On iOS there is nothing else to do rather than including the Google Maps apikey on the javascript side of the app.

## Versioning

Please refer to [CHANGELOG.md](./CHANGELOG.md) for a list of notable changes for each version of the plugin.

You can also see the [tags on this repository](https://github.com/situmtech/situm-android-getting-started/tags).

---

## Submitting contributions

You will need to sign a Contributor License Agreement (CLA) before making a submission. [Learn more here](https://situm.com/contributions/). 

---
## License
This project is licensed under the MIT - see the [LICENSE](./LICENSE) file for further details.

---

## More information

More info is available at our [Developers Page](https://situm.com/docs/01-introduction/).

---

## Support information

For any question or bug report, please send an email to [support@situm.es](mailto:support@situm.es)

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
