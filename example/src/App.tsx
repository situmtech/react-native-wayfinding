import React from 'react';
import MapViewScreen from './MapViewScreen';
import { SitumProvider } from '@situm/react-native-wayfinding';

export const SITUM_EMAIL = 'YOUR EMAIL HERE';
export const SITUM_API_KEY = 'YOUR APIKEY HERE';

const App: React.FC = () => {
  return (
    <SitumProvider email={SITUM_EMAIL} apiKey={SITUM_API_KEY}>
      <MapViewScreen />
    </SitumProvider>
  );
};

export default App;
