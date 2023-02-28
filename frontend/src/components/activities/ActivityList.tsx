import Activity from './Activity';
import useActivity from '../../core/providers/ActivityContext';

const ActivityList = () => {
    const { activities } = useActivity();

    return (
        <div id='activities-container'>
            {activities.map((activity) => 
                <Activity key={activity._id} activity={activity}/>
            )}
        </div>
    )
};

export default ActivityList;
