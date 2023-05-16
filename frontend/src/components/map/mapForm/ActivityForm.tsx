import "../../../styles/maps/ActivityForm.scss";

import { useFormik } from "formik";

import { ActivityDT } from "../../../core/types/ActivityDT";
import DateTimeInput from "./DateTimeInput";
import React from "react";
import { useTranslation } from "react-i18next";

import axiosService from "../../../services/axiosService";
import useActivity from "../../../core/providers/ActivityContext";
import useAuth from "../../../core/providers/AuthContext";
import useNotifications from "../../../hooks/useNotifications";
import { TextField, TextareaAutosize } from "@mui/material";
import SelectField from "./SelectField";
import { ACTIVITY_LEVELS, ACTIVITY_TYPES, validationSchema } from "./helpers";

interface ActivityFormProps {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  placeId: number;
}

function ActivityForm({ isVisible, setVisible, placeId }: ActivityFormProps) {
  const { user, token } = useAuth();
  const { actions } = useNotifications();
  const { addActivity } = useActivity();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      activityType: "running",
      date: "",
      level: "novice",
      title: "",
      description: "",
    },
    validate: validationSchema,
    onSubmit: handleAddActivity,
  });

  const closeAndResetForm = () => {
    formik.resetForm();
    setVisible(false);
  };

  function handleAddActivity(values: any) {
    const result = {
      ...values,
      attendees: [user._id],
      placeId,
      hasBeenChecked: false,
    };
    closeAndResetForm();

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
      <p id="close-button" onClick={closeAndResetForm}>
        &#10006;
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>{t("map.form.date")}</label>
          <DateTimeInput name="date" handleFormikChange={formik.handleChange} />
        </div>
        <div>
          <SelectField
            name="level"
            label="Level"
            value={formik.values.level}
            onChange={formik.handleChange}
            options={ACTIVITY_LEVELS}
          />
          <SelectField
            name="activityType"
            label="Activity Type"
            value={formik.values.activityType}
            onChange={formik.handleChange}
            options={ACTIVITY_TYPES}
          />
        </div>
        <div>
          <TextField
            fullWidth
            variant="standard"
            name="title"
            label={t("map.form.title") || ""}
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && formik.errors.title ? true : false}
            helperText={formik.touched.title && formik.errors.title}
          />
        </div>
        <div>
          <TextField
            fullWidth
            name="description"
            label={t("map.form.description") || ""}
            multiline
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && formik.errors.description
                ? true
                : false
            }
            helperText={formik.touched.description && formik.errors.description}
            placeholder={t("map.form.descriptionPlaceholder") || ""}
            InputProps={{
              inputComponent: TextareaAutosize,
              inputProps: { minRows: 2, maxRows: 5 },
            }}
          />
        </div>
        <button type={"submit"} className={"login_button"}>
          {t("map.form.submit")}
        </button>
      </form>
    </div>
  ) : null;
}

export default ActivityForm;
