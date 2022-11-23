import InteractiveMap from './InteractiveMap';
import { Coordinates } from '../../core/types/CoordinatesDT';

function MapWrapper() {
  const gdanskCoordinates: Coordinates = { latitude: 18.60, longitude: 54.35}; 

  return (
    <InteractiveMap latitude={gdanskCoordinates.latitude} longitude={gdanskCoordinates.longitude}/>
  );
}

export default MapWrapper;
