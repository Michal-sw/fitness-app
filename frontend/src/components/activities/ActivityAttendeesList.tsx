import { useNavigate } from "react-router";
import { Chip } from "@mui/material";

interface AttendeesListProps {
    attendees: { _id: string, login: string }[];
}

const ActivityAttendeesList = ({ attendees }: AttendeesListProps) => {
    const navigate = useNavigate();

    return (
        <div className="activity-field-value attendees-list">
            {attendees.map((attendee,i) => 
                <Chip 
                    key={i}
                    label={attendee.login}
                    onClick={() => navigate(`/user/${attendee._id}`)}
                />
            )}
        </div>
    );
};

export default ActivityAttendeesList;