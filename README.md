<p align="center"> <img width="233" src="https://situm.com/wp-content/themes/situm/img/logo-situm.svg" style="margin-bottom:1rem" /> <h1 align="center">@situm/react-native-wayfinding</h1> </p>

<p align="center" style="text-align:center">

Integrate plug&play navigation experience with floorplans, POIs, routes and turn-by-turn directions in no time. with the power of
[SITUM](https://www.situm.com/).

</p>

<div align="center" style="text-align:center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Latest version:](https://img.shields.io/npm/v/@situm/sdk-js/latest)
![Node compatibility:](https://img.shields.io/node/v/@situm/sdk-js)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
![React Native](https://img.shields.io/badge/react--native%40lastest-0.68.2-blueviolet)

</div>

## Introduction <a name="introduction"></a>

Situm SDK is a set of utilities that allow any developer to build location based apps using Situm's indoor positioning system. 
Among many other capabilities, apps developed with Situm SDK will be able to:

1. Obtain information related to buildings where Situm's positioning system is already configured: 
floor plans, points of interest, geotriggered events, etc.
2. Retrieve the location of the smartphone inside these buildings (position, orientation, and floor 
where the smartphone is).
3. Compute a route from a point A (e.g. where the smartphone is) to a point B (e.g. any point of 
interest within the building).
4. Trigger notifications when the user enters a certain area.


In this tutorial, we will guide you step by step to set up your first react-native application using Situm SDK. 
Before starting to write code, we recommend you to set up an account in our Dashboard 
(https://dashboard.situm.es), retrieve your API KEY and configure your first building.

1. Go to the [sign in form](http://dashboard.situm.es/accounts/register) and enter your username 
and password to sign in.
2. Go to the [account section](https://dashboard.situm.es/accounts/profile) and on the bottom, click 
on "generate one" to generate your API KEY.
3. Go to the [buildings section](http://dashboard.situm.es/buildings) and create your first building.
4. Download [Situm Mapping Tool](https://play.google.com/store/apps/details?id=es.situm.maps) 
Android application. With this application you will be able to configure and test Situm's indoor 
positioning system in your buildings.

Perfect! Now you are ready to develop your first indoor positioning application.

## Prerequisites

First, you need to setup a React Native development environment. You will also need a functional React Native app (where you will integrate this plugin). The instructions under section **React Native CLI Quickstart** on this [guide](https://reactnative.dev/docs/environment-setup) will be helpful.

## Installation

```sh
yarn add https://github.com/situmtech/situm-react-native-wayfinding.git
```

## Usage

```js
import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { MapView } from '@situm/react-native-wayfinding';

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
      buildingId = ""

      onMapReadyCallback={this.onMapReady}
      onFloorChangeCallback={this.onFloorChange}
      onPoiSelectedCallback={this.onPoiSelected}
      onPoiDeselectedCallback={this.onPoiDeselected}
      onNavigationRequestedCallback={this.onNavigationRequested}
      onNavigationError={this.onNavigationError}
      onNavigationfinished={this.onNavigationFinished}
      enablePoiClustering={true}
      showPoiNames={true}
      useRemoteConfig={true}
      /* minZoom={18}
      maxZoom={21} */ 
      useDashboardTheme={true}
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

## Configure Google Maps

This plugin uses Google Maps as a base layer, on top of which everything else is drawn: floorplans, routes, user’s location… More concretely, it uses the Dynamic Maps service, which has a [generous free tier](https://developers.google.com/maps/billing-and-pricing/pricing#mobile-dynamic).

First, you should create an API Key for your project. Then, add the API Key to your “AndroidManifest.xml” file:

```
<?xml ...>
<manifest ...>
  <application
  ...>

    <meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="GOOGLE_MAPS_APIKEY" />

    ...
    <activity ...></activity>
  </application>
</manifest>
```

On **iOS** there is nothing else to do rather than including the Google Maps apikey on the javascript side of the app.

## Versioning

Please refer to [CHANGELOG.md](./CHANGELOG.md) for a list of notable changes for each version of the plugin.

You can also see the [tags on this repository](https://github.com/situmtech/situm-react-native-wayfinding/tags).

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