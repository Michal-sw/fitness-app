import { useEffect, useMemo, useState } from "react";

import { NotificationMessage } from "../core/types/NotificationmessageDT";
import { NotificationObservableService } from "../services/notificationObservable";

const notificationStore = NotificationObservableService;

const useNotifications = () => {
  const [notifications, setNotifications] = useState(notificationStore.get());

  useEffect(() => {
    return notificationStore.subscribe(setNotifications);
  }, []);

  const actions = useMemo(() => {
    return {
      sendDissapearingNotification: (notification: NotificationMessage, timeout:number = 5000) => 
        notificationStore.addNotification(notification, timeout)
    }
  }, [])
  
  return {
    notifications,
    actions,
  };
}

export default useNotifications;