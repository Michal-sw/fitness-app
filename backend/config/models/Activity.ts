import { ObjectId, Schema, Types, model } from "mongoose";

export interface IActivity {
  _id: ObjectId;
  placeId: number;
  title: string;
  description: string;
  level: string;
  attendees: [Types.ObjectId];
  activityType: string;
  date: Date;
  hasBeenChecked: boolean;
}

const activitySchema = new Schema<IActivity>({
  placeId: {
    type: Number,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  level: {
    type: String,
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  activityType: {
    type: String,
  },
  date: {
    type: Date,
  },
  hasBeenChecked: {
    type: Boolean,
  },
});

export default model("Activity", activitySchema);
