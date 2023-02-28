import { createContext, ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { ActivityDT } from "../types/ActivityDT";
import useAuth from "./AuthContext";
import axiosService from "../../services/axiosService";

interface ActivityContextType {
  activities: ActivityDT[];
  upcomingActivities: ActivityDT[];
  addActivity: (activity: ActivityDT) => void;
  editActivity: (activity: ActivityDT) => void;
}

const ActivityContext = createContext<ActivityContextType>(
  {} as ActivityContextType
);

function shouldRenderActivity(activity: ActivityDT) {
  return !activity.hasBeenChecked || new Date(activity.date) > new Date();
} 

function sortByDate (a:ActivityDT, b:ActivityDT) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function ActivityProvider({ children }: {children: ReactElement }) {
  const [activities, setActivities] = useState<ActivityDT[]>([]);
  const [editCounter, setEditCounter] = useState<number>(0);
  const { token, authenticated, user } = useAuth();

  useEffect(() => {
    if (!authenticated) return;
    axiosService.getUserActivities(token, user._id)
      .then(res => {
          if (!res.data.result) return;
          setActivities(res.data.result);
      })
      .catch(err => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  function addActivity(activity: ActivityDT) {
    setActivities([...activities, activity]);
  }

  function editActivity(newActivity: ActivityDT) {
    const newActivities = activities
      .map(act => act._id === newActivity._id ? newActivity : act)
    
    setActivities(newActivities);
    setEditCounter(editCounter+1)
  }

  const memoedValue = useMemo(
    () => ({
      activities: activities.sort(sortByDate),
      upcomingActivities: activities.filter(shouldRenderActivity),
      addActivity,
      editActivity
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activities.length, editCounter]
  );

  return (
    <ActivityContext.Provider value={memoedValue}>
      {children}
    </ActivityContext.Provider>
  );
}

export default function useActivity() {
  return useContext(ActivityContext);
}
