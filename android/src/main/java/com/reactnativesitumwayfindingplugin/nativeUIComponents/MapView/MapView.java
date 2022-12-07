package com.reactnativesitumwayfindingplugin.nativeUIComponents.MapView;

import android.app.Activity;
import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.AttributeSet;
import android.util.Log;
import android.widget.RelativeLayout;

import androidx.annotation.NonNull;
import androidx.fragment.app.FragmentActivity;

import android.view.View;

import com.facebook.react.uimanager.ThemedReactContext;
import com.google.android.gms.maps.model.LatLng;
import com.reactnativesitumwayfindingplugin.R;
import com.reactnativesitumwayfindingplugin.nativeUIComponents.ReactMessage.ReactMessage;
import com.reactnativesitumwayfindingplugin.nativeUIComponents.ReactMessage.ReactMessageManager;

import es.situm.sdk.SitumSdk;
import es.situm.sdk.model.cartography.Building;
import es.situm.sdk.model.cartography.BuildingInfo;
import es.situm.sdk.model.cartography.Floor;
import es.situm.sdk.model.cartography.Poi;
import es.situm.wayfinding.LibrarySettings;
import es.situm.wayfinding.OnFloorChangeListener;
import es.situm.wayfinding.OnPoiSelectionListener;
import es.situm.wayfinding.OnUserInteractionListener;
import es.situm.wayfinding.SitumMapsLibrary;
import es.situm.wayfinding.SitumMapsListener;
import es.situm.wayfinding.actions.ActionsCallback;
import es.situm.wayfinding.navigation.Navigation;
import es.situm.wayfinding.navigation.NavigationError;
import es.situm.wayfinding.navigation.OnNavigationListener;
import es.situm.sdk.error.Error;

public class MapView extends RelativeLayout implements SitumMapsListener, OnUserInteractionListener,
    OnFloorChangeListener, OnPoiSelectionListener, OnNavigationListener {

  private String TAG = MapView.class.getSimpleName();

  private boolean status = false;
  private String user = "";
  private String apikey = "";
  private String googleApikey = "";

  private String buildingId = "";
  private int minZoom = -1;
  private int maxZoom = -1;
  private int initialZoom = -1;

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

    final Handler handler = new Handler(Looper.getMainLooper());
    handler.postDelayed(new Runnable() {
      @Override
      public void run() {
        inflateMap();
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

  public void setApikey(String apikey) {
    this.apikey = apikey;
  }

  public void setGoogleApikey(String googleApikey) {
    this.googleApikey = googleApikey;
  }

  public void setBuildingId(String buildingId) {
    this.buildingId = buildingId;
  }

  public void setMinZoom(int z) {
    this.minZoom = z;
  }

  public void setMaxZoom(int z) {
    this.maxZoom = z;
  }

  public void setInitialZoom(int z) {
    this.initialZoom = z;
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

  // region OnUserInteractionListener

  @Override
  public void onMapReady() {
    Log.d("MapView", "onMapReady: ");
  }

  @Override
  public void onMapTouched(LatLng latLng) {
    Log.d("MapView", "onMapTouched: " + latLng);

  }

  @Override
  public void onBuildingMarkerSelected(Building building) {

  }

  // endregion

  // region SitumMapsListener
  @Override
  public void onSuccess() {
    Log.d(TAG, "onSuccess: received");

    if (buildingId != null && !"-1".equals(buildingId) && !"".equals(buildingId)) {
      centerBuilding(buildingId);
    } else {
      ReactMessageManager.sendReactMessage(MapView.this, ReactMessage.MAP_READY_CALLBACK,
          new ReactMessage(ReactMessage.MESSAGE_ID, "No build mode"));
    }

  }

  @Override
  public void onError(int i) {
    Log.d(TAG, "onError: receieved " + i);
  }

  // endregion

  // region OnPoiSelectionListener
  @Override
  public void onPoiSelected(Poi poi, Floor floor, Building building) {

    ReactMessageManager.sendReactMessage(MapView.this, ReactMessage.POI_SELECTED_CALLBACK,
        new ReactMessage(ReactMessage.POI_ID, poi.getIdentifier()),
        new ReactMessage(ReactMessage.FLOOR_ID, floor.getIdentifier()),
        new ReactMessage(ReactMessage.BUILDING_ID, building.getIdentifier()));
  }

  @Override
  public void onPoiDeselected(Building building) {

    ReactMessageManager.sendReactMessage(MapView.this, ReactMessage.POI_DESELECTED_CALLBACK,
        new ReactMessage(ReactMessage.BUILDING_ID, building.getIdentifier()));
  }
  // endregion

  // region OnNavigationListener
  @Override
  public void onNavigationRequested(Navigation navigation) {

    ReactMessageManager.sendReactMessage(MapView.this, ReactMessage.NAVIGATION_REQUESTED_CALLBACK,
        new ReactMessage(ReactMessage.NAVIGATION_STATUS_ID, navigation.getStatus().name()));
  }

  @Override
  public void onNavigationStarted(Navigation navigation) {
    // Do nothing.
  }

  @Override
  public void onNavigationError(Navigation navigation, NavigationError navigationError) {

    ReactMessageManager.sendReactMessage(MapView.this, ReactMessage.NAVIGATION_ERROR_CALLBACK,
        new ReactMessage(ReactMessage.NAVIGATION_STATUS_ID, navigation.getStatus().name()),
        new ReactMessage(ReactMessage.ERROR_ID, navigationError.getMessage()));
  }

  @Override
  public void onNavigationFinished(Navigation navigation) {

    ReactMessageManager.sendReactMessage(MapView.this, ReactMessage.NAVIGATION_FINISHED_CALLBACK,
        new ReactMessage(ReactMessage.NAVIGATION_STATUS_ID, navigation.getStatus().name()));
  }

  // endregion

  // region OnFloorChangeListener
  @Override
  public void onFloorChanged(Floor from, Floor to, Building building) {
    Log.d(TAG, "onFloorChanged: ");

    ReactMessageManager.sendReactMessage(MapView.this, ReactMessage.FLOOR_CHANGED_CALLBACK,
        new ReactMessage(ReactMessage.FROM_ID, from.getIdentifier()),
        new ReactMessage(ReactMessage.TO_ID, to.getIdentifier()),
        new ReactMessage(ReactMessage.BUILDING_ID, building.getIdentifier()));
  }

  // end region

  private void inflateMap() {
    librarySettings = new LibrarySettings();

    librarySettings.setApiKey(user, apikey);

    if (maxZoom > 0) {
      librarySettings.setMaxZoom(maxZoom);
    }
    if (minZoom > 0) {
      librarySettings.setMinZoom(minZoom);
    }
    if (initialZoom > 0) {
      librarySettings.setInitialZoom(initialZoom);
    }

    mapsLibrary = new SitumMapsLibrary(
        this.findViewById(R.id.map_container).findViewById(R.id.maps_library_target).getId(),
        (FragmentActivity) context.getCurrentActivity(), librarySettings);
    mapsLibrary.setSitumMapsListener(this);
    mapsLibrary.setUserInteractionsListener(this);
    mapsLibrary.setOnFloorChangeListener(this);
    mapsLibrary.setOnPoiSelectionListener(this);
    mapsLibrary.setOnNavigationListener(this);

    mapsLibrary.load();
  }

  private void centerBuilding(@NonNull String buildingId) {

    SitumSdk.communicationManager().fetchBuildingInfo(buildingId, new es.situm.sdk.utils.Handler<BuildingInfo>() {
      @Override
      public void onSuccess(BuildingInfo buildingInfo) {
        Building selectedBuilding = buildingInfo.getBuilding();
        mapsLibrary.centerBuilding(selectedBuilding, new ActionsCallback() {
          @Override
          public void onActionConcluded() {
            ReactMessageManager.sendReactMessage(MapView.this, ReactMessage.MAP_READY_CALLBACK,
                new ReactMessage(ReactMessage.MESSAGE_ID, "Building id: " + buildingId));
          }
        });
      }

      @Override
      public void onFailure(Error error) {
        ReactMessageManager.sendReactMessage(MapView.this, ReactMessage.MAP_READY_CALLBACK,
            new ReactMessage(ReactMessage.MESSAGE_ID, error.getMessage()));
      }
    });

  }

}
