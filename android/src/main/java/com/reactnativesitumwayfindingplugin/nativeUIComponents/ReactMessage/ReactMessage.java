package com.reactnativesitumwayfindingplugin.nativeUIComponents.ReactMessage;

import android.view.View;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class ReactMessage {

    private String id;
    private String content;

    public static final String MAP_READY_CALLBACK = "onMapReadyCallback";
    public static final String POI_SELECTED_CALLBACK = "onPoiSelectedCallback";
    public static final String POI_DESELECTED_CALLBACK = "onPoiDeselectedCallback";
    public static final String NAVIGATION_REQUESTED_CALLBACK = "onNavigationRequestedCallback";
    public static final String NAVIGATION_ERROR_CALLBACK = "onNavigationErrorCallback";
    public static final String NAVIGATION_FINISHED_CALLBACK = "onNavigationFinishedCallback";
    public static final String FLOOR_CHANGED_CALLBACK = "onFloorChangeCallback";

    public static final String MESSAGE_ID = "message";
    public static final String FROM_ID = "from";
    public static final String TO_ID = "to";
    public static final String BUILDING_ID = "building";
    public static final String NAVIGATION_STATUS_ID = "navigationStatus";
    public static final String ERROR_ID = "error";
    public static final String POI_ID = "poi";
    public static final String FLOOR_ID = "floor";

    public ReactMessage(String id, String content) {
        this.id = id;
        this.content = content;
    }

    public String getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

}