import "../../../styles/maps/ActivityForm.scss";

import { Field, Form, Formik } from "formik";

import { ActivityDT } from "../../../core/types/ActivityDT";
import DateTimeInput from "./DateTimeInput";
import React from "react";
import axiosService from "../../../services/axiosService";
import useActivity from "../../../core/providers/ActivityContext";
import useAuth from "../../../core/providers/AuthContext";
import useNotifications from "../../../hooks/useNotifications";
import DescriptionInput from "./DescriptionInput";

interface ActivityFormProps {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  placeId: number;
}

function ActivityForm({ isVisible, setVisible, placeId }: ActivityFormProps) {
  const { user, token } = useAuth();
  const { actions } = useNotifications();
  const { addActivity } = useActivity();

  function handleAddActivity(values: any) {
    const result = {
      ...values,
      attendees: [user._id],
      placeId,
      hasBeenChecked: false,
    };

    setVisible(false);

    axiosService
      .addActivity(token, user._id, result)
      .then((res) => {
        const newActivity: ActivityDT = res.data?.result?.result;
        actions.addNotification("Activity added!");
        addActivity({ ...newActivity, attendees: [user] });
      })
      .catch(() => actions.addNotification("Error when adding activity!"));
  }

  return isVisible ? (
    <div id="activity-form-container">
      <p id="close-button" onClick={() => setVisible(false)}>
        &#10006;
      </p>
      <Formik
        initialValues={{
          activityType: "running",
          date: "",
          description: "",
        }}
        onSubmit={(values) => handleAddActivity(values)}
      >
        <Form className={"login_form"}>
          <div>
            <label>Date</label>
            <Field name={"date"} component={DateTimeInput} />
          </div>
          <div>
            <label>Activity type</label>
            <Field
              name={"activityType"}
              placeholder={"Activity type"}
              as="select"
            >
              <option value="running">Running</option>
              <option value="strength">Strength</option>
              <option value="conditioning">Conditioning</option>
              <option value="basketball">Basketball</option>
            </Field>
          </div>
          <div>
            <label>Level</label>
            <Field name={"level"} placeholder={"Level"} as="select">
              <option value="novice">Novice</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="elite">Elite</option>
            </Field>
          </div>

          <div>
            <Field name={"description"} component={DescriptionInput} />
          </div>

          <button type={"submit"} className={"login_button"}>
            Submit workout!
          </button>
        </Form>
      </Formik>
    </div>
  ) : null;
}

export default ActivityForm;
