import '../../styles/users/User.scss'
import '../../styles/history/History.scss'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../core/providers/AuthContext';
import UserDetails from './UserDetails';
import { UserDT } from '../../core/types/UserDT';
import axiosService from '../../services/axiosService';

const defaultUserData: UserDT = {
    _id: "",
    firstName: "",
    lastName: "",
    password: "",
    login: "",
    email: "",
    refreshToken: "",
    activities: [],
    registrationDate: new Date()
}

const User = () => {
    const { id } = useParams();
    const [viewedUser, setViewedUser] = useState(defaultUserData);
    const { user, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (id === user._id) {
            setViewedUser(user);
        } else {
            axiosService
                .getUser(token, id || "")
                .then(res => setViewedUser(res.data.result))
                .catch(err => navigate('/404'));
        };
    }, [id, user._id]);

    return (
        <div className='user-container'>
            {viewedUser._id && 
                <UserDetails user={viewedUser} isOwner={id === user._id}/>
            }
        </div>
    );
};

export default User;
