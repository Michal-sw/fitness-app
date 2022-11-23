import React from 'react';
import './App.scss';
import Login from './components/auth/Login';
import MapWrapper from './components/map/MapWrapper';
import { Coordinates } from './core/types/CoordinatesDT';

function App() {
  const gdanskCoordinates: Coordinates = { latitude: 18.60, longitude: 54.35}; 

  return (
    <div id='App'>
      <Login />
      <MapWrapper />
    </div>
  );
}

export default App;
