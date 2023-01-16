import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Survey from "../survey/Survey";

const Dashboard = () => {

    const navigate = useNavigate();
    const [visibleSurvey, setVisibleSurvey] = useState<boolean>(true);

    return (
        <div>
            <button onClick={() => navigate('/map')}>
                Go to map
            </button>
            <Survey visible={visibleSurvey} setVisible={setVisibleSurvey}/>
        </div>
    );
};

export default Dashboard;