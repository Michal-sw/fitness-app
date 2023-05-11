import { FormEvent } from "react";

interface DateTimeInputProps {
  handleFormikChange: (e: any) => void;
  name: string;
}

const DateTimeInput = ({ handleFormikChange, name }: DateTimeInputProps) => {
  function handleChange(e: FormEvent<HTMLInputElement>) {
    const event = {
      ...e,
      currentTarget: {
        ...e.currentTarget,
        value: new Date(e.currentTarget.value),
      },
    };
    handleFormikChange(event);
  }

  return <input type={"datetime-local"} onChange={handleChange} name={name} />;
};

export default DateTimeInput;
