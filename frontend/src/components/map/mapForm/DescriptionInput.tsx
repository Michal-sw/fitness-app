import TextareaAutosize from "@mui/base/TextareaAutosize";
import { FieldProps } from "formik";
import { FormEvent } from "react";
import { useTranslation } from "react-i18next";

const DescriptionInput = ({ field, form }: FieldProps) => {
  const { t } = useTranslation();

  function handleChange(e: FormEvent<HTMLTextAreaElement>) {
    const value = e.currentTarget.value;
    form.setFieldValue(field.name, value);
  }

  return (
    <TextareaAutosize
      onChange={handleChange}
      minRows={2}
      maxRows={5}
      placeholder={t("map.form.description") || ""}
    />
  );
};

export default DescriptionInput;
