import React, { useState, useEffect, useCallback, useRef } from "react";
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { myApiKey } from "./mapsConfigKey";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -1.2921, // Latitude for Nairobi, Kenya
  lng: 36.8219, // Longitude for Nairobi, Kenya
};

// Predefined points along the Nairobi-Mombasa Highway
const roadCoordinates = [
  { id: 1, lat: -1.2921, lng: 36.8219 }, // Nairobi
  { id: 2, lat: -1.3565, lng: 37.5650 }, // Machakos Junction
  { id: 3, lat: -1.7421, lng: 37.9990 }, // Emali
  { id: 4, lat: -2.2832, lng: 38.7736 }, // Kibwezi
  { id: 5, lat: -2.9909, lng: 39.5721 }, // Voi
  { id: 6, lat: -3.4264, lng: 39.6770 }, // Mariakani
  { id: 7, lat: -4.0435, lng: 39.6682 }, // Mombasa
];

const polylineOptions = {
  strokeColor: "#0000FF", // Blue color
  strokeOpacity: 0.8,
  strokeWeight: 2,
};

const MarkersApp = () => {
  const mapRef = useRef(null);

  // Initialize state with markers from localStorage if they exist
  const [markers, setMarkers] = useState(() => {
    const savedMarkers = localStorage.getItem("markers");
    return savedMarkers ? JSON.parse(savedMarkers) : []; // Start with an empty array
  });

  // Save markers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("markers", JSON.stringify(markers));
  }, [markers]);

  // Function to add multiple markers
  const addMarkers = (newMarkers) => {
    setMarkers((prevMarkers) => {
      const uniqueMarkers = newMarkers.filter(
        (newMarker) => !prevMarkers.find((marker) => marker.id === newMarker.id)
      ); // Only add unique markers
      return [...prevMarkers, ...uniqueMarkers];
    });
  };

  // Function to clear all markers
  const clearMarkers = () => {
    setMarkers([]);
    localStorage.removeItem("markers"); // Clear markers from localStorage
  };

  const onMapClick = (e) => {
    // When the map is clicked, add a marker at the click location
    const location = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    addMarkers([{ id: markers.length + 1, ...location }]);
  };

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  return (
    <div>
      <h1>Nairobi-Mombasa Highway with Persistent Markers</h1>

      {/* Google Map */}
      <LoadScript googleMapsApiKey={myApiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7} // Adjusted zoom to show more area
          onClick={onMapClick} // Add marker on map click
          onLoad={onLoad}
        >
          {/* Render predefined highway markers */}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              label={`Marker ${marker.id}`} // Label for marker
            />
          ))}

          {/* Render polyline to represent the highway */}
          <Polyline path={markers.map(m => ({ lat: m.lat, lng: m.lng }))} options={polylineOptions} />
        </GoogleMap>
      </LoadScript>

      {/* Buttons to add and clear markers */}
      <button onClick={() => addMarkers(roadCoordinates)}>Add All Markers</button>
      <button onClick={clearMarkers}>Clear Markers</button>

      {/* List of markers */}
      <ul>
        {markers.map((marker) => (
          <li key={marker.id}>
            {`Marker ${marker.id}`} at lat: {marker.lat}, lng: {marker.lng}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarkersApp;
