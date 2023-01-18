import SitumWayfinding

struct SitReactMap {

    // Callbacks mappings:

    static func mapFloorChangeResult(from: SITFloor, to: SITFloor, building: SITBuilding) -> Dictionary<String, Any> {
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
            "floorId": level.name,
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
            "navigation": mapNavigation(navigation),
            "error": error != nil ? mapNavigationError(navigation, error) : ""
        ]
    }

    // Object mappings:

    static func mapNavigation(navigation: Navigation) -> Dictionary<String, Any> {
        return [
            "status": navigation.status.name,
            "destination": mapDestination(navigation.destination)
        ]
    }

    static func mapNavigationError(navigation: Navigation, error: Error) -> Dictionary<String, Any> {
        return [
            "code": error.code,
            "message": error.message
        ]
    }

    static func putDestination(destination: Destination) -> Dictionary<String, Any> {
        return [
            "category": destination.category,
            "identifier": destination.identifier,
            "name": destination.name,
            "point": mapPoint(destination.point)
        ]
    }

    static func mapPoint(point: SitPoint) -> Dictionary<String, Any> {
        return [
            "buildingId": point.buildingIdentifier,
            "floorId": point.floorIdentifier,
            "latitude": point.coordinate.latitude,
            "longitude": point.coordinate.longitude
        ]
    }
}
