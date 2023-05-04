export interface WayfindingResult {
    status: String;
    message: String;
}
export interface OnPoiSelectedResult {
    buildingId: String;
    buildingName: String;
    floorId: String;
    floorName: String;
    poiId: String;
    poiName: String;
}
export interface OnPoiDeselectedResult {
    buildingId: String;
    buildingName: String;
}
export interface OnFloorChangedResult {
    buildingId: String;
    buildingName: String;
    fromFloorId: String;
    toFloorId: String;
    fromFloorName: String;
    toFloorName: String;
}
export interface Point {
    buildingId: String
    floorId: String
    latitude: Number
    longitude: Number
}
export interface Error {
    code: Number
    message: String
}
export interface Destination {
    category: String
    identifier?: String
    name?: String
    point: Point
}
export interface Navigation {
    status: String
    destination: Destination
}
export interface OnNavigationResult{
    navigation: Navigation
    error?: Error
}
export interface MapViewProps {
    user: string;
    apikey: string;
    googleApikey: string;
    buildingId: string;
    onMapReady?: (event: WayfindingResult) => void;
    onFloorChanged?: (event: OnFloorChangedResult) => void;
    onPoiSelected?: (event: OnPoiSelectedResult) => void;
    onPoiDeselected?: (event: OnPoiDeselectedResult) => void;
    onNavigationRequested?: (event: OnNavigationResult) => void;
    onNavigationStarted?: (event: OnNavigationResult) => void;
    onNavigationError?: (event: OnNavigationResult) => void;
    onNavigationFinished?: (event: OnNavigationResult) => void;
    style?: any;
    enablePoiClustering?: boolean;
    showPoiNames?: boolean;
    useRemoteConfig?: boolean;
    minZoom?: number;
    maxZoom?: number;
    initialZoom?: number;
    useDashboardTheme?: boolean;
}