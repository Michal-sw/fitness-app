import React from 'react';

interface IPendingSurveyProps {
    setVisible: (visible: boolean) => void;
    surveyId: string;
    setSurveyNumber: (n: string) => void;
}

const PendingSurvey = (props: IPendingSurveyProps) => {

    const handleClick = () => {
        props.setSurveyNumber('pending');
        props.setVisible(true);
    }

    return (
        <button onClick={handleClick} style={{ borderRadius: 8, fontSize: 24 }}>
            Pending Survey
        </button>
    );
}

export default PendingSurvey;