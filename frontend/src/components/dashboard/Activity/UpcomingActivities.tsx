import { useEffect, useState } from "react";
import "../../../styles/dashboard/Dashboard.scss";
import useAuth from "../../../core/providers/AuthContext";
import { ActivityDT } from "../../../core/types/ActivityDT";
import axiosService from "../../../services/axiosService";
import Activity from "./Activity";

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
        <div id="upcoming-activities-container">
            <h3>Upcoming activities:</h3>
            {user.activities.length
                ?
                    <div id="activities-container">
                        {activities.map((activity) => 
                            <Activity key={activity._id} activity={activity}/>
                        )}
                    </div>
                : <h4>You don't have any upcoming activities</h4>}
        </div>
    );
};

export default UpcomingActivities;