package com.reactnativesitumwayfindingplugin.nativeUIComponents.MapView;

import android.content.Context;
import android.view.LayoutInflater;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.reactnativesitumwayfindingplugin.R;


import java.util.Map;

public class MapViewManager extends SimpleViewManager<MapView> {

  public static final String REACT_CLASS = "RCTMapView";
  String eventName = "onClick";

  @Override
  public String getName() { return REACT_CLASS; }

  @Override
  public MapView createViewInstance(ThemedReactContext context) {
    LayoutInflater inflater = (LayoutInflater)
      context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

    MapView view = (MapView) inflater.inflate(R.layout.map_view, context.getCurrentActivity().findViewById(R.id.map_view));
    view.activity = context.getCurrentActivity();
    view.setup();
    return view;
  }

  @ReactProp(name = "status")
  public void setStatus(MapView view, Boolean status) {
    view.setStatus(status);
  }

  @ReactProp(name = "user")
  public void setUser(MapView view, String user) {
    view.setUser(user);
  }

  @ReactProp(name = "apikey")
  public void setApikey(MapView view, String apikey) {
    view.setApikey(apikey);
  }

  @ReactProp(name = "googleApikey")
  public void setGoogleApikey(MapView view, String googleApikey) {
    view.setGoogleApikey(googleApikey);
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

  public Map getExportedCustomBubblingEventTypeConstants() {
    String eventName = "onClickEvent";
    String propName = "onClick";
    Map onClickHandler = MapBuilder.of("phasedRegistrationNames",MapBuilder.of("bubbled", propName));
    Map onMapReadyHandler = MapBuilder.of("phasedRegistrationNames",MapBuilder.of("bubbled", "onMapReadyCallback"));
    Map onFloorChangeHandler = MapBuilder.of("phasedRegistrationNames",MapBuilder.of("bubbled", "onFloorChangeCallback"));
    Map onPoiSelectedHandler = MapBuilder.of("phasedRegistrationNames",MapBuilder.of("bubbled", "onPoiSelectedCallback"));
    Map onPoiDeselectedHandler = MapBuilder.of("phasedRegistrationNames",MapBuilder.of("bubbled", "onPoiDeselectedCallback"));
    Map onNavigationRequestedHandler = MapBuilder.of("phasedRegistrationNames",MapBuilder.of("bubbled", "onNavigationRequestedCallback"));
    Map onNavigationErrorHandler = MapBuilder.of("phasedRegistrationNames",MapBuilder.of("bubbled", "onNavigationErrorCallback"));
    Map onNavigationFinishedHandler = MapBuilder.of("phasedRegistrationNames",MapBuilder.of("bubbled", "onNavigationFinishedCallback"));


    MapBuilder.Builder events = MapBuilder.builder();
    events.put(eventName, onClickHandler);
    events.put("onMapReadyCallback", onMapReadyHandler);
    events.put("onFloorChangeCallback", onFloorChangeHandler);
    events.put("onPoiSelectedCallback", onPoiSelectedHandler);
    events.put("onPoiDeselectedCallback", onPoiDeselectedHandler);
    events.put("onNavigationRequestedCallback", onNavigationRequestedHandler);
    events.put("onNavigationErrorCallback", onNavigationErrorHandler);
    events.put("onNavigationFinishedCallback", onNavigationFinishedHandler);

    return events.build();
  }
}
