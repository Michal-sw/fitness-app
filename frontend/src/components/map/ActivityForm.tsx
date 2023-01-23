import { Field, Form, Formik } from 'formik';
import React from 'react';
import '../../styles/maps/ActivityForm.scss';
import DateTimeInput from './DateTimeInput';
import useAuth from '../../core/providers/AuthContext';
import useNotifications from '../../hooks/useNotifications';

interface ActivityFormProps {
    isVisible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    placeId: number,
}

function ActivityForm({ isVisible, setVisible, placeId }: ActivityFormProps) {
    const { user } = useAuth();
    const { actions } = useNotifications();
    
    function handleAddActivity (values: any) {
        const result = {
            ...values,
            attendees: [user._id],
            placeId
        };

        actions.sendDissapearingNotification({ message: "Workout succesfully added!" });
        console.log(result);
        setVisible(false);
    }
    
    return (
        isVisible
            ?
                <div id='activity-form-container'>
                    <p id="close-button" onClick={() => setVisible(false)}>&#10006;</p>
                    <Formik initialValues={{
                        activityType: "",
                        date: ""
                    }} onSubmit={(values) => handleAddActivity(values)}>
                        <Form className={"login_form"}>
                            <div>
                                <label>Date</label>
                                <Field name={"date"} component={DateTimeInput} />
                            </div>
                            <div>
                                <label>Activity type</label>
                                <Field name={"activityType"} placeholder={"Activity type"} as="select">
                                    <option value="running">Running</option>
                                    <option value="strength">Strength</option>
                                    <option value="conditioning">Conditioning</option>
                                    <option value="basketball">Basketball</option>
                                </Field>
                            </div>

                            <button type={"submit"} className={"login_button"}>Submit workout!</button>
                        </Form>
                    </Formik>   
                </div>
            : null
        
        
    )
}

export default ActivityForm;