import { Schema, model, Types } from "mongoose";

export interface ISurvey {
  user: Types.ObjectId;
  date: Date;
  waterScore: number;
  sleepScore: number;
  trainingScore: number;
  hasBeenChecked: boolean;
}

const surveySchema = new Schema<ISurvey>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
  },
  waterScore: {
    type: Number,
  },
  sleepScore: {
    type: Number,
  },
  trainingScore: {
    type: Number,
  },
  hasBeenChecked: {
    type: Boolean,
  },
});

export default model("Surveys", surveySchema);
