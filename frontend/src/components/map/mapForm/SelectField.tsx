import { MenuItem, Select } from "@mui/material";
import React from "react";

interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: any) => void;
  options: { value: string; label: string }[];
}

const SelectField = ({
  name,
  label,
  value,
  onChange,
  options,
}: SelectFieldProps) => {
  return (
    <Select
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      variant="standard"
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectField;
