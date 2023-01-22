import { useState } from "react";
import Survey from "../survey/Survey";
import "../../styles/dashboard/Dashboard.scss";

const Dashboard = () => {
    const [visibleSurvey, setVisibleSurvey] = useState<boolean>(true);

    return (
        <div id="dashboard_container">
            <Survey visible={visibleSurvey} setVisible={setVisibleSurvey}/>
        </div>
    );
};

export default Dashboard;