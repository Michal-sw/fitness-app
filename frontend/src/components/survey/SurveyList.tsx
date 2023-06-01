import { useEffect, useState } from "react";

import axiosService from "../../services/axiosService";
import useAuth from "../../core/providers/AuthContext";
import useNotifications from "../../hooks/useNotifications";

const SurveyList = () => {
  const { token, user } = useAuth();
  const [surveys, setSurveys] = useState<any>([]);
  const [score, setScore] = useState<number>(100);
  const { actions } = useNotifications();

  useEffect(() => {
    axiosService
      .getSurveys(token, user._id)
      .then((res) => {
        setScore(res.data.score);
        setSurveys(res.data.result);
      })
      .catch(() => {
        actions.addErrorNotification("Could not get surveys");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div id={"survey-list"}>
        <h3>Your score is <strong>{score}</strong></h3>
        <ul>
          {surveys.map((x: any) => {
            return (
              <li key={x._id} className={`checked-survey-${x.hasBeenChecked}`}>
                {`${new Date(x.date).getDate()}.${
                  new Date(x.date).getMonth() + 1
                }.${new Date(x.date).getFullYear()}`}
                <div>{`Water score: ${x.waterScore}`}</div>
                <div>{`Sleep score: ${x.sleepScore}`}</div>
                <div>{`Training score: ${x.trainingScore}`}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SurveyList;
