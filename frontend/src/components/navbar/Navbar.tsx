import '../../styles/Navbar.scss';
import useAuth from '../../core/providers/AuthContext';

function Navbar() {
    const { logout, authenticated } = useAuth();

    return (
        authenticated ? 
            <div id="navbar">
                <button id='logout' onClick={logout}>Logout</button>
            </div> 
        : null
    )
}

export default Navbar