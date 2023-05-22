import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  MapView,
  OnFloorChangedResult,
  OnNavigationResult,
  OnPoiDeselectedResult,
  OnPoiSelectedResult,
  SitumProvider,
  WayfindingResult,
} from '@situm/react-native-wayfinding';
import { SITUM_API_KEY, SITUM_BUILDING_ID, SITUM_EMAIL } from './constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapview: {
    width: '100%',
    height: '100%',
  },
});

const App: React.FC = () => {
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
      <SitumProvider email={SITUM_EMAIL} apiKey={SITUM_API_KEY}>
        <MapView
          style={styles.mapview}
          user={SITUM_EMAIL}
          apikey={SITUM_API_KEY}
          googleApikey="GOOGLE_MAPS_APIKEY"
          buildingId={SITUM_BUILDING_ID}
          onMapReady={onMapReady}
          onFloorChanged={onFloorChanged}
          onPoiSelected={onPoiSelected}
          onPoiDeselected={onPoiDeselected}
          onNavigationRequested={onNavigationRequested}
          onNavigationStarted={onNavigationStarted}
          onNavigationError={onNavigationError}
          onNavigationFinished={onNavigationFinished}
          enablePoiClustering={true}
          showPoiNames={true}
          useRemoteConfig={true}
          initialZoom={18} // Allowed range is [15-21]. Finally max(initialZoom, minZoom).
          maxZoom={21} // [15-21]
          minZoom={16} // [15-21]
          useDashboardTheme={true}
        />
      </SitumProvider>
    </View>
  );
};

export default App;
