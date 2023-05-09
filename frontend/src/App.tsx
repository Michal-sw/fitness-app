import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ActivityProvider } from "./core/providers/ActivityContext";
import { AuthProvider } from "./core/providers/AuthContext";
import ChatList from "./components/chat/ChatList";
import Chatbot from "./components/chatbot/Chatbot";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import History from "./components/history/History";
import Login from "./components/auth/Login";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./components/NotFound";
import Notifications from "./components/Notifications";
import Overlay from "./components/Overlay";
import PrivateRoute from "./components/auth/PrivateRoute";
import SignIn from "./components/auth/SignIn";
import User from "./components/users/User";
import { WebSocketProvider } from "./core/providers/WebSocketContext";
import WelcomePage from "./components/WelcomePage";
import MapWrapperHOC from "./components/map/MapWrapperHOC";
import ActivityMap from "./components/map/ActivityMap";
import InteractiveMap from "./components/map/InteractiveMap";

const MapComponent = MapWrapperHOC(InteractiveMap);
const ActivitySearchMapComponent = MapWrapperHOC(ActivityMap);

function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <AuthProvider>
          <ActivityProvider>
            <WebSocketProvider>
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<WelcomePage />} />
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/map"
                    element={
                      <PrivateRoute>
                        <MapComponent />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="map/activities"
                    element={
                      <PrivateRoute>
                        <ActivitySearchMapComponent />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/history"
                    element={
                      <PrivateRoute>
                        <History />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/signIn" element={<SignIn />} />
                  <Route path="/user/:id" element={<User />} />
                  <Route path="/404" element={<NotFound />} />
                </Routes>
                <ChatList />
                <Footer />
              </>
            </WebSocketProvider>
          </ActivityProvider>
        </AuthProvider>
      </BrowserRouter>
      <Chatbot />
      <Notifications />
      <Overlay />
    </div>
  );
}

export default App;
