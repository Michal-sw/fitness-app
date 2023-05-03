import { useEffect, useMemo, useState } from "react";

import { NotificationObservableService } from "../services/notificationObservable";

const notificationStore = NotificationObservableService;

const useNotifications = () => {
  const [notifications, setNotifications] = useState(notificationStore.get());

  useEffect(() => {
    return notificationStore.subscribe(setNotifications);
  }, []);

  const actions = useMemo(() => {
    return {
      addNotification: (notificationMessage: string, timeout = 5000) =>
        notificationStore.addNotification(
          { message: notificationMessage },
          timeout
        ),
      addErrorNotification: (notificationMessage: string, timeout = 5000) =>
        notificationStore.addNotification(
          { message: notificationMessage, className: "error" },
          timeout
        ),
      addSuccessNotification: (notificationMessage: string, timeout = 5000) =>
        notificationStore.addNotification(
          { message: notificationMessage, className: "success" },
          timeout
        ),
    };
  }, []);

  return {
    notifications,
    actions,
  };
};

export default useNotifications;
