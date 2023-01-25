import { useEffect, useState } from "react";
import "../../styles/dashboard/Dashboard.scss";
import useAuth from "../../core/providers/AuthContext";
import { ActivityDT } from "../../core/types/ActivityDT";
import axiosService from "../../services/axiosService";

const UpcomingActivities = () => {
    const { token, user } = useAuth();
    const [activities, setActivities] = useState<ActivityDT[]>([]);

    useEffect(() => {
        console.log(user.activities);
        axiosService.getUserActivities(token, user._id)
            .then(res => {
                console.log(res.data.result);
                if (!res.data.result) return;
                setActivities(res.data.result);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div id="activities-container">
            <h3>Upcoming activities:</h3>
            {user.activities.length
                ?
                    <ul>
                        {activities.map((activity) => {
                            return <li key={activity._id}>{activity.activityType}</li>
                        })}
                    </ul>
                : <h4>You don't have any upcoming activities</h4>}
        </div>
    );
};

export default UpcomingActivities;