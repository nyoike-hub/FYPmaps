import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, StreetViewPanorama } from '@react-google-maps/api';
import { myApiKey } from './mapsConfigKey';

const containerStyle = {
  width: '100%',
  height: '500px'
};

//Default location when loading the map
const center = {
  lat: -1.2921,  // Latitude for Nairobi, Kenya
  lng: 36.8219,  // Longitude for Nairobi, Kenya
};

const streetViewPosition = {
  lat: -1.286389, // Some default position in Nairobi
  lng: 36.817223,
};

const App = () => {
  const [streetView, setStreetView] = useState(false);
  const mapRef = useRef(null);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const toggleStreetView = () => {
    setStreetView(!streetView);
  };

  return (
    <div>
      <h1>Kenya Map with Street View</h1>
      <LoadScript googleMapsApiKey = {myApiKey}>
        {!streetView ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
          >
            {/* You can place markers or other components here */}
          </GoogleMap>
        ) : (
          <StreetViewPanorama
            position={streetViewPosition}
            visible={streetView}
            options={{ pov: { heading: 100, pitch: 0 } }}
          />
        )}
      </LoadScript>

      <button onClick={toggleStreetView}>
        {streetView ? "Switch to Map View" : "Switch to Street View"}
      </button>
    </div>
  );
};

export default App;
