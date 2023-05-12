import React from 'react';
import { StyleSheet } from 'react-native';
import {
  MapView,
  OnFloorChangedResult,
  OnNavigationResult,
  OnPoiDeselectedResult,
  OnPoiSelectedResult,
  WayfindingResult,
} from '@situm/react-native-wayfinding';
import { SITUM_EMAIL, SITUM_API_KEY } from './App';

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

const MapViewScreen: React.FC = () => {
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
  const SITUM_BASE_DOMAIN = 'https://map-viewer.situm.com';

  return (
    <MapView
      domain={SITUM_BASE_DOMAIN}
      building={null}
      style={styles.mapview}
      user={SITUM_EMAIL}
      apikey={SITUM_API_KEY}
      googleApikey="GOOGLE_MAPS_APIKEY"
      buildingId="YOUR BUILDING ID HERE"
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
  );
};

export default MapViewScreen;
