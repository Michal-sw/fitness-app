import '../../styles/Navbar.scss';
import useAuth from '../../core/providers/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FitbitIcon from '@mui/icons-material/Fitbit';
import { useLayoutEffect } from 'react';

function Navbar() {
    const { logout, authenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    useLayoutEffect(() => {
        const element = document.getElementById(`nav-path-${location.pathname}`);
        element?.classList.add('active');
        return (() => {
            element?.classList.remove('active')
        });
    },[location]);

    return (
        <div id="navbar">
            <FitbitIcon id="logo-icon"/>
            {authenticated 
                ? 
                    <>
                    <button className='navButton' id="nav-path-/" onClick={() => navigate('/')}>Dashboard</button>
                    <button className='navButton' id="nav-path-/map" onClick={() => navigate('/map')}>Map</button>
                    <button className='navButton' id="nav-path-/map/activities" onClick={() => navigate('/map/activities')}>Join activity</button>
                    <button className='navButton' id="nav-path-/history" onClick={() => navigate('/history')}>History</button>
                    <div className='spacedRight'>
                        <button className='navButton' onClick={logout}>Logout</button>
                        <AccountCircleIcon id="profile-icon" onClick={() => navigate("/signin")}/>
                    </div>
                    </>
                :
                    <div className='spacedRight'>
                        <button className='navButton' onClick={() => navigate("/login")}>Log In</button>
                        <button className='navButton' onClick={() => navigate("/signin")}>Sign In</button>
                    </div>
            }

        </div>
    )
}

export default Navbar