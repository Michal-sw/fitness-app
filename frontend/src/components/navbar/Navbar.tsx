import '../../styles/Navbar.scss';
import useAuth from '../../core/providers/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const { logout, authenticated } = useAuth();
    const navigate = useNavigate();

    return (
        <div id="navbar">
            {authenticated 
                ? 
                    <>
                    <button className='navButton' onClick={() => navigate('/')}>Dashboard</button>
                    <button className='navButton' onClick={() => navigate('/map')}>Map</button>
                    <button className='navButton' onClick={() => navigate('/surveys')}>Surveys</button>
                    <div className='spacedRight'>
                        <button className='navButton' onClick={logout}>Logout</button>
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