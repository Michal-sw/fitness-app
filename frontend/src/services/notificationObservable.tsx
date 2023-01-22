import { NotificationMessage } from "../core/types/NotificationmessageDT";


type SetStateFunction = React.Dispatch<React.SetStateAction<any>>

class NotificationObservable {
  private listeners:Array<SetStateFunction> = [];
  private notifications:Array<NotificationMessage> = [];

  public get() {
    return this.notifications;
  }
  
  public addNotification(notification:NotificationMessage, timeout:number = 5000) {
    const length = this.notifications.length;
    notification.id = length;

    this.notifications = [...this.notifications, notification];
    this.triggerStateChange();
    
    setTimeout(() => this.removeNotification(length), timeout);
  }

  private removeNotification(id:number) {
    const result = this.notifications.filter((notification, i) => id !== notification.id);
    this.notifications = result;

    this.triggerStateChange();
  }

  public subscribe(setState:SetStateFunction) {
    this.listeners = [...this.listeners, setState];
    return () => this.unsubscribe(setState); // will be used inside React.useEffect
  }

  private unsubscribe(setState:SetStateFunction) {
    this.listeners = this.listeners.filter(listener => listener !== setState);
  }
  
  private triggerStateChange() {
    this.listeners.forEach(setState => setState(this.notifications));
  }
}
export const NotificationObservableService = new NotificationObservable();