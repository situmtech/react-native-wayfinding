package com.reactnativesitumwayfindingplugin.nativeUIComponents.ReactMessage;

import android.view.View;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class ReactMessageManager {

    public static void sendReactMessage(View view, @NonNull String callback, @NonNull ReactMessage... reactMessages) {
        WritableMap event = Arguments.createMap();
        for (ReactMessage rm : reactMessages) {
            event.putString(rm.getId(), rm.getContent());
        }
        ReactContext reactContext = (ReactContext) view.getContext();
        reactContext.getJSModule(RCTEventEmitter.class)
                .receiveEvent(view.getId(), callback, event);
    }

}
