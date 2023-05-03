interface ActivityFieldProps {
  label: any;
  value: any;
}

const ActivityField = ({ label, value }: ActivityFieldProps) => {
  return (
    <div className="activity-field">
      <span className="activity-field-label">{label}</span>
      <span className="activity-field-value">{value}</span>
    </div>
  );
};

export default ActivityField;
