//
//  SITCommManagerAdapter.swift
//  SitumWayfindingPlugin
//
//  Created by Situm on 09/05/23.
//

import Foundation
import SitumSDK

class SITCommManagerAdapter: NSObject {
    static func fetchPoiFromBuilding(poiId: String, buildingId: String, completion: @escaping (Result<SITPOI, Error>) -> Void) {
        SitumSDK.SITCommunicationManager.shared().fetchPois(ofBuilding: buildingId, success: { mapping in
            guard mapping != nil, let pois = mapping!["results"] as? [SITPOI] else {return}
            var notFound = true
            for poi in pois {
                if poi.identifier == poiId {
                    completion(.success(poi))
                    notFound = false
                    break
                }
            }
            if notFound {
                completion(.failure(SITCommError.poiNotFound))
            }
        }, failure: { error in
            completion(.failure(error!))
        })
    }
}

enum SITCommError: Error {
    case poiNotFound
}
