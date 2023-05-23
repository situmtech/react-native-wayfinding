package com.reactnativesitumwayfindingplugin;

import java.util.Collection;

import es.situm.sdk.SitumSdk;
import es.situm.sdk.error.Error;
import es.situm.sdk.model.cartography.Poi;
import es.situm.sdk.utils.Handler;

public class SitumCommunicationManager {

  private static final String TAG = SitumCommunicationManager.class.getSimpleName();

  /**
   * Get a Poi using both Building and Poi identifiers.
   *
   * @param buildingId The building id.
   * @param poiId      The POI id.
   * @param callback   Callback to handle success/failure.
   */
  static void fetchPoi(String buildingId, String poiId, Callback<Poi> callback) {
    SitumSdk.communicationManager()
      .fetchIndoorPOIsFromBuilding(buildingId, new Handler<Collection<Poi>>() {
          @Override
          public void onSuccess(Collection<Poi> pois) {
            for (Poi poi : pois) {
              if (poiId.equals(poi.getIdentifier())) {
                callback.onSuccess(poi);
                return;
              }
            }
            callback.onError("Poi not found for building.");
          }

          @Override
          public void onFailure(Error error) {
            callback.onError(error.getMessage());
          }
        }
      );
  }
}

interface Callback<T> {
  void onSuccess(T result);

  void onError(String message);
}

