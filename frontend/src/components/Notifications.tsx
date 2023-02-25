import { useEffect } from "react";
import '../styles/Notifications.scss';
import useNotifications from "../hooks/useNotifications";

const Notifications = () => {
  const { notifications, actions } = useNotifications(); 
  
  useEffect(() => undefined, [notifications.length])

  return (
    <div id="notification-container">
      {notifications.map((notification, i) => {
        return (
          <li key={i} className={`notification fade-in ${notification.className || ""}`}>
            {notification.message}
          </li>
        )
      })}
    </div>
  )
}

export default Notifications;