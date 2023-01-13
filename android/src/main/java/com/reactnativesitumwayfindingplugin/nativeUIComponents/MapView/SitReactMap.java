package com.reactnativesitumwayfindingplugin.nativeUIComponents.MapView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.reactnativesitumwayfindingplugin.nativeUIComponents.ReactMessage.ReactMessage;

import es.situm.sdk.model.cartography.Building;
import es.situm.sdk.model.cartography.Floor;
import es.situm.sdk.model.cartography.Poi;
import es.situm.sdk.model.cartography.Point;
import es.situm.wayfinding.navigation.Destination;
import es.situm.wayfinding.navigation.Navigation;
import es.situm.wayfinding.navigation.NavigationError;

class SitReactMap implements ReactMessage {

  private final WritableNativeMap innerMap = new WritableNativeMap();

  public SitReactMap putNull(@NonNull String key) {
    innerMap.putNull(key);
    return this;
  }

  public SitReactMap putBoolean(@NonNull String key, boolean value) {
    innerMap.putBoolean(key, value);
    return this;
  }

  public SitReactMap putDouble(@NonNull String key, double value) {
    innerMap.putDouble(key, value);
    return this;
  }

  public SitReactMap putInt(@NonNull String key, int value) {
    innerMap.putInt(key, value);
    return this;
  }

  public SitReactMap putString(@NonNull String key, @Nullable String value) {
    innerMap.putString(key, value);
    return this;
  }

  public SitReactMap putArray(@NonNull String key, @Nullable ReadableArray value) {
    innerMap.putArray(key, value);
    return this;
  }

  public SitReactMap putMap(@NonNull String key, @Nullable ReadableMap value) {
    innerMap.putMap(key, value);
    return this;
  }

  // Mappings:

  public SitReactMap putFloorChangeResult(Floor from, Floor to, Building building) {
    putString(FROM_FLOOR_ID, from.getIdentifier());
    putString(TO_FLOOR_ID, to.getIdentifier());
    putString(FROM_FLOOR_NAME, from.getName());
    putString(TO_FLOOR_NAME, to.getName());
    putString(BUILDING_ID, building.getIdentifier());
    return this;
  }

  public SitReactMap putPoiSelectedResult(Poi poi, Floor floor, Building building) {
    putString(BUILDING_ID, building.getIdentifier());
    putString(BUILDING_NAME, building.getName());
    putString(FLOOR_ID, floor.getIdentifier());
    putString(FLOOR_NAME, floor.getName());
    putString(POI_ID, poi.getIdentifier());
    putString(POI_NAME, poi.getName());
    return this;
  }

  public SitReactMap putPoiDeselectedResult(Building building) {
    putString(BUILDING_ID, building.getIdentifier());
    putString(BUILDING_NAME, building.getName());
    return this;
  }

  public SitReactMap putNavigationResult(Navigation navigation, @Nullable NavigationError error) {
    putNavigation(NAVIGATION, navigation);
    if (error == null) {
      putNull(ERROR);
    } else {
      putNavigationError(ERROR, error);
    }
    return this;
  }

  public SitReactMap putNavigation(String key, Navigation navigation) {
    // Navigation. TODO: add native mappings.
    innerMap.putMap(key, new SitReactMap()
      .putString(STATUS, navigation.getStatus().name())
      .putDestination(DESTINATION, navigation.getDestination())
      .getMap());
    return this;
  }

  public SitReactMap putNavigationError(String key, NavigationError error) {
    // Navigation. TODO: add native mappings.
    innerMap.putMap(key, new SitReactMap()
      .putInt(CODE, error.getCode())
      .putString(MESSAGE, error.getMessage()).getMap());
    return this;
  }

  public SitReactMap putDestination(String key, Destination destination) {
    // Destination. TODO: add native mappings.
    innerMap.putMap(key, new SitReactMap()
      .putString(CATEGORY, destination.getCategory().name())
      .putString(IDENTIFIER, destination.getIdentifier())
      .putString(NAME, destination.getName())
      .putPoint(POINT, destination.getPoint())
      .getMap());
    return this;
  }

  public SitReactMap putPoint(String key, Point point) {
    innerMap.putMap(key, new SitReactMap()
      .putString(BUILDING_ID, point.getBuildingIdentifier())
      .putString(FLOOR_ID, point.getFloorIdentifier())
      .putDouble(LAT, point.getCoordinate().getLatitude())
      .putDouble(LNG, point.getCoordinate().getLongitude())
      .getMap());
    return this;
  }

  public WritableNativeMap getMap() {
    return innerMap;
  }
}
