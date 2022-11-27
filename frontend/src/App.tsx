import React from 'react';
import './App.scss';
import Login from './components/auth/Login';
import MapWrapper from './components/map/MapWrapper';

function App() {
  return (
    <div id='App'>
      <Login />
      <MapWrapper />
    </div>
  );
}

export default App;
