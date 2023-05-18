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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      <ActivityField
        label={t("activityCard.activityTypeLabel") + ":"}
        value={activityType}
      />
      <ActivityField
        label={t("activityCard.attendeesLabel") + ":"}
        value={<ActivityAttendeesList attendees={attendees} />}
      />
      {activity.date && (
        <ActivityField
          label={t("activityCard.dateLabel") + ":"}
          value={new Date(date).toLocaleDateString()}
        />
      )}
      ;
      <div className="activity-field">
        <button onClick={() => joinChatRoom(_id, activity.title || _id)}>
          {t("activityCard.openChat")}
        </button>
        <button onClick={onNavigateToLocation}>
          {t("activityCard.showOnMap")}
        </button>
      </div>
      {!hasBeenChecked && (
        <ActivityCheck onCheck={onCheck} date={activity.date} />
      )}
    </div>
  );
};

export default Activity;
