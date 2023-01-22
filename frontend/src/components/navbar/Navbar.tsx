import '../../styles/Navbar.scss';
import useAuth from '../../core/providers/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const { logout, authenticated, signIn } = useAuth();
    const navigate = useNavigate();

    const navigateToSignin = () => {
        navigate("/signIn");
    }
    const navigateToLogin = () => {
        navigate("/login");
    }

    return (
        <div id="navbar">
            {authenticated 
                ? 
                    <div className='spacedRight'>
                        <button className='navButton' onClick={logout}>Logout</button>
                    </div>
                :
                    <div className='spacedRight'>
                        <button className='navButton' onClick={navigateToLogin}>Log In</button>
                        <button className='navButton' onClick={navigateToSignin}>Sign In</button>
                    </div>
            }

        </div>
    )
}

export default Navbar