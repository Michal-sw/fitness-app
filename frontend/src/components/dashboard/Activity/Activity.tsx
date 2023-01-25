import useAuth from "../../../core/providers/AuthContext";
import { ActivityDT } from "../../../core/types/ActivityDT";
import ActivityCheck from "./ActivityCheck";
import axiosService from "../../../services/axiosService";
import { AxiosResponse } from "axios";

interface ActivityProps {
    activity: ActivityDT;
}

const Activity = ({ activity }: ActivityProps) => {
    const { attendees, activityType, hasBeenChecked, date } = activity;
    const { token, user } = useAuth();

    const onCheck = (hasBeenSkipped: boolean) => {
        if (hasBeenSkipped) {
            axiosService
                .markActivityAsSkipped(token, user._id, { ...activity, hasBeenChecked: true })
                .then((res: AxiosResponse[]) => {
                    const newActivity = res[0].data.result;
                    const newUser = res[1].data.result;
                    console.log(res);
                    console.log(newActivity);
                    console.log(newUser);
                })
                .catch(err => console.log(err));
        } else {
            axiosService
                .updateActivity(token, { ...activity, hasBeenChecked: true })
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        }
    }

    const shouldBeVisible = !hasBeenChecked || new Date(date) > new Date();

    return (
        shouldBeVisible 
            ?
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
                    { !hasBeenChecked
                        ? <ActivityCheck  onCheck={onCheck} date={activity.date}/>
                        : null
                    }
                </div>
            : null
    );
};

export default Activity;