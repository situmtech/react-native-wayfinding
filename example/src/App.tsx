import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView, OnFloorChangedResult, OnNavigationResult, OnPoiDeselectedResult, OnPoiSelectedResult, WayfindingResult } from '@situm/react-native-wayfinding';

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
      <MapView
        style={styles.mapview}
        user="SITUM_USER"
        apikey="SITUM_APIKEY"
        googleApikey="GOOGLE_MAPS_APIKEY"
        buildingId="PUT_THE_BUILDING_IDENTIFIER_HERE"
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
    </View>
  );
};

export default App;
