import InteractiveMap from './InteractiveMap';
import { Coordinates } from '../../core/types/CoordinatesDT';
import '../../styles/maps/InteractiveMap.scss';
import ErrorBoundary from './ErrorBoundary';

function MapWrapper() {
  const gdanskCoordinates: Coordinates = { latitude: 18.60, longitude: 54.35}; 

  return (
    <div id='map-wrapper-container'>
      <h3>Select your training place:</h3>
      <div id='map-wrapper'>
        <ErrorBoundary>
          <InteractiveMap latitude={gdanskCoordinates.latitude} longitude={gdanskCoordinates.longitude}/>
        </ErrorBoundary> 
      </div>
    </div>
  )
}

export default MapWrapper;
