import useAuth from "../../../core/providers/AuthContext";
import { ActivityDT } from "../../../core/types/ActivityDT";
import ActivityCheck from "./ActivityCheck";
import axiosService from "../../../services/axiosService";
import { AxiosResponse } from "axios";
import useNotifications from "../../../hooks/useNotifications";
import { useNavigate } from "react-router";

interface ActivityProps {
    activity: ActivityDT;
}

const Activity = ({ activity }: ActivityProps) => {
    const { attendees, activityType, hasBeenChecked, date, placeId } = activity;
    const { token, user } = useAuth();
    const { actions } = useNotifications();
    const navigate = useNavigate();

    const onCheck = (hasBeenSkipped: boolean) => {
        if (hasBeenSkipped) {
            axiosService
                .markActivityAsSkipped(token, user._id, { ...activity, hasBeenChecked: true })
                .then(_res => actions.addNotification("Activity successfully marked"))
                .catch(_err => actions.addNotification("Error checking activity"));
        } else {
            axiosService
                .updateActivity(token, { ...activity, hasBeenChecked: true })
                .then(res => actions.addNotification("Activity successfully marked"))
                .catch(err => actions.addNotification("Error checking activity"));
        }
    }

    const onNavigateToLocation = () => {
        navigate('/map', { state: { preFetchLocation: placeId }, replace: true});
    };

    return (
        <div className="activity">
            <div className="activity-field">
                <span className="activity-field-label">Activity type:</span>
                <span className="activity-field-value">{activityType}</span>
            </div>
            <div className="activity-field">
                <span className="activity-field-label">Attendees number:</span>
                <span className="activity-field-value">{attendees.length}</span>
            </div>
            { activity.date
                ?
                    <div className="activity-field">
                        <span className="activity-field-label">Date:</span>
                        <span className="activity-field-value">{new Date(date).toLocaleDateString()}</span>
                    </div>
                : null};
            <div className="activity-field">
                <span className="activity-field-label">Location ID:</span>
                <span className="activity-field-value">{placeId}</span>
                <button onClick={onNavigateToLocation}>Show on map</button>
            </div>
            { !hasBeenChecked
                ? <ActivityCheck  onCheck={onCheck} date={activity.date}/>
                : null
            }
        </div>
    );
};

export default Activity;