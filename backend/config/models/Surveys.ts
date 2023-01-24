import { Schema, model } from "mongoose";

interface ISurvey {
  date: Date;
  waterScore: number;
  sleepScore: number;
  trainingScore: number;
  hasBeenChecked: boolean;
}

const surveySchema = new Schema<ISurvey>({
    date: {
      type: Date
    },
    waterScore: {
        type: Number
    },
    sleepScore: {
        type: Number
    },
    trainingScore: {
        type: Number
    },
    hasBeenChecked: {
      type: Boolean
    }
});

export default model('Surveys', surveySchema);