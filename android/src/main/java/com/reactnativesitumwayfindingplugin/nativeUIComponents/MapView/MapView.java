package com.reactnativesitumwayfindingplugin.nativeUIComponents.MapView;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import android.widget.RelativeLayout;

import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.android.gms.maps.model.LatLng;
import com.reactnativesitumwayfindingplugin.R;

import es.situm.sdk.model.cartography.Building;
import es.situm.sdk.model.cartography.Floor;
import es.situm.sdk.model.cartography.Poi;
import es.situm.wayfinding.LibrarySettings;
import es.situm.wayfinding.OnFloorChangeListener;
import es.situm.wayfinding.OnPoiSelectionListener;
import es.situm.wayfinding.OnUserInteractionListener;
import es.situm.wayfinding.SitumMap;
import es.situm.wayfinding.SitumMapView;
import es.situm.wayfinding.SitumMapsLibrary;
import es.situm.wayfinding.SitumMapsListener;
import es.situm.wayfinding.navigation.Navigation;
import es.situm.wayfinding.navigation.NavigationError;
import es.situm.wayfinding.navigation.OnNavigationListener;

public class MapView extends RelativeLayout implements SitumMapsListener, OnUserInteractionListener, OnFloorChangeListener, OnPoiSelectionListener, OnNavigationListener {

  private String TAG = MapView.class.getSimpleName();

  private boolean status = false;
  private String user = "";
  private String apikey = "";
  private String googleApikey = "";

  private String buildingId = "";

  private LibrarySettings librarySettings;
  private SitumMapsLibrary mapsLibrary;
  public Activity activity = null;

  private ThemedReactContext context;

  public void setup() {
    // View rootView = findViewById(android.R.id.content).getRootView();
  }

  public void onFinishInflate() {
    super.onFinishInflate();

    Log.d(TAG, "onFinishInflate: this.view" + this);



    // status = true;


    this.setOnClickListener(new View.OnClickListener() {
      public void onClick(View v) {
        if (status) {
          return;
        }

        //
        librarySettings = new LibrarySettings();

        librarySettings.setApiKey(user, apikey);

        mapsLibrary = new SitumMapsLibrary(v.findViewById(R.id.map_container).findViewById(R.id.maps_library_target).getId(), (FragmentActivity) context.getCurrentActivity(), librarySettings);
        mapsLibrary.setSitumMapsListener(MapView.this);
        mapsLibrary.setUserInteractionsListener(MapView.this);
        mapsLibrary.setOnFloorChangeListener(MapView.this);
        mapsLibrary.setOnPoiSelectionListener(MapView.this);
        mapsLibrary.setOnNavigationListener(MapView.this);

        mapsLibrary.load();

        status = true;


      }
    });



    // onClick();
    final Handler handler = new Handler(Looper.getMainLooper());
    handler.postDelayed(new Runnable() {
      @Override
      public void run() {
        //Do something after 100ms
        // MapView.this.onClick();
        MapView.this.performClick();
      }
    }, 500);

  }

  @Override
  public void requestLayout() {
    super.requestLayout();
    post(measureAndLayout);
  }

  private final Runnable measureAndLayout = new Runnable() {
    @Override
    public void run() {
      measure(
        MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
        MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY));
      layout(getLeft(), getTop(), getRight(), getBottom());
    }
  };

  public void setStatus(boolean status) {
    this.status = status;
    // setBackgroundColor( this.status ? Color.GREEN : Color.RED);
  }

  public void setUser(String user) {
    this.user = user;
  }

  public void setApikey(String apikey) { this.apikey = apikey; }

  public void setGoogleApikey(String googleApikey) { this.googleApikey = googleApikey; }

  public void setBuildingId(String buildingId) { this.buildingId = buildingId; }

  public void onClick() {
        /*
        WritableMap event = Arguments.createMap();

        event.putString("value1","react demo");
        event.putInt("value2",1);

        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "onClickEvent", event);*/





  }

  // public void onMapReadyCallback()

  public MapView(Context context) {
    super(context);
    Log.d("TAG", "MapView: context is called");
    this.context = (ThemedReactContext) context;
  }

  public MapView(Context context, AttributeSet attrs, int defStyle) {
    super(context, attrs, defStyle);
    this.context = (ThemedReactContext) context;
  }

  public MapView(Context context, AttributeSet attrs) {
    super(context, attrs);
    this.context = (ThemedReactContext) context;
  }

  @Override
  public void onMapReady() {
    Log.d("MapView", "onMapReady: ");

    mapsLibrary.enableOneBuildingMode(buildingId);

    WritableMap event = Arguments.createMap();

    event.putString("message", "hello world to callbacks");
    ReactContext reactContext = (ReactContext)getContext();
    reactContext
      .getJSModule(RCTEventEmitter.class)
      .receiveEvent(getId(), "onMapReadyCallback", event);

  }

  @Override
  public void onMapTouched(LatLng latLng) {
    Log.d("MapView", "onMapTouched: " + latLng);


  }

  @Override
  public void onBuildingMarkerSelected(Building building) {

  }

  @Override
  public void onSuccess() {
    Log.d(TAG, "onSuccess: received");
  }

  @Override
  public void onError(int i) {
    Log.d(TAG, "onError: receieved " + i);
  }

  //region OnPoiSelectionListener
  @Override
  public void onPoiSelected(Poi poi, Floor floor, Building building) {
    WritableMap event = Arguments.createMap();

    event.putString("poi", poi.getIdentifier());
    event.putString("floor", floor.getIdentifier());
    event.putString("building", building.getIdentifier());
    ReactContext reactContext = (ReactContext)getContext();
    reactContext
      .getJSModule(RCTEventEmitter.class)
      .receiveEvent(getId(), "onPoiSelectedCallback", event);
  }

  @Override
  public void onPoiDeselected(Building building) {
    WritableMap event = Arguments.createMap();

    event.putString("building", building.getIdentifier());
    ReactContext reactContext = (ReactContext)getContext();
    reactContext
      .getJSModule(RCTEventEmitter.class)
      .receiveEvent(getId(), "onPoiDeselectedCallback", event);
  }
  //endregion

  //region OnNavigationListener
  @Override
  public void onNavigationRequested(Navigation navigation) {
    WritableMap event = Arguments.createMap();

    event.putString("navigationStatus", navigation.getStatus().name());
    ReactContext reactContext = (ReactContext)getContext();
    reactContext
      .getJSModule(RCTEventEmitter.class)
      .receiveEvent(getId(), "onNavigationRequestedCallback", event);
  }

  @Override
  public void onNavigationError(Navigation navigation, NavigationError navigationError) {
    WritableMap event = Arguments.createMap();

    event.putString("navigationStatus", navigation.getStatus().name());
    event.putString("error", navigationError.getMessage());
    ReactContext reactContext = (ReactContext)getContext();
    reactContext
      .getJSModule(RCTEventEmitter.class)
      .receiveEvent(getId(), "onNavigationErrorCallback", event);
  }

  @Override
  public void onNavigationFinished(Navigation navigation) {
    WritableMap event = Arguments.createMap();

    event.putString("navigationStatus", navigation.getStatus().name());
    ReactContext reactContext = (ReactContext)getContext();
    reactContext
      .getJSModule(RCTEventEmitter.class)
      .receiveEvent(getId(), "onNavigationFinishedCallback", event);
  }


  //endregion

  //region OnFloorChangeListener
  @Override
  public void onFloorChanged(Floor from, Floor to, Building building) {
    Log.d(TAG, "onFloorChanged: ");
    WritableMap event = Arguments.createMap();

    event.putString("from", from.getIdentifier());
    event.putString("to", to.getIdentifier());
    event.putString("building", building.getIdentifier());

    ReactContext reactContext = (ReactContext)getContext();
    reactContext
      .getJSModule(RCTEventEmitter.class)
      .receiveEvent(getId(), "onFloorChangeCallback", event);
  }
  //endregion
}
