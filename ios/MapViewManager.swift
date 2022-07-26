//
//  MapViewManager.swift
//  SitumWayfindingPlugin
//
//  Created by Situm on 14/7/22.
//  Copyright © 2022 Facebook. All rights reserved.
//

@objc (RCTMapViewManager)
class RCTMapViewManager: RCTViewManager {
 
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
 
  override func view() -> UIView! {
    return MapView()
  }
 
}
