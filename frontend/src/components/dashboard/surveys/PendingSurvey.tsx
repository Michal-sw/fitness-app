import React from "react";
import { useTranslation } from "react-i18next";

interface IPendingSurveyProps {
  setVisible: (visible: boolean) => void;
  surveyId: string;
  setSurveyNumber: (n: string) => void;
}

const PendingSurvey = (props: IPendingSurveyProps) => {
  const { t } = useTranslation();

  const handleClick = () => {
    props.setSurveyNumber("pending");
    props.setVisible(true);
  };

  return (
    <button onClick={handleClick} style={{ borderRadius: 8, fontSize: 24 }}>
      {t("survey.pending-survey")}
    </button>
  );
};

export default PendingSurvey;
