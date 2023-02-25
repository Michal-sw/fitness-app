import useAuth from "../../../core/providers/AuthContext";
import { ActivityDT } from "../../../core/types/ActivityDT";
import ActivityCheck from "./ActivityCheck";
import axiosService from "../../../services/axiosService";
import useNotifications from "../../../hooks/useNotifications";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AxiosResponse } from "axios";
import { Chip } from "@mui/material";

interface ActivityProps {
    activity: ActivityDT;
}

const Activity = ({ activity }: ActivityProps) => {
    const { attendees, activityType, hasBeenChecked, date, placeId } = activity;
    const [hasBeenCheckedLocaly, setHasBeenChecked] = useState<boolean>(hasBeenChecked || false);
    const { token, user } = useAuth();
    const { actions } = useNotifications();
    const navigate = useNavigate();

    const onCheck = (hasBeenSkipped: boolean) => {
        if (hasBeenSkipped) {
            const promise = axiosService
                .markActivityAsSkipped(token, user._id, { ...activity, hasBeenChecked: true })
            handleMarkActivityPromise(promise);
        } else {
            const promise = axiosService
                .markActivityAsPerformed(token, user._id, { ...activity, hasBeenChecked: true })
            handleMarkActivityPromise(promise);
        }
    }
    
    const handleMarkActivityPromise = (promise: Promise<AxiosResponse<any, any>[]>) => {
        promise
            .then(_res => {
                actions.addNotification("Activity successfully marked")
                setHasBeenChecked(true);
            })
            .catch(_err => actions.addNotification("Error checking activity"));
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
                <span className="activity-field-label">Attendees:</span>
                <div className="activity-field-value attendees-list">
                    {attendees.map((attendee,i) => 
                        <Chip 
                            key={i}
                            label={attendee.login}
                            onClick={() => navigate(`/user/${attendee._id}`)}
                        />
                    )}
                </div>
            </div>
            { activity.date
                ?
                    <div className="activity-field">
                        <span className="activity-field-label">Date:</span>
                        <span className="activity-field-value">{new Date(date).toLocaleDateString()}</span>
                    </div>
                : null};
            <div className="activity-field">
                <button onClick={onNavigateToLocation}>Show on map</button>
            </div>
            { !hasBeenCheckedLocaly
                ? <ActivityCheck  onCheck={onCheck} date={activity.date}/>
                : null
            }
        </div>
    );
};

export default Activity;