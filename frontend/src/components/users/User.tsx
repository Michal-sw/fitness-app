import '../../styles/users/User.scss'
import '../../styles/history/History.scss'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const User = () => {
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
    }, [id]);

    return (
        <div id='user-container'>
            <p>User {id}</p>
        </div>
    );
};

export default User;
