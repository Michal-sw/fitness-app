interface ActivityCheckProps {
  onCheck: (hasBeenSkipped: boolean) => void;
  date: Date;
}

const ActivityCheck = ({ onCheck, date }: ActivityCheckProps) => {
  const shouldBeVisible = date && new Date(date) < new Date();

  return shouldBeVisible ? (
    <div id="activity-check-container">
      <button onClick={() => onCheck(false)}>Sweated!</button>
      <button onClick={() => onCheck(true)}>Skipped</button>
    </div>
  ) : null;
};

export default ActivityCheck;
