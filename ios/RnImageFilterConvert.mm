#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RnImageFilterConvert, NSObject)

RCT_EXTERN_METHOD(FilterSimple:(NSDictionary)filterProps resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
