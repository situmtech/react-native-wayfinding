//
//  MapView.m
//  SitumWayfindingPlugin
//
//  Created by Situm on 21/7/22.
//  Copyright © 2022 Facebook. All rights reserved.
//

#import <React/RCTViewManager.h>
 
@interface RCT_EXTERN_MODULE(RCTMapViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(status, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onClick, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(user, NSString)
RCT_EXPORT_VIEW_PROPERTY(apikey, NSString)
RCT_EXPORT_VIEW_PROPERTY(googleApikey, NSString)
RCT_EXPORT_VIEW_PROPERTY(buildingId, NSString)
RCT_EXPORT_VIEW_PROPERTY(onMapReadyCallback, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFloorChangeCallback, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPoiSelectedCallback, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPoiDeselectedCallback, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationRequestedCallback, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationErrorCallback, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationFinishedCallback, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(iOSMapViewIndex, NSString)
RCT_EXPORT_VIEW_PROPERTY(enablePoiClustering, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showPoiNames, BOOL)
RCT_EXPORT_VIEW_PROPERTY(useRemoteConfig, BOOL)
RCT_EXPORT_VIEW_PROPERTY(useDashboardTheme, BOOL)

@end
