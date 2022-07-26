import * as React from 'react';

import { StyleSheet, View } from 'react-native';
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
