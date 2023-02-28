import { useEffect, useState } from "react";
import Survey from "../survey/Survey";
import "../../styles/dashboard/Dashboard.scss";
import axiosService from "../../services/axiosService";
import useAuth from "../../core/providers/AuthContext";
import UpcomingActivities from "../activities/UpcomingActivities";
import PendingSurvey from "./surveys/PendingSurvey";
import useNotifications from "../../hooks/useNotifications";

const Dashboard = () => {
    const { token, user } = useAuth();
    const [visibleSurvey, setVisibleSurvey] = useState<boolean>(false);
    const [pendingSurvey, setPendingSurvey] = useState<boolean>(false);
    const [surveyId, setSurveyId] = useState<string>('');
    const [surveyNumber, setSurveyNumber] = useState<string>('');
    const { actions } = useNotifications();

    let getSurvey = true;
    useEffect(() => {
        if (getSurvey) {
            axiosService.startSurvey(token, user._id)
                .then(res => {
                    if (res.data.result && res.data.currentStreak) {
                        setSurveyId(res.data.result._doc._id);
                        setSurveyNumber(res.data.currentStreak)
                        setVisibleSurvey(true);
                    } else if (!res.data.completed && res.data.survey) {
                        setSurveyId(res.data.survey._id);
                        setPendingSurvey(true);
                    }
                }).catch(err => actions.addErrorNotification('Could not get surveys'));
            // eslint-disable-next-line react-hooks/exhaustive-deps
            getSurvey = false;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id="dashboard_container">
            <UpcomingActivities />
            <Survey visible={visibleSurvey} setVisible={setVisibleSurvey} surveyId={surveyId} surveyNumber={surveyNumber} setPendingSurvey={setPendingSurvey}/>
            {pendingSurvey && !visibleSurvey &&
                <PendingSurvey setVisible={setVisibleSurvey} surveyId={surveyId} setSurveyNumber={setSurveyNumber} />
            }
        </div>
    );
};

export default Dashboard;