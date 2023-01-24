import { useEffect, useState } from "react";
import Survey from "../survey/Survey";
import "../../styles/dashboard/Dashboard.scss";
import axiosService from "../../services/axiosService";
import useAuth from "../../core/providers/AuthContext";

const Dashboard = () => {
    const { token, user } = useAuth();
    const [visibleSurvey, setVisibleSurvey] = useState<boolean>(false);
    const [surveyId, setSurveyId] = useState<string>('');
    const [surveyNumber, setSurveyNumber] = useState<string>('');

    let getSurvey = true;
    useEffect(() => {
        if (getSurvey) {
            axiosService.startSurvey(token, user._id)
                .then(res => {
                    if (!res.data.completed && !res.data.result.hasBeenChecked) {
                        setSurveyId(res.data.result._doc._id);
                        setSurveyNumber(res.data.result.amount)
                        setVisibleSurvey(true);
                    }
                }).catch(err => console.log(err))
            // eslint-disable-next-line react-hooks/exhaustive-deps
            getSurvey = false;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id="dashboard_container">
            {visibleSurvey &&
                <Survey visible={visibleSurvey} setVisible={setVisibleSurvey} surveyId={surveyId} surveyNumber={surveyNumber}/>
            }
        </div>
    );
};

export default Dashboard;