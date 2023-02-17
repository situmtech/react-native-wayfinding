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
RCT_EXPORT_VIEW_PROPERTY(user, NSString)
RCT_EXPORT_VIEW_PROPERTY(apikey, NSString)
RCT_EXPORT_VIEW_PROPERTY(googleApikey, NSString)
RCT_EXPORT_VIEW_PROPERTY(buildingId, NSString)
RCT_EXPORT_VIEW_PROPERTY(onMapReady, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFloorChanged, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPoiSelected, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPoiDeselected, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationRequested, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationStarted, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationError, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationFinished, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(iOSMapViewIndex, NSString)
RCT_EXPORT_VIEW_PROPERTY(enablePoiClustering, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showPoiNames, BOOL)
RCT_EXPORT_VIEW_PROPERTY(useRemoteConfig, BOOL)
RCT_EXPORT_VIEW_PROPERTY(minZoom, double)
RCT_EXPORT_VIEW_PROPERTY(maxZoom, double)
RCT_EXPORT_VIEW_PROPERTY(initialZoom, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(useDashboardTheme, BOOL)

@end
