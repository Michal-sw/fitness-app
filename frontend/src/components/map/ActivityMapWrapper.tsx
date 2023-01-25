import { Coordinates } from '../../core/types/CoordinatesDT';
import '../../styles/maps/InteractiveMap.scss';
import ErrorBoundary from './ErrorBoundary';
import ActivityMap from './ActivityMap';

function MapWrapper() {
  const gdanskCoordinates: Coordinates = { latitude: 18.60, longitude: 54.35}; 

  return (
    <div id='map-wrapper-container'>
      <h3>Select an activity which You wish to join:</h3>
      <div id='map-wrapper'>
        <ErrorBoundary>
          <ActivityMap latitude={gdanskCoordinates.latitude} longitude={gdanskCoordinates.longitude}/>
        </ErrorBoundary> 
      </div>
    </div>
  )
}

export default MapWrapper;
