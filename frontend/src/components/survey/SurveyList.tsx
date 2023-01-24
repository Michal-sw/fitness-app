import { useEffect, useState } from 'react';
import useAuth from '../../core/providers/AuthContext';
import axiosService from '../../services/axiosService';
import '../../styles/survey/SurveyList.scss'

const SurveyList = () => {

    const { token, user } = useAuth();
    const [surveys, setSurveys] = useState<any>([]);
    const [score, setScore] = useState<number>(100);

    useEffect(() => {
        axiosService.getSurveys(token, user._id)
            .then(res => {
                setScore(res.data.score);
                setSurveys(res.data.result);
            }).catch(err => {
                console.log(err)
            });
    }, [])

    return (
        <>
            <div id={'survey-list'}>
                <h1>Survey history</h1>
                <h3>Your score is {score}</h3>
                <ul>
                    {surveys.map((x: any) => {
                        return (
                            <li key={x._id} className={`checked-survey-${x.hasBeenChecked}`}>
                                {`${new Date(x.date).getDate()}.${new Date(x.date).getMonth() + 1}.${new Date(x.date).getFullYear()}`}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default SurveyList;
