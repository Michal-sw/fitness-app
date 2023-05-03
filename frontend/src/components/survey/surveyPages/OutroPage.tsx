import { Button, IconButton } from "@mui/material";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { CloseOutlined } from "@mui/icons-material";
import { SurveyDT } from "../../../core/types/SurrveryDT";
import axiosService from "../../../services/axiosService";
import useAuth from "../../../core/providers/AuthContext";
import { useState } from "react";
import { validateSurver } from "../../../core/validators/SurveyValidator";

interface IOutroPage {
  setPage: (page: number) => void;
  setVisible: (visible: boolean) => void;
  setPendingSurvey: (visible: boolean) => void;
  waterAnswer: number;
  sleepAnswer: number;
  trainingAnswer: number;
  surveyId: string;
}

const OutroPage = (props: IOutroPage) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = async () => {
    setLoading(true);
    if (
      validateSurver(props.waterAnswer, props.sleepAnswer, props.trainingAnswer)
    ) {
      const answers: SurveyDT = {
        waterScore: props.waterAnswer,
        sleepScore: props.sleepAnswer,
        trainingScore: props.trainingAnswer,
      };
      await axiosService
        .finishSurvey(token, props.surveyId, answers)
        .then(() => props.setPendingSurvey(false))
        .catch(() => {
          // handle error
        });
    }
    props.setVisible(false);
    setLoading(false);
  };

  return (
    <div className={"survey-body"}>
      {loading && (
        <Backdrop open={loading}>
          <CircularProgress color="success" />
        </Backdrop>
      )}
      <div className={"survey-header"}>
        <IconButton
          sx={{ alignSelf: "flex-end" }}
          onClick={() => props.setVisible(false)}
        >
          <CloseOutlined />
        </IconButton>
        <h2>
          Survey Completed!
          {/* Header fetched from backend */}
        </h2>
        <h3>
          It is important to make daily measurment on your health to keep track
          of Your progress
          {/* Bonus header also fetched from backend */}
        </h3>
      </div>
      <div className={"survey-buttons"}>
        <Button variant={"outlined"} onClick={() => props.setPage(3)}>
          Return
        </Button>
        <Button variant={"contained"} onClick={() => handleClose()}>
          Close survey
        </Button>
      </div>
    </div>
  );
};

export default OutroPage;
