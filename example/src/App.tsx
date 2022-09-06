import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView } from '@situm/react-native-wayfinding';

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

const App: React.FC = () => {

  const onMapReady = (event: any) => {
    console.log("Map is ready now" + event);
  }

  const onFloorChange = (event: any) => {
    console.log("on floor change detected: " + event);
  }

  const onPoiSelected = (event: any) => {
    console.log("on poi selected detected: " + event);
  }

  const onPoiDeselected = (event: any) => {
    console.log("on poi deselected detected: " + event);
  }

  const onNavigationRequested = (event: any) => {
    console.log("on navigation requested detected: " + event);
  }

  const onNavigationError = (event: any) => {
    console.log("on navigation error detected: " + event);
  }

  const onNavigationFinished = (event: any) => {
    console.log("on navigation finished detected: " + event);
  }

  return <View style={styles.container}>
    <MapView style={styles.mapview}
      user="SITUM_USER"
      apikey="SITUM_APIKEY"
      googleApikey="GOOGLE_MAPS_APIKEY"
      buildingId="PUT_THE_BUILDING_IDENTIFIER_HERE"
      onMapReadyCallback={this.onMapReady}
      onFloorChangeCallback={this.onFloorChange}
      onPoiSelectedCallback={this.onPoiSelected}
      onPoiDeselectedCallback={this.onPoiDeselected}
      onNavigationRequestedCallback={this.onNavigationRequested}
      onNavigationError={this.onNavigationError}
      onNavigationfinished={this.onNavigationFinished}
    />
  </View>

}

export default App;
