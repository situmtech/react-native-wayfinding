//
//  SITCommunicationManager.swift
//  SitumWayfindingPlugin
//
//  Created by Situm on 14/7/22.
//

import Foundation
import SitumSDK

class SITCommunicationManager: NSObject {
    static func fetchPoiFromBuilding(poiId: String, buildingId: String, completion: @escaping (Result<SITPOI, Error>) -> Void) {
        SitumSDK.SITCommunicationManager.shared().fetchPois(ofBuilding: buildingId, success: { mapping in
            guard mapping != nil, let pois = mapping!["results"] as? [SITPOI] else {return}
            for poi in pois {
                if poi.identifier == poiId {
                    completion(.success(poi))
                }
            }
        }, failure: { error in
            completion(.failure(error!))
        })
    }
}
