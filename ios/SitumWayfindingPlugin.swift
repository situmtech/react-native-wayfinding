import SitumWayfinding

@objc(SitumWayfindingPlugin)
class SitumWayfindingPlugin: NSObject {

    @objc(navigateToPoi:withResolver:withRejecter:)
    func navigateToPoi(poiDict: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        if let wayfinding = MapView.library {
            let poiId = poiDict["id"] as! String
            let buildingId = poiDict["buildingId"] as! String
            SITCommunicationManager.fetchPoiFromBuilding(poiId: poiId, buildingId: buildingId, completion: { result in
                switch result {
                case .success(let poi):
                    wayfinding.navigateToPoi(poi: poi)
                    resolve("SUCCESS")
                case .failure(let reason):
                    reject("ERROR", reason.localizedDescription, nil)
                }
            })
        } else {
            reject("ERROR", "Wayfinding not initialized", nil)
        }
    }
}
