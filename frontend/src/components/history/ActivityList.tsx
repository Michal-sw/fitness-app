import { useEffect, useState } from 'react';
import { ActivityDT } from '../../core/types/ActivityDT';
import axiosService from '../../services/axiosService';
import useAuth from '../../core/providers/AuthContext';
import Activity from '../dashboard/Activity/Activity';

const ActivityList = () => {
    const { token, user } = useAuth();
    const [activities, setActivities] = useState<ActivityDT[]>([]);

    useEffect(() => {
        axiosService.getUserActivities(token, user._id)
            .then(res => {
                console.log(res.data.result);
                if (!res.data.result) return;
                const sortedActivities = res.data.result
                    .sort((a:ActivityDT, b:ActivityDT) => {
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    }
                );
                setActivities(sortedActivities);
            })
            .catch(err => console.log(err));
    }, [])

    

    return (
        <div id='activities-container'>
            {activities.map((activity) => 
                <Activity key={activity._id} activity={activity}/>
            )}
        </div>
    )
};

export default ActivityList;
