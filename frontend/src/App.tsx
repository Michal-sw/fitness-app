import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './components/auth/PrivateRoute';
import { AuthProvider } from './core/providers/AuthContext';
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import MapWrapper from './components/map/MapWrapper';

function App() {
  
  return (
      <div id='App'>
        <BrowserRouter>
        <AuthProvider>
          <>
            <Navbar/>
            <Routes>
            <Route path='/' element=
                {
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }/>
            <Route path='/map' element=
                {
                  <PrivateRoute>
                    <MapWrapper />
                  </PrivateRoute>
                }/>
            </Routes>
          </>
        </AuthProvider>
        </BrowserRouter>
        {/* <Chatbot /> */}
      </div>
  );
}

export default App;
