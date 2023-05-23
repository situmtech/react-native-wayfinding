package com.reactnativesitumwayfindingplugin;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.module.annotations.ReactModule;
import com.reactnativesitumwayfindingplugin.nativeUIComponents.MapView.MapView;

import es.situm.sdk.model.cartography.Poi;

@ReactModule(name = SitumWayfindingPluginModule.NAME)
public class SitumWayfindingPluginModule extends ReactContextBaseJavaModule {
    public static final String NAME = "SitumWayfindingPlugin";

    public SitumWayfindingPluginModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }


    // Plugin methods

    @ReactMethod
    public void navigateToPoi(ReadableMap poiMap, Promise promise) {
        if (MapView.library() == null) {
            promise.reject("ERROR", "Wayfinding not initialized");
            return;
        }
        String poiId = poiMap.getString("id");
        String buildingId = poiMap.getString("buildingId");
        SitumCommunicationManager.fetchPoi(buildingId, poiId, new Callback<Poi>() {
            @Override
            public void onSuccess(Poi poi) {
                MapView.library().findRouteToPoi(poi);
                promise.resolve("SUCCESS");
            }

            @Override
            public void onError(String message) {
                promise.reject("ERROR", message);
            }
        });
    }

    @ReactMethod
    public void stopNavigation(Promise promise) {
        if (MapView.library() == null) {
            promise.reject("ERROR", "Wayfinding not initialized");
            return;
        }
        UiThreadUtil.runOnUiThread(() -> {
            MapView.library().stopNavigation();
        });
    }
}
