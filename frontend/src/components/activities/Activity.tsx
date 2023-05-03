import ActivityAttendeesList from "./ActivityAttendeesList";
import ActivityCheck from "./ActivityCheck";
import { ActivityDT } from "../../core/types/ActivityDT";
import ActivityField from "./ActivityField";
import { AxiosResponse } from "axios";
import axiosService from "../../services/axiosService";
import useActivity from "../../core/providers/ActivityContext";
import useAuth from "../../core/providers/AuthContext";
import { useNavigate } from "react-router";
import useNotifications from "../../hooks/useNotifications";
import useWebSocket from "../../core/providers/WebSocketContext";

interface ActivityProps {
  activity: ActivityDT;
}

const Activity = ({ activity }: ActivityProps) => {
  const { _id, attendees, activityType, hasBeenChecked, date, placeId } =
    activity;
  const { token, user } = useAuth();
  const { actions } = useNotifications();
  const navigate = useNavigate();
  const { editActivity } = useActivity();
  const { joinChatRoom } = useWebSocket();

  const onCheck = (hasBeenSkipped: boolean) => {
    const newActivity = { ...activity, hasBeenChecked: true };
    const promise = hasBeenSkipped
      ? axiosService.markActivityAsSkipped(token, user._id, newActivity)
      : axiosService.markActivityAsPerformed(token, user._id, newActivity);
    handleMarkActivityPromise(promise);
    editActivity(newActivity);
  };

  const handleMarkActivityPromise = (
    promise: Promise<AxiosResponse<any, any>[]>
  ) => {
    promise
      .then(() => {
        actions.addNotification("Activity successfully marked");
      })
      .catch(() => actions.addNotification("Error checking activity"));
  };

  const onNavigateToLocation = () => {
    navigate("/map", { state: { preFetchLocation: placeId }, replace: true });
  };

  return (
    <div className="activity">
      <ActivityField label="Activity Type:" value={activityType} />
      <ActivityField
        label="Attendees:"
        value={<ActivityAttendeesList attendees={attendees} />}
      />
      {activity.date && (
        <ActivityField
          label="Date:"
          value={new Date(date).toLocaleDateString()}
        />
      )}
      ;
      <div className="activity-field">
        <button onClick={() => joinChatRoom(_id)}>Open chat</button>
        <button onClick={onNavigateToLocation}>Show on map</button>
      </div>
      {!hasBeenChecked && (
        <ActivityCheck onCheck={onCheck} date={activity.date} />
      )}
    </div>
  );
};

export default Activity;
