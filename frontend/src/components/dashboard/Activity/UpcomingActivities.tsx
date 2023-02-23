import { useEffect, useState } from "react";
import "../../../styles/dashboard/Activities.scss";
import useAuth from "../../../core/providers/AuthContext";
import { ActivityDT } from "../../../core/types/ActivityDT";
import axiosService from "../../../services/axiosService";
import Activity from "./Activity";

const UpcomingActivities = () => {
    const { token, user } = useAuth();
    const [activities, setActivities] = useState<ActivityDT[]>([]);

    useEffect(() => {
        axiosService.getUserActivities(token, user._id)
            .then(res => {
                if (!res.data.result) return;
                const filteredActivities = res.data.result.filter(shouldRenderActivity);
                setActivities(filteredActivities);
            })
            .catch(err => console.log(err));
    }, [])

    const shouldRenderActivity = (activity: ActivityDT) => {
        return !activity.hasBeenChecked || new Date(activity.date) > new Date();
    } 

    return (
        <div id="upcoming-activities-container">
            {activities.length
                ?
                <>
                    <h3>Upcoming activities:</h3>
                    <div id="activities-container">
                        {activities.map((activity) => 
                            <Activity key={activity._id} activity={activity}/>
                        )}
                    </div>
                </>
                : <h4>You don't have any upcoming activities</h4>}
        </div>
    );
};

export default UpcomingActivities;