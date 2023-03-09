import useAuth from "../../core/providers/AuthContext";
import { ActivityDT } from "../../core/types/ActivityDT";
import ActivityCheck from "./ActivityCheck";
import axiosService from "../../services/axiosService";
import useNotifications from "../../hooks/useNotifications";
import { useNavigate } from "react-router";
import { AxiosResponse } from "axios";
import useActivity from "../../core/providers/ActivityContext";
import useWebSocket from "../../core/providers/WebSocketContext";
import ActivityField from "./ActivityField";
import ActivityAttendeesList from "./ActivityAttendeesList";

interface ActivityProps {
    activity: ActivityDT;
}

const Activity = ({ activity }: ActivityProps) => {
    const { _id, attendees, activityType, hasBeenChecked, date, placeId } = activity;
    const { token, user } = useAuth();
    const { actions } = useNotifications();
    const navigate = useNavigate();
    const { editActivity } = useActivity();
    const { joinChatRoom } = useWebSocket();

    const onCheck = (hasBeenSkipped: boolean) => {
        const newActivity = { ...activity, hasBeenChecked: true };
        const promise = hasBeenSkipped 
            ? axiosService.markActivityAsSkipped(token, user._id, newActivity)
            : axiosService.markActivityAsPerformed(token, user._id, newActivity)
        handleMarkActivityPromise(promise);
        editActivity(newActivity);
    }
    
    const handleMarkActivityPromise = (promise: Promise<AxiosResponse<any, any>[]>) => {
        promise
            .then(_res => {
                actions.addNotification("Activity successfully marked")
            })
            .catch(_err => actions.addNotification("Error checking activity"));
    }

    const onNavigateToLocation = () => {
        navigate('/map', { state: { preFetchLocation: placeId }, replace: true});
    };

    return (
        <div className="activity">
            <ActivityField label="Activity Type:" value={activityType}/>
            <ActivityField label="Attendees:" value={
                <ActivityAttendeesList attendees={attendees}/>
            }/>
            {activity.date && 
                <ActivityField label="Date:" value={new Date(date).toLocaleDateString()}/>
            };
            <div className="activity-field">
                <button onClick={() => joinChatRoom(_id)}>Open chat</button>
                <button onClick={onNavigateToLocation}>Show on map</button>
            </div>
            {!hasBeenChecked &&
                <ActivityCheck  onCheck={onCheck} date={activity.date}/>
            }
        </div>
    );
};

export default Activity;