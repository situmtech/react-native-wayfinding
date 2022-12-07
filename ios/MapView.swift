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
    // setupView()
  }
 
  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
    // setupView()
  }
 
 private func setupView() {
    // in here you can configure your view
   // self.backgroundColor = self.status ? .green : .red
    
     self.isUserInteractionEnabled = true
     
     let credentials = Credentials(user: user as String, apiKey:  apikey as String, googleMapsApiKey: googleApikey as String)
     
      let buildingId = buildingId as String
      let settings = LibrarySettings.Builder()
          .setCredentials(credentials: credentials)
          .setBuildingId(buildingId: buildingId)
          .setShowPoiNames(showPoiNames: showPoiNames)
          .setUseRemoteConfig(useRemoteConfig: useRemoteConfig)
          .setEnablePoiClustering(enablePoisClustering: enablePoiClustering)
          .build()
      
     var viewController = UIApplication.shared.keyWindow!.rootViewController as! UIViewController
     
     if (self.iOSMapViewIndex != "" && viewController.children.count > 0) {
        viewController = viewController.children.last!.children[self.iOSMapViewIndex.integerValue]
    }

      
       let library = SitumMapsLibrary.init(containedBy: self, controlledBy: viewController, withSettings: settings )
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
        print("User set to \(self.user)")
          checkAndLoad()
      }
    }
    
    @objc var apikey: NSString = "" {
      didSet {
        print("apikey set to \(self.apikey)")
          checkAndLoad()

      }
    }
    
    @objc var googleApikey : NSString = "" {
      didSet {
        print("googleApikey set to \(self.googleApikey)")
          checkAndLoad()

      }
    }

    @objc var enablePoiClustering: BOOL = true {
      didSet {
        print("enablePoiClustering set to \(self.enablePoiClustering)")
      }
    }
  
    @objc var showPoiNames: BOOL = false {
      didSet {
        print("showPoiNames set to \(self.showPoiNames)")
      }
    }

    @objc var useRemoteConfig: BOOL = true {
      didSet {
        print("useRemoteConfig set to \(self.useRemoteConfig)")
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
    
    
    func checkAndLoad() {
        initialized = self.user != "" && self.apikey != "" && self.googleApikey != "" && buildingId != ""
        if initialized {
            setupView()
        }
    }
   
  @objc var onClick: RCTBubblingEventBlock?
   
  override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
      
      
      
  }
    
    
    @objc var onMapReadyCallback: RCTBubblingEventBlock?
    
  // OnMapReadyListener
  func onMapReady(map: SitumMap) {
      print("on map ready")
      guard let onMapReadyCallback = self.onMapReadyCallback else { return }

      let params: [String : Any] = ["value1":"react demo","value2":1]
      onMapReadyCallback(params)
  }
    
    // OnFloorChangeListener
    @objc var onFloorChangeCallback: RCTBubblingEventBlock?
    
    func onFloorChanged(from: SITFloor, to: SITFloor, building: SITBuilding) {
        print("On Floor Changed: from \(from), to: \(to), building: \(building)")
        
        guard let onFloorChangeCallback = onFloorChangeCallback else {
            return
        }
        
        let params: [String: Any] = ["from" : from.identifier, "to": to.identifier, "building": building.identifier];
        onFloorChangeCallback(params)
    }
    
    // OnPoiSelectionListener
    @objc var onPoiSelectedCallback: RCTBubblingEventBlock?

    func onPoiSelected(poi: SITPOI, level: SITFloor, building: SITBuilding) {
        print("onPoiSelected: \(poi) level: \(level), building: \(building)")
        
        guard let onPoiSelectedCallback = onPoiSelectedCallback else {
            return
        }

        let params: [String: Any] = ["poi" : poi.identifier, "level": level.identifier, "building": building.identifier];
        onPoiSelectedCallback(params)
    }
    
    @objc var onPoiDeselectedCallback: RCTBubblingEventBlock?

    func onPoiDeselected(building: SITBuilding) {
        print("onPoiDeselected: building: \(building)")
        
        guard let onPoiDeselectedCallback = onPoiDeselectedCallback else {
            return
        }

        let params: [String: Any] = ["building": building.identifier];
        onPoiDeselectedCallback(params)
    }
    
    // OnNavigationListener
    @objc var onNavigationRequestedCallback: RCTBubblingEventBlock?

    func onNavigationRequested(navigation: Navigation) {
        print("onPoiDeselected: navigation: \(navigation)")
        
        guard let onNavigationRequestedCallback = onNavigationRequestedCallback else {
            return
        }

        let params: [String: Any] = ["navigationStatus": navigation.status];
        onNavigationRequestedCallback(params)
        
    }
    
    @objc var onNavigationErrorCallback: RCTBubblingEventBlock?
    
    func onNavigationError(navigation: Navigation, error: Error) {
        print("onNavigationError: \(navigation) \(error)")
        
        guard let onNavigationErrorCallback = onNavigationErrorCallback else {
            return
        }

        let params: [String: Any] = ["error": error.localizedDescription];
        onNavigationErrorCallback(params)
        
    }
    
    @objc var onNavigationFinishedCallback: RCTBubblingEventBlock?

    func onNavigationFinished(navigation: Navigation) {
        print("onNavigationFinished: \(navigation)")
        
        guard let onNavigationFinishedCallback = onNavigationFinishedCallback else {
            return
        }

        let params: [String: Any] = ["navigationStatus": navigation.status];
        onNavigationFinishedCallback(params)
    }

    @objc var onNavigationStartedCallback: RCTBubblingEventBlock?

    func onNavigationStarted(navigation: SitumWayfinding.Navigation) {
        print("onNavigationStarted: \(navigation)")

        // TODO: Connect callback

    }
    
}
