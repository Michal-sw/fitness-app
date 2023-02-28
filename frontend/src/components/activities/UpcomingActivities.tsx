import "../../styles/activities/Activities.scss";
import Activity from "./Activity";
import useActivity from "../../core/providers/ActivityContext";

const UpcomingActivities = () => {
    const { upcomingActivities } = useActivity();

    return (
        <div id="upcoming-activities-container">
            {upcomingActivities.length
                ?
                <>
                    <h3>Upcoming activities:</h3>
                    <div id="activities-container">
                        {upcomingActivities.map((activity) => 
                            <Activity key={activity._id} activity={activity}/>
                        )}
                    </div>
                </>
                : <h4>You don't have any upcoming activities</h4>}
        </div>
    );
};

export default UpcomingActivities;