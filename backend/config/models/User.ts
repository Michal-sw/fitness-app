import { Date, ObjectId, Schema, Types, model } from "mongoose";

export interface IUser {
  _id: ObjectId;
  firstName?: string;
  lastName?: string;
  password: string;
  login: string;
  email?: string;
  refreshToken?: string;
  activities: [Types.ObjectId];
  registrationDate: Date;
  surveyStreak: number
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
    activities: [{
      type: Schema.Types.ObjectId,
      ref: "Activity"
    }],
    registrationDate: {
      type: Date
    },
    surveyStreak: {
      type: Number
    }
});

export default model('User', userSchema);