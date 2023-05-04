#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SitumWayfindingPlugin, NSObject)

RCT_EXTERN_METHOD(navigateToPoi:(NSDictionary)poiDict
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

@end
