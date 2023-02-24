import '../../styles/Navbar.scss';
import useAuth from '../../core/providers/AuthContext';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FitbitIcon from '@mui/icons-material/Fitbit';
import NavbarSmartButton from './NavbarSmartButton';


function Navbar() {
    const { logout, authenticated, user } = useAuth();
    const navigate = useNavigate();

    return (
        <div id="navbar">
            <FitbitIcon id="logo-icon"/>
            {authenticated 
                ? 
                    <>
                    <NavbarSmartButton path='/' pathName='Dashboard'/>
                    <NavbarSmartButton path='/map' pathName='Map'/>
                    <NavbarSmartButton path='/map/activities' pathName='Join activity'/>
                    <NavbarSmartButton path='/history' pathName='History'/>
                    <div className='spacedRight'>
                        <button id='logout-button' className='navButton' onClick={logout}>Logout</button>
                        <AccountCircleIcon id="profile-icon" onClick={() => navigate(`/user/${user._id}`)}/>
                    </div>
                    </>
                :
                    <div className='spacedRight'>
                        <button id='login-button' className='navButton' onClick={() => navigate("/login")}>Log In</button>
                        <button className='navButton' onClick={() => navigate("/signin")}>Sign In</button>
                    </div>
            }

        </div>
    )
}

export default Navbar