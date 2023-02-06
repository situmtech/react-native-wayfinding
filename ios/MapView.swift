//
//  MapView.swift
//  SitumWayfindingPlugin
//
//  Created by Situm on 14/7/22.
//  Copyright © 2022 Facebook. All rights reserved.
//

import UIKit
import SitumWayfinding


class MapView: UIView, OnMapReadyListener, OnFloorChangeListener, OnPoiSelectionListener, OnNavigationListener {
    
  var loaded = false
  var initialized = false

  override init(frame: CGRect) {
    super.init(frame: frame)
  }

  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
  }

  private func setupView() {
    // in here you can configure your view
    // self.backgroundColor = self.status ? .green : .red

    self.isUserInteractionEnabled = true
    let credentials = Credentials(user: user as String, apiKey:  apikey as String, googleMapsApiKey: googleApikey as String)
    let buildingId = buildingId as String
    let settingsBuilder = LibrarySettings.Builder()
        .setCredentials(credentials: credentials)
        .setBuildingId(buildingId: buildingId)
        .setShowPoiNames(showPoiNames: showPoiNames)
        .setUseRemoteConfig(useRemoteConfig: useRemoteConfig)
        .setEnablePoiClustering(enablePoisClustering: enablePoiClustering)
        .setUseDashboardTheme(useDashboardTheme: useDashboardTheme)

    if minZoom > 0 {
        settingsBuilder.setMinZoom(minZoom: minZoom);
    }

    if maxZoom > 0 {
        settingsBuilder.setMaxZoom(maxZoom: maxZoom);
    }

    var viewController = UIApplication.shared.keyWindow!.rootViewController as! UIViewController

    if (self.iOSMapViewIndex != "" && viewController.children.count > 0) {
      viewController = viewController.children.last!.children[self.iOSMapViewIndex.integerValue]
    }

    let library = SitumMapsLibrary.init(containedBy: self, controlledBy: viewController, withSettings: settingsBuilder.build())
    library.setOnMapReadyListener(listener: self)
    library.setOnFloorChangeListener(listener: self)
    library.setOnPoiSelectionListener(listener: self)
    library.setOnNavigationListener(listener: self)

    do {
      try library.load()
      // self.isUserInteractionEnabled = false
        print("loaded library.. an error should return bad settings")
      loaded = true // Put it on false when unloaded
    } catch {
        print("User creation failed with error:")
    }
  }

  @objc var user: NSString = "" {
    didSet {
        checkAndLoad()
    }
  }

  @objc var apikey: NSString = "" {
    didSet {
        checkAndLoad()

    }
  }

  @objc var googleApikey : NSString = "" {
    didSet {
        checkAndLoad()

    }
  }

  @objc var enablePoiClustering: Bool = true {
    didSet {
      print("enablePoiClustering set to \(self.enablePoiClustering)")
    }
  }

  @objc var showPoiNames: Bool = true {
    didSet {
      print("showPoiNames set to \(self.showPoiNames)")
    }
  }

  @objc var useRemoteConfig: Bool = true {
    didSet {
      print("useRemoteConfig set to \(self.useRemoteConfig)")
    }
  }

  @objc var useDashboardTheme: Bool = true {
    didSet {
      print("useDashboardTheme set to \(self.useDashboardTheme)")
    }
  }

  @objc var status = false {
      didSet {
          self.setupView()
      }
  }

  @objc var buildingId : NSString = "" {
    didSet {
      print("buildingId set to \(self.buildingId)")
        checkAndLoad()

    }
  }

  @objc var iOSMapViewIndex: NSString = "" {
        didSet {
          print("iOSMapViewIndex set to \(self.iOSMapViewIndex)")
        }
      }

  @objc var minZoom: Float = -1 {
      didSet {
          print("minZoom set to \(self.minZoom)")
      }
  }

  @objc var maxZoom: Float = -1 {
      didSet {
          print("maxZoom set to \(self.maxZoom)")
      }
  }

  @objc var initialZoom: NSInteger = -1 {
      didSet {
          print("initialZoom set to \(self.initialZoom)")
      }
  }

  func checkAndLoad() {
      initialized = self.user != "" && self.apikey != "" && self.googleApikey != "" && buildingId != ""
      if initialized {
          setupView()
      }
  }

  @objc var onMapReady: RCTBubblingEventBlock?

  // OnMapReadyListener
  func onMapReady(map: SitumMap) {
      print("on map ready")
      guard let onMapReady = self.onMapReady else { return }

      let params: [String : Any] = [
        "message": "Succeeded loading WYF module.",
        "status": "SUCCESS"
      ]
      onMapReady(params)
  }
    
  // OnFloorChangeListener
  @objc var onFloorChanged: RCTBubblingEventBlock?

  func onFloorChanged(from: SITFloor, to: SITFloor, building: SITBuilding) {
      print("On Floor Changed: from \(from), to: \(to), building: \(building)")
      
      guard let onFloorChanged = onFloorChanged else {
          return
      }

      let params: [String: Any] = SITReactMap.mapFloorChangedResult(from: from, to: to, building: building)
      onFloorChanged(params)
  }
  
  // OnPoiSelectionListener
  @objc var onPoiSelected: RCTBubblingEventBlock?

  func onPoiSelected(poi: SITPOI, level: SITFloor, building: SITBuilding) {
      print("onPoiSelected: \(poi) level: \(level), building: \(building)")
      
      guard let onPoiSelected = onPoiSelected else {
          return
      }

      let params: [String: Any] = SITReactMap.mapPoiSelectedResult(poi: poi, level: level, building: building)
      onPoiSelected(params)
  }
  
  @objc var onPoiDeselected: RCTBubblingEventBlock?

  func onPoiDeselected(building: SITBuilding) {
      print("onPoiDeselected: building: \(building)")
      
      guard let onPoiDeselected = onPoiDeselected else {
          return
      }

      let params: [String: Any] = SITReactMap.mapPoiDeselectedResult(building: building)
      onPoiDeselected(params)
  }

  // OnNavigationListener
  @objc var onNavigationRequested: RCTBubblingEventBlock?

  func onNavigationRequested(navigation: Navigation) {
      print("onPoiDeselected: navigation: \(navigation)")
      
      guard let onNavigationRequested = onNavigationRequested else {
          return
      }

      let params: [String: Any] = SITReactMap.mapNavigationResult(navigation: navigation, error: nil)
      onNavigationRequested(params)
  }
  
  @objc var onNavigationFinished: RCTBubblingEventBlock?

  func onNavigationFinished(navigation: Navigation) {
      print("onNavigationFinished: \(navigation)")
      
      guard let onNavigationFinished = onNavigationFinished else {
          return
      }

      let params: [String: Any] = SITReactMap.mapNavigationResult(navigation: navigation, error: nil)
      onNavigationFinished(params)
  }

  @objc var onNavigationStarted: RCTBubblingEventBlock?

  func onNavigationStarted(navigation: SitumWayfinding.Navigation) {
      print("onNavigationStarted: \(navigation)")
      
      guard let onNavigationStarted = onNavigationStarted else {
          return
      }

      let params: [String: Any] = SITReactMap.mapNavigationResult(navigation: navigation, error: nil)
      onNavigationStarted(params)
  }

  @objc var onNavigationError: RCTBubblingEventBlock?
  
  func onNavigationError(navigation: Navigation, error: Error) {
      print("onNavigationError: \(navigation) \(error)")
      
      guard let onNavigationError = onNavigationError else {
          return
      }

      let params: [String: Any] = SITReactMap.mapNavigationError(navigation: navigation, error: error)
      onNavigationError(params)
  }
}
