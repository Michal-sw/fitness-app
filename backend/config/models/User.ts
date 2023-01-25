import { Date, ObjectId, Schema, Types, model } from "mongoose";

export interface IUser {
  _id: ObjectId;
  firstName?: string;
  lastName?: string;
  password: string;
  login: string;
  email?: string;
  refreshToken?: string;
  activities: UserActivity[];
  registrationDate: Date;
  score: number;
  surveyStreak: number;
  workoutStreak: number;
}

interface UserActivity {
  activity:Types.ObjectId,
  skipped: boolean
}

const userSchema = new Schema<IUser>({
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      match: [/[\w.]*[@][\w]*[.][\w]*/, 'Please put in a correct email address']
    },
    activities: [
      new Schema({
        activity: {
          type: Schema.Types.ObjectId,
          ref: "Activity"
        },
        skipped: {
          type: Boolean
        }
      }, {_id: false})
    ],
    registrationDate: {
      type: Date
    },
    score: {
      type: Number
    },
    surveyStreak: {
      type: Number
    },
    workoutStreak: {
      type: Number
    }
});

export default model('User', userSchema);