import SurveyList from '../survey/SurveyList';
import ActivityList from '../activities/ActivityList';
import '../../styles/survey/SurveyList.scss'
import '../../styles/history/History.scss'

const History = () => {
    return (
        <div id='history-container'>
            <h1>User history</h1>
            <div id='history-lists-container'>
                <SurveyList />
                <ActivityList />
            </div>
        </div>
    );
};

export default History;
