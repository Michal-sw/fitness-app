import TextareaAutosize from "@mui/base/TextareaAutosize";
import { FieldProps } from "formik";
import { FormEvent } from "react";

const DescriptionInput = ({ field, form }: FieldProps) => {
  function handleChange(e: FormEvent<HTMLTextAreaElement>) {
    const value = e.currentTarget.value;
    form.setFieldValue(field.name, value);
  }

  return (
    <TextareaAutosize
      onChange={handleChange}
      minRows={2}
      maxRows={5}
      placeholder="Add a description..."
    />
  );
};

export default DescriptionInput;
