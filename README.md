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

On the root folder of your project, execute:

```sh
yarn add https://github.com/situmtech/situm-react-native-wayfinding.git
```

or:

```sh
npm install https://github.com/situmtech/situm-react-native-wayfinding.git
```

### Situm repository (Android only)

To allow Gradle to compile your Android application, add the Situm artifact repository to the `build.gradle` file at the root of your project:

```groovy
buildScript {
  // ...
}

allprojects {
    repositories {
        // ...
        maven { url "https://repo.situm.es/artifactory/libs-release-local" }
    }
}
```

### Permissions

In order to work correctly the user will have to confirm the use of location and Bluetooth services.

* In Android, this is handled automatically by the plugin.
* In iOS, you will need to include a pair of keys and its descriptions on the Info.plist file of the native .xcworkspace project. See below:
  * NSLocationAlwaysAndWhenInUseUsageDescription : Location is required to find out where you are
  * NSBluetoothAlwaysUsageDescription            : Bluetooth is required to find where you are

### Configure Google Maps APIKEYs

This plugin uses Google Maps as a base layer, on top of which everything else is drawn: floorplans, routes, user’s location… More concretely, it uses the Dynamic Maps service, which has a [generous free tier](https://developers.google.com/maps/billing-and-pricing/pricing#mobile-dynamic).

First, you should create an API Key for your project. Then, on **Android** add the API Key to your “android/src/main/AndroidManifest.xml” file:

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

On **iOS** there is nothing else to do rather than including the Google Maps APIKEY on the Javascript side of the app (see below).


## Usage

Copy & paste this in your App.tsx or App.js file for a quick start!

```js
import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { MapView, OnFloorChangedResult, OnNavigationResult, OnPoiDeselectedResult, OnPoiSelectedResult, WayfindingResult } from '@situm/react-native-wayfinding';

export default function App() {

  const onMapReady = (event: WayfindingResult) => {
    console.log('Map is ready now' + JSON.stringify(event));
  };

  const onFloorChanged = (event: OnFloorChangedResult) => {
    console.log('on floor change detected: ' + JSON.stringify(event));
  };

  const onPoiSelected = (event: OnPoiSelectedResult) => {
    console.log('on poi selected detected: ' + JSON.stringify(event));
  };

  const onPoiDeselected = (event: OnPoiDeselectedResult) => {
    console.log('on poi deselected detected: ' + JSON.stringify(event));
  };

  const onNavigationRequested = (event: OnNavigationResult) => {
    console.log('on navigation requested detected: ' + JSON.stringify(event));
  };

  const onNavigationStarted = (event: OnNavigationResult) => {
    console.log('on navigation started detected: ' + JSON.stringify(event));
  };

  const onNavigationError = (event: OnNavigationResult) => {
    console.log('on navigation error detected: ' + JSON.stringify(event));
  };

  const onNavigationFinished = (event: OnNavigationResult) => {
    console.log('on navigation finished detected: ' + JSON.stringify(event));
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.mapview} 
      user="SITUM_USER" //Your Situm user account (e.g. user@email.com)
      apikey="SITUM_APIKEY" //Your Situm APIKEY
      googleApikey="GOOGLE_MAPS_APIKEY" //Your Google APIKEY (see previous section)
      buildingId = "BUILDING_ID" //The identifier of the building where you want to center the view (e.g. "1234")

      onMapReady={onMapReady} //Called when the maps is ready
      onFloorChanged={onFloorChanged} //Called when the user moves to another floor
      onPoiSelected={onPoiSelected} //Called when the user selects a POI
      onPoiDeselected={onPoiDeselected} //Called when the user de-selects a POI
      onNavigationRequested={onNavigationRequested} //Called when the user requests a route / navigation
      onNavigationStarted={onNavigationStarted} // Called when the navigation starts
      onNavigationError={onNavigationError} //Called when the route / navigation stops unexpectedly
      onNavigationFinished={onNavigationFinished} //Called when the route / navigation finishes
      enablePoiClustering={true} //Clusters close POIs together
      showPoiNames={true} //Shows the POI name on top of each POI
      useRemoteConfig={true} // Use the Remote Configuration
      initialZoom={18} //Initial zoom level (Android Only)
      minZoom={16} //Minimum zoom level (user can't zoom out further)
      maxZoom={21} //Maximum zoom level (user can't zoom in further)
      useDashboardTheme={true} //Use the primary color & logo of your organization as configured in Situm Dashboard
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

## API

This plugin is just a (partial) wrapper over our native Android / iOS Situm WYF module. Therefore, you should take a look at [it's documentation](https://situm.com/docs/situm-wyf-introduction-requirements-code-examples-and-more) to have an understanding of how it works and the configurations that can be applied. You will also benefit from taking a look at our SDKs documentation, which Situm WYF uses heavily. Specifically, concepts about [positioning](https://situm.com/docs/mobile-sdks-positioning), [cartography](https://situm.com/docs/sdk-cartography), [routes](https://situm.com/docs/sdk-routes), [navigation](https://situm.com/docs/sdk-navigation) and [remote configuration](https://situm.com/docs/sdk-remote-configuration).

### `MapView` Properties

|  | Type | Default | Description |
| - | - | - | - |
| **`user`** | `string` | - | Your Situm user account (e.g. user@email.com) |
| **`apikey`** | `string` | - | Your Situm [APIKEY](https://situm.com/docs/registration-account-management/#profile-manage-account-language-and-api-keys) |
| **`googleApikey`** | `string` | - | Your Google APIKEY (see previous section) |
| **`buildingId`** | `string` | - | The identifier of the building where you want to center the view (e.g. "1234"). More [info](https://situm.com/docs/sdk-cartography/#sdk-buildings). |
| **`enablePoiClustering`** | `boolean` | `true` | Clusters close POIs together. More [info](https://situm.com/docs/static-ui-settings/#poi-clustering). |
| **`showPoiNames`** | `boolean` | `true` | Shows the POI name on top of each POI. More [info](https://situm.com/docs/static-ui-settings/#show-hide-poi-names). |
| **`useRemoteConfig`** | `boolean` | `true` | Use the Remote Configuration. More [info](https://situm.com/docs/remote-configuration/). |
| **`initialZoom`** | `number` [15-21] | 18 | Initial zoom level. More [info](https://situm.com/docs/static-ui-settings/#zoom-level). |
| **`minZoom`** | `number` [15-21] | - | Minimum zoom level (user can't zoom out further). More [info](https://situm.com/docs/static-ui-settings/#zoom-level). |
| **`maxZoom`** | `number` [15-21] | - | Maximum zoom level (user can't zoom in further). More [info](https://situm.com/docs/static-ui-settings/#zoom-level). |
| **`useDashboardTheme`** | `boolean` | `true` | Use the primary color & logo of your organization as configured in Situm Dashboard. More [info](https://situm.com/docs/static-ui-settings/#accounts-name). |

### Callbacks

| Callback              | Data  | Description |
| --------------------- | ----- | ---- |
| **`onMapReady`** | `WayfindingResult` | Map has been loaded |
| **`onFloorChanged`** | `OnFloorChangedResult` | User has moved from one floor to another |
| **`onPoiSelected`** | `OnPoiSelectedResult` | User has selected a POI |
| **`onPoiDeselected`** | `OnPoiDeselectedResult` | User has deselected a POI |
| **`onNavigationRequested`** | `OnNavigationResult` | User has requested a route |
| **`onNavigationStarted`** | `OnNavigationResult` | Navigation has started |
| **`onNavigationError`** | `OnNavigationResult` | Route could not be computed or navigation finished unexpectedly |
| **`onNavigationfinished`** | `OnNavigationResult` |  User has reached its destination point |

### Interfaces

#### WayfindingResult

|  Prop | Type |  Description |
| - | - | - |
| **`status`** | `String` | "SUCCESS" when the map is ready |
| **`message`** | `String` | Human readable message |

#### OnPoiSelectedResult

|  Prop | Type |  Description |
| - | - | - |
| **`buildingId`** | `String` | ID of the building where the POI was selected |
| **`buildingName`** | `String` | Name of the building where the POI was selected |
| **`floorId`** | `String` |  ID of the floor where the POI was selected |
| **`floorName`** | `String` |  Name of the floor where the POI was selected |
| **`poiId`** | `String` |  ID of the POI that was selected |
| **`poiName`** | `String` |  Name of the POI that was selected |

#### OnPoiDeselectedResult

|  Prop | Type |  Description |
| - | - | - |
| **`buildingId`** | `String` | ID of the building where the POI was deselected |
| **`buildingName`** | `String` | Name of the building where the POI was deselected |

#### OnFloorChangedResult

|  Prop | Type |  Description |
| - | - | - |
| **`buildingId`** | `String` | ID of the building where the floor change happened |
| **`buildingName`** | `String` |  Name of the building where the floor change happened |
| **`fromFloorId`** | `String` | ID of the floor from which the user moved |
| **`toFloorId`** | `String` | ID of the floor to which the user moved |
| **`fromFloorName`** | `String` | Name of the floor from which the user moved |
| **`toFloorName`** | `String` | Name of the floor to which the user moved |

#### Point

|  Prop | Type | Description |
| - | - | - |
| **`buildingId`** | `String` | ID of the building where the point is |
| **`floorId`** | `String` | ID of the floor where the point is |
| **`latitude`** | `Number` | Latitude where the point is in WSG84 |
| **`longitude`** | `Number` | Longitude where the point is in WSG84 |

#### Destination

|  Prop | Type | Description |
| - | - | - |
| **`category`** | `String` | Type of destination. Options: "POI" or "LOCATION" |
| **`identifier`** | `String?` | (Optional) POI identifier (only when category="POI") |
| **`name`** | `String?` | (Optional) POI name (only when category="POI") |
| **`point`** | `Point?` | Destination point |

#### Navigation

|  Prop | Type | Description |
| - | - | - |
| **`status`** | `String` | Status of the navigation request. Options: "REQUESTED" (navigation has been requested, received by "onNavigationRequested" callback), "CANCELED" (navigation stopped by the user, received by "onNavigationFinished" callback), "DESTINATION_REACHED" (user has arrived to the destination, received by "onNavigationFinished" callback)
| **`destination`** | `Destination` | Destination of the navigation |

#### OnNavigationResult

|  Prop | Type | Description |
| - | - | - |
| **`navigation`** | `Navigation` | Result of the navigation provided to callbacks "onNavigationRequested" and "onNavigationFinished" callbacks |
| **`error`** | `Error?` | (Optional) Error detected during the navigation |

#### Error

|  Prop | Type |
| - | - |
| **`code`** | `Number` |
| **`message`** | `String` |

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
