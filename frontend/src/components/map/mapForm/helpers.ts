import { ActivityFormValues } from "../../../core/types/ActivityFormValues";

export const ACTIVITY_LEVELS = [
  { value: "novice", label: "Novice" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "elite", label: "Elite" },
];

export const ACTIVITY_TYPES = [
  { value: "running", label: "Running" },
  { value: "strength", label: "Strength" },
  { value: "conditioning", label: "Conditioning" },
  { value: "basketball", label: "Basketball" },
];

export function validationSchema(values: ActivityFormValues) {
  const errors: Partial<ActivityFormValues> = {};
  if (values.title.length < 3) errors.title = "Title must be at least 3 chars";
  if (values.title.length > 25) errors.title = "Title must be max 25 chars";
  if (values.description.length > 200)
    errors.description = "Description is too long";
  return errors;
}
