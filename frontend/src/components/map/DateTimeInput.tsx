import { FieldProps } from "formik";
import { FormEvent } from 'react';

const DateTimeInput = ({ field, form }: FieldProps) => {

    function handleChange(e: FormEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        const asDate = new Date(value);

        form.setFieldValue(field.name, asDate)
    }

    return (
        <input 
            type={'datetime-local'}
            onChange={handleChange}
        />
    )
}

export default DateTimeInput;