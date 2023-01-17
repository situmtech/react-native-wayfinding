package com.reactnativesitumwayfindingplugin.nativeUIComponents.MapView;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.AttributeSet;
import android.util.Log;
import android.widget.RelativeLayout;

import androidx.annotation.NonNull;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.uimanager.ThemedReactContext;
import com.reactnativesitumwayfindingplugin.R;
import com.reactnativesitumwayfindingplugin.nativeUIComponents.ReactMessage.ReactMessage;
import com.reactnativesitumwayfindingplugin.nativeUIComponents.ReactMessage.ReactMessageManager;

import es.situm.sdk.model.cartography.Building;
import es.situm.sdk.model.cartography.Floor;
import es.situm.sdk.model.cartography.Poi;
import es.situm.wayfinding.LibrarySettings;
import es.situm.wayfinding.OnFloorChangeListener;
import es.situm.wayfinding.OnPoiSelectionListener;
import es.situm.wayfinding.SitumMapsLibrary;
import es.situm.wayfinding.SitumMapsListener;
import es.situm.wayfinding.actions.ActionsCallback;
import es.situm.wayfinding.navigation.Navigation;
import es.situm.wayfinding.navigation.NavigationError;
import es.situm.wayfinding.navigation.OnNavigationListener;

public class MapView extends RelativeLayout implements SitumMapsListener,
  OnFloorChangeListener, OnPoiSelectionListener, OnNavigationListener,
  ReactMessage {

  private static final String TAG = MapView.class.getSimpleName();

  private String user = "";
  private String apikey = "";

  private String buildingId = "";
  private int minZoom = -1;
  private int maxZoom = -1;
  private int initialZoom = -1;

  private boolean enablePoiClustering = true;
  private boolean showPoiNames = true;
  private boolean useRemoteConfig = true;
  private boolean useDashboardTheme = true;

  private LibrarySettings librarySettings;
  private SitumMapsLibrary mapsLibrary;

  private ThemedReactContext context;
  private FragmentActivity activity;

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
  public void onFinishInflate() {
    super.onFinishInflate();
    Log.d(TAG, "onFinishInflate: this.view" + this);

    try {
      activity = (FragmentActivity) context.getCurrentActivity();
    } catch (ClassCastException e) {
      throw new RuntimeException("Situm WYF module requires androidx.fragment.app.FragmentActivity or descendant.");
    }

    final Handler handler = new Handler(Looper.getMainLooper());
    // onFinishInflate() is called BEFORE the view is attached to the view hierarchy.
    // Wait for the view to be attached so WYF can load correctly.
    final Runnable delayLoadUntilViewHierarchy = new Runnable() {
      @Override
      public void run() {
        if (activity.findViewById(R.id.situm_react_native_map_target) != null) {
          inflateMap();
        } else {
          handler.postDelayed(this, 50);
        }
      }
    };
    handler.post(delayLoadUntilViewHierarchy);
  }

  private void inflateMap() {
    librarySettings = new LibrarySettings();
    librarySettings.setApiKey(user, apikey);
    librarySettings.setEnablePoiClustering(enablePoiClustering);
    librarySettings.setShowPoiNames(showPoiNames);
    librarySettings.setUseRemoteConfig(useRemoteConfig);
    librarySettings.setUseDashboardTheme(useDashboardTheme);

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
      R.id.situm_react_native_map_target, activity, librarySettings);
    mapsLibrary.setSitumMapsListener(this);
    mapsLibrary.setOnFloorChangeListener(this);
    mapsLibrary.setOnPoiSelectionListener(this);
    mapsLibrary.setOnNavigationListener(this);

    mapsLibrary.load();
  }

  @Override
  public void requestLayout() {
    super.requestLayout();
    post(measureAndLayout);
  }

  private final Runnable measureAndLayout = () -> {
    measure(
      MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
      MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY));
    layout(getLeft(), getTop(), getRight(), getBottom());
  };

  public void setUser(String user) {
    this.user = user;
  }

  public void setApikey(String apikey) {
    this.apikey = apikey;
  }

  public void setBuildingId(String buildingId) {
    this.buildingId = buildingId;
  }

  public void setEnablePoiClustering(Boolean enablePoiClustering) {
    this.enablePoiClustering = enablePoiClustering;
  }

  public void setShowPoiNames(Boolean showPoiNames) {
    this.showPoiNames = showPoiNames;
  }

  public void setUseRemoteConfig(Boolean useRemoteConfig) {
    this.useRemoteConfig = useRemoteConfig;
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

  public void setUseDashboardTheme(Boolean useDashboardTheme) {
    this.useDashboardTheme = useDashboardTheme;
  }

  // region SitumMapsListener
  @Override
  public void onSuccess() {
    if (buildingId != null && !"-1".equals(buildingId) && !"".equals(buildingId)) {
      centerBuilding(buildingId);
    } else {
      ReactMessageManager.sendReactMessage(MapView.this, MAP_READY_CALLBACK,
        new SitReactMap()
          .putString(MESSAGE, "Succeeded loading WYF module. No building identifier provided.")
          .putString(STATUS, "SUCCESS")
          .getMap());
    }
  }

  @Override
  public void onError(int errorCode) {
    ReactMessageManager.sendReactMessage(MapView.this, MAP_READY_CALLBACK,
      new SitReactMap()
        .putString(MESSAGE, "Error loading WYF module. Code is: " + errorCode)
        .putString(STATUS, "ERROR")
        .getMap());
  }
  // endregion

  // region OnPoiSelectionListener
  @Override
  public void onPoiSelected(Poi poi, Floor floor, Building building) {
    ReactMessageManager.sendReactMessage(MapView.this, POI_SELECTED_CALLBACK,
      // OnPoiSelectedResult:
      new SitReactMap().putPoiSelectedResult(poi, floor, building).getMap());
  }

  @Override
  public void onPoiDeselected(Building building) {
    ReactMessageManager.sendReactMessage(MapView.this, POI_DESELECTED_CALLBACK,
      // OnPoiDeselectedResult:
      new SitReactMap().putPoiDeselectedResult(building).getMap());
  }
  // endregion

  // region OnNavigationListener
  @Override
  public void onNavigationRequested(Navigation navigation) {
    ReactMessageManager.sendReactMessage(MapView.this, NAVIGATION_REQUESTED_CALLBACK,
      new SitReactMap().putNavigationResult(navigation, null).getMap());
  }

  @Override
  public void onNavigationStarted(Navigation navigation) {
    ReactMessageManager.sendReactMessage(MapView.this, NAVIGATION_STARTED_CALLBACK,
      new SitReactMap().putNavigationResult(navigation, null).getMap());
  }

  @Override
  public void onNavigationError(Navigation navigation, NavigationError navigationError) {
    ReactMessageManager.sendReactMessage(MapView.this, NAVIGATION_ERROR_CALLBACK,
      new SitReactMap().putNavigationResult(navigation, navigationError).getMap());
  }

  @Override
  public void onNavigationFinished(Navigation navigation) {
    ReactMessageManager.sendReactMessage(MapView.this, NAVIGATION_FINISHED_CALLBACK,
      new SitReactMap().putNavigationResult(navigation, null).getMap());
  }
  // endregion

  // region OnFloorChangeListener
  @Override
  public void onFloorChanged(Floor from, Floor to, Building building) {
    ReactMessageManager.sendReactMessage(MapView.this, FLOOR_CHANGED_CALLBACK,
      new SitReactMap().putFloorChangeResult(from, to, building).getMap());
  }
  // end region

  private void centerBuilding(@NonNull String buildingId) {
    mapsLibrary.centerBuilding(buildingId, new ActionsCallback() {
      @Override
      public void onActionConcluded() {
        ReactMessageManager.sendReactMessage(MapView.this, MAP_READY_CALLBACK,
          new SitReactMap()
            .putString(MESSAGE, "Succeeded loading WYF module.")
            .putString(STATUS, "SUCCESS")
            .getMap());
      }
    });
  }

}
