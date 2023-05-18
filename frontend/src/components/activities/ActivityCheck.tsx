import { useTranslation } from "react-i18next";

interface ActivityCheckProps {
  onCheck: (hasBeenSkipped: boolean) => void;
  date: Date;
}

const ActivityCheck = ({ onCheck, date }: ActivityCheckProps) => {
  const { t } = useTranslation();
  const shouldBeVisible = date && new Date(date) < new Date();

  return shouldBeVisible ? (
    <div id="activity-check-container">
      <button onClick={() => onCheck(false)}>
        {t("activityCard.performedConfirm")}
      </button>
      <button onClick={() => onCheck(true)}>
        {t("activityCard.performedDecline")}
      </button>
    </div>
  ) : null;
};

export default ActivityCheck;
