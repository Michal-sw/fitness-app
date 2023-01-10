import { Date, Schema, Types, model } from "mongoose";

export interface IUser {
  firstName?: string;
  lastName?: string;
  password: string;
  login: string;
  email?: string;
  refreshToken?: string;
  activities: [Types.ObjectId];
  registrationDate: Date;
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
      required: true
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
    }
});

export default model('User', userSchema);