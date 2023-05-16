import React, { useEffect, useRef, useState } from 'react';
//@ts-ignore
import { Building } from 'react-native-situm-plugin';
import {
  WebViewErrorEvent,
  WebViewMessageEvent,
} from 'react-native-webview/lib/WebViewTypes';
//This icon should either be inside plugin or not be used rat all
import { useSitum } from '.';
import { Mapper } from './mapper';
import { Platform } from 'react-native';
import * as wyf from '../definitions';
import WebView from 'react-native-webview';

// Define class that handles errors
export enum ErrorName {
  ERR_INTERNET_DISCONNECTED = 'ERR_INTERNET_DISCONNECTED',
  ERR_INTERNAL_SERVER_ERROR = 'ERR_INTERNAL_SERVER_ERROR',
}

const NETWORK_ERROR_CODE = {
  android: -2,
  ios: -1009,
  // These platforms are unhandled
  windows: 0,
  macos: 0,
  web: 0,
};

const sendMessageToViewer = (viewer: WebView, message: string) => {
  viewer.injectJavaScript(`window.postMessage(${message})`);
};

const CustomMapView: React.FC<wyf.MapViewProps> = ({
  domain,
  user,
  apikey,
  building,
  onPoiSelected = () => {},
  onError = () => {},
}) => {
  const webViewRef = useRef();
  // Local states
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  const {
    location,
    route,
    navigation,
    currentBuilding,
    initSitumSdk,
    initializeBuilding,
    initializeBuildingById,
    calculateRoute,
    startNavigation,
    stopNavigation,
  } = useSitum();

  const sendFollowUser = () => {
    if (
      webViewRef.current &&
      !mapLoaded &&
      location?.position?.buildingIdentifier === building?.buildingIdentifier
    ) {
      sendMessageToViewer(webViewRef.current, Mapper.followUser(true));
    }
  };

  // Initialize SDK when mounting map
  useEffect(() => {
    initSitumSdk({
      email: user,
      apiKey: apikey,
      withPosition: true,
      fetch: true,
    })
      .then(() => {
        console.info('SDK initialized successfully');
      })
      .catch((e) => {
        console.error(`Error on SDK initialization: ${e}`);
      });
  }, []);

  // Set current building to the one passed as prop
  useEffect(() => {
    initializeBuilding(building);
  }, [building]);

  // Updated SDK location
  useEffect(() => {
    if (!webViewRef.current || !location) return;

    sendMessageToViewer(webViewRef.current, Mapper.location(location));
  }, [location]);

  // Updated SDK navigation
  useEffect(() => {
    if (!webViewRef.current || !navigation) return;

    sendMessageToViewer(webViewRef.current, Mapper.navigation(navigation));
  }, [navigation]);

  // Updated SDK route
  useEffect(() => {
    if (!webViewRef.current || !route) return;

    sendMessageToViewer(webViewRef.current, Mapper.route(route));
  }, [route]);

  const handleRequestFromViewer = (event: WebViewMessageEvent) => {
    const eventParsed = JSON.parse(event.nativeEvent.data);
    switch (eventParsed.type) {
      case 'directions.requested':
        calculateRoute({
          originId: JSON.parse(event.nativeEvent.data).payload.originId,
          destinationId: JSON.parse(event.nativeEvent.data).payload
            .destinationId,
        });
        break;
      case 'navigation.requested':
        startNavigation({
          originId: JSON.parse(event.nativeEvent.data).payload.originId,
          destinationId: JSON.parse(event.nativeEvent.data).payload
            .destinationId,
        });
        break;
      case 'navigation.stopped':
        stopNavigation();
        break;
      case 'cartography.poi_selected':
        onPoiSelected(eventParsed?.payload);
        break;
      case 'cartography.building_selected':
        if (
          !eventParsed.payload.id ||
          (currentBuilding &&
            eventParsed.payload.id.toString() ===
              currentBuilding.buildingIdentifier)
        ) {
          return;
        }

        initializeBuildingById(eventParsed.payload.id.toString());
        break;
      default:
        break;
    }
  };

  return (
    <WebView
      //@ts-ignore
      ref={webViewRef}
      source={{
        uri: `${domain}/?email=${user}&apikey=${apikey}&wl=true&global=true&hide=ni&mode=embed&buildingid=${building?.buildingIdentifier}`,
      }}
      style={{
        minHeight: '100%',
        minWidth: '100%',
      }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      onMessage={handleRequestFromViewer}
      // This is called on a lot of interactions with the map because of url change probably
      onLoadEnd={() => {
        if (!webViewRef.current) return;
        sendFollowUser();
        setMapLoaded(true);
      }}
      onError={(evt: WebViewErrorEvent) => {
        const { nativeEvent } = evt;
        if (nativeEvent.code === NETWORK_ERROR_CODE[Platform.OS]) {
          onError({
            name: ErrorName.ERR_INTERNET_DISCONNECTED,
            description: nativeEvent.description,
          });
        } else {
          onError({
            name: ErrorName.ERR_INTERNAL_SERVER_ERROR,
            description: nativeEvent.description,
          });
        }
      }}
    />
  );
};

export default CustomMapView;
