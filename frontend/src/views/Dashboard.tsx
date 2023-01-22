import MapWrapper from "../components/map/MapWrapper";
import useAuth from '../core/providers/AuthContext';
import '../styles/dashboard/Dashboard.scss';

const Dashboard = () => {
    const { username } = useAuth();
    return (
      <div id="dashboard_container">
        <h2>Hello {username}!</h2>
        <h3>Select your training place:</h3>
        <MapWrapper/>
      </div>
    )
  }
  
  export default Dashboard;