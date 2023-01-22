import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './components/auth/PrivateRoute';
import Chatbot from './components/chatbot/Chatbot';
import MapWrapper from './components/map/MapWrapper';
import { AuthProvider } from './core/providers/AuthContext';
import Navbar from './components/navbar/Navbar';
import SignIn from './components/auth/SignIn';
import Login from './components/auth/Login';
import Notifications from './components/Notifications';

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
                    <MapWrapper/>
                  </PrivateRoute>
                }/>
            <Route path='/login' element=
              {
                <Login/>
              }
            />
            <Route path='/signIn' element=
              {
                <SignIn/>
              }/>
            </Routes>
          </>
        </AuthProvider>
        </BrowserRouter>
        <Chatbot />
        <Notifications />
      </div>
  );
}

export default App;
