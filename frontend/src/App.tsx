import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './components/auth/PrivateRoute';
import Chatbot from './components/chatbot/Chatbot';
import MapWrapper from './components/map/MapWrapper';
import { AuthProvider } from './core/providers/AuthContext';

function App() {
  
  return (
      <div id='App'>
        <BrowserRouter>
        <AuthProvider>
          <Routes>
          <Route path='/' element=
              {
                <PrivateRoute>
                  <MapWrapper/>
                </PrivateRoute>
              }/>
          </Routes>
        </AuthProvider>
        </BrowserRouter>
        <Chatbot />
      </div>
  );
}

export default App;
