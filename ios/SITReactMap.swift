import SitumWayfinding

struct SITReactMap {

    // Callbacks mappings:

    static func mapFloorChangedResult(from: SITFloor, to: SITFloor, building: SITBuilding) -> Dictionary<String, Any> {
        return [
            "fromFloorId": from.identifier,
            "toFloorId": to.identifier,
            "fromFloorName": from.name,
            "toFloorName": to.name,
            "buildingId": building.identifier,
            "buildingName": building.name
        ]
    }

    static func mapPoiSelectedResult(poi: SITPOI, level: SITFloor, building: SITBuilding) -> Dictionary<String, Any> {
        return [
            "buildingId": building.identifier,
            "buildingName": building.identifier,
            "floorId": level.identifier,
            "floorName": level.name,
            "poiId": poi.identifier,
            "poiName": poi.name
        ]
    }

    static func mapPoiDeselectedResult(building: SITBuilding) -> Dictionary<String, Any> {
        return [
            "buildingId": building.identifier,
            "buildingName": building.identifier,
        ]
    }

    static func mapNavigationResult(navigation: Navigation, error: Error?) -> Dictionary<String, Any> {
        return [
            "navigation": mapNavigation(navigation: navigation),
            "error": error != nil ? mapNavigationError(navigation: navigation, error: error!) : ""
        ]
    }

    // Object mappings:

    static func mapNavigation(navigation: Navigation) -> Dictionary<String, Any> {
        return [
            "status": mapNavigationStatus(status: navigation.status),
            "destination": mapDestination(destination: navigation.destination)
        ]
    }

    static func mapNavigationError(navigation: Navigation, error: Error) -> Dictionary<String, Any> {
        return [
            "code": error._code,
            "message": error.localizedDescription
        ]
    }

    static func mapDestination(destination: Destination) -> Dictionary<String, Any> {
        return [
            "category": mapDestinationCategory(cat: destination.category),
            "identifier": destination.identifier ?? "",
            "name": destination.name ?? "",
            "point": mapPoint(point: destination.point)
        ]
    }

    static func mapPoint(point: SITPoint) -> Dictionary<String, Any> {
        return [
            "buildingId": point.buildingIdentifier,
            "floorId": point.floorIdentifier,
            "latitude": point.coordinate().latitude,
            "longitude": point.coordinate().longitude
        ]
    }
    
    static func mapNavigationStatus(status: NavigationStatus) -> String {
        switch status {
        case .requested:
            return  "REQUESTED"
        case .started:
            return  "STARTED"
        case .error(_):
            return "ERROR"
        case .destinationReached:
            return "DESTINATION_REACHED"
        case .canceled:
            return "CANCELED"
        }
    }
    
    static func mapDestinationCategory(cat: DestinationCategory) -> String {
        switch cat {
        case .poi(_):
            return "POI"
        case .location(_):
            return "LOCATION"
        }
    }
}
