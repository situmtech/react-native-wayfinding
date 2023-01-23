package com.reactnativesitumwayfindingplugin.nativeUIComponents.MapView;

import android.content.Context;
import android.view.LayoutInflater;

import androidx.annotation.NonNull;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.reactnativesitumwayfindingplugin.R;
import com.reactnativesitumwayfindingplugin.nativeUIComponents.ReactMessage.ReactMessage;

import java.util.Map;

public class MapViewManager extends SimpleViewManager<MapView> {

  public static final String REACT_CLASS = "RCTMapView";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @NonNull
  @Override
  public MapView createViewInstance(ThemedReactContext context) {
    LayoutInflater inflater = (LayoutInflater)
      context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    // Inflate the layout containing the target view.
    return (MapView) inflater.inflate(
      R.layout.situm_react_native_map_view_layout, null, false);
  }

  @ReactProp(name = "user")
  public void setUser(MapView view, String user) {
    view.setUser(user);
  }

  @ReactProp(name = "apikey")
  public void setApikey(MapView view, String apikey) {
    view.setApikey(apikey);
  }

  @ReactProp(name = "buildingId")
  public void setBuildingId(MapView view, String buildingId) {
    view.setBuildingId(buildingId);
  }

  @ReactProp(name = "enablePoiClustering")
  public void setEnablePoiClustering(MapView view, Boolean enablePoiClustering) {
    view.setEnablePoiClustering(enablePoiClustering);
  }

  @ReactProp(name = "showPoiNames")
  public void setShowPoiNames(MapView view, Boolean showPoiNames) {
    view.setShowPoiNames(showPoiNames);
  }

  @ReactProp(name = "useRemoteConfig")
  public void setUseRemoteConfig(MapView view, Boolean useRemoteConfig) {
    view.setUseRemoteConfig(useRemoteConfig);
  }

  @ReactProp(name = "maxZoom", defaultInt = -1)
  public void setMaxZoom(MapView view, int z) {
    view.setMaxZoom(z);
  }

  @ReactProp(name = "minZoom", defaultInt = -1)
  public void setMinZoom(MapView view, int z) {
    view.setMinZoom(z);
  }

  @ReactProp(name = "initialZoom", defaultInt = -1)
  public void setInitialZoom(MapView view, int z) {
    view.setInitialZoom(z);
  }

  @ReactProp(name = "useDashboardTheme")
  public void setUseDashboardTheme(MapView view, Boolean useDashboardTheme) {
    view.setUseDashboardTheme(useDashboardTheme);
  }

  @Override
  public Map getExportedCustomBubblingEventTypeConstants() {
    MapBuilder.Builder events = MapBuilder.builder();
    mapEvent(events, ReactMessage.MAP_READY_CALLBACK);
    mapEvent(events, ReactMessage.FLOOR_CHANGED_CALLBACK);
    mapEvent(events, ReactMessage.POI_SELECTED_CALLBACK);
    mapEvent(events, ReactMessage.POI_DESELECTED_CALLBACK);
    mapEvent(events, ReactMessage.NAVIGATION_REQUESTED_CALLBACK);
    mapEvent(events, ReactMessage.NAVIGATION_STARTED_CALLBACK);
    mapEvent(events, ReactMessage.NAVIGATION_FINISHED_CALLBACK);
    mapEvent(events, ReactMessage.NAVIGATION_ERROR_CALLBACK);
    return events.build();
  }

  private void mapEvent(MapBuilder.Builder builder, String event) {
    builder.put(event, MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", event)));
  }
}
