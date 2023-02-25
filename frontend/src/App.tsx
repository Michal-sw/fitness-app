import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './components/auth/PrivateRoute';
import Chatbot from './components/chatbot/Chatbot';
import MapWrapper from './components/map/MapWrapper';
import ActivityMapWrapper from './components/map/ActivityMapWrapper';
import { AuthProvider } from './core/providers/AuthContext';
import Navbar from './components/navbar/Navbar';
import SignIn from './components/auth/SignIn';
import Login from './components/auth/Login';
import Notifications from './components/Notifications';
import Dashboard from './components/dashboard/Dashboard';
import History from './components/history/History';
import User from './components/users/User';
import Overlay from './components/Overlay';

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
            <Route path='/login' element=
                {
                  <Login/>
                }/>
            <Route path='/map' element=
                {
                  <PrivateRoute>
                    <MapWrapper />
                  </PrivateRoute>
                }/>
            <Route path='map/activities' element=
              {
                <PrivateRoute>
                    <ActivityMapWrapper />
                </PrivateRoute>
              }/>
            <Route path='/history' element=
            {
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }/>
            <Route path='/signIn' element=
              {
                <SignIn/>
              }/>
            <Route path='/user/:id' element=
              {
                <User />
              }/>
            </Routes>
          </>
        </AuthProvider>
        </BrowserRouter>
        <Chatbot />
        <Notifications />
        <Overlay/>
        
      </div>
  );
}

export default App;
