import React, { FC } from "react";
import { Coordinates } from "../../core/types/CoordinatesDT";
import "../../styles/maps/InteractiveMap.scss";
import ErrorBoundary from "./ErrorBoundary";

type MapWrapperProps = {
  latitude: number;
  longitude: number;
};

const MapWrapperHOC = (
  MapComponent: React.ComponentType<MapWrapperProps>
): FC => {
  const gdanskCoordinates: Coordinates = { latitude: 18.6, longitude: 54.35 };

  return function MapWrapper() {
    return (
      <div id="map-wrapper-container">
        <div id="map-wrapper">
          <ErrorBoundary>
            <MapComponent
              latitude={gdanskCoordinates.latitude}
              longitude={gdanskCoordinates.longitude}
            />
          </ErrorBoundary>
        </div>
      </div>
    );
  };
};

export default MapWrapperHOC;
