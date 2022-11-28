import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './components/auth/PrivateRoute';
import MapWrapper from './components/map/MapWrapper';

function App() {
  
  return (
    <div id='App'>
      <BrowserRouter>
        <Routes>
        <Route path='/' element=
            {
              <PrivateRoute>
                <MapWrapper/>
              </PrivateRoute>
            }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
