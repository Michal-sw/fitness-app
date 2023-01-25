import { useState } from "react";
import useAuth from "../../../core/providers/AuthContext";
import { ActivityDT } from "../../../core/types/ActivityDT";
import ActivityCheck from "./ActivityCheck";

interface ActivityProps {
    activity: ActivityDT;
}

const Activity = ({ activity }: ActivityProps) => {
    const { attendees, activityType, hasBeenChecked, date } = activity;
    const { token, user } = useAuth();

    const onCheck = (hasBeenSkipped: boolean) => {
        console.log(hasBeenSkipped);
    }

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
                        <span className="activity-field-value">{date.toString()}</span>
                    </div>
                : null};
            { !activity.hasBeenChecked
                ? <ActivityCheck  onCheck={onCheck} date={activity.date}/>
                : null
            }
        </div>
    );
};

export default Activity;