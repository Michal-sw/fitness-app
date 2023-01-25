import { ObjectId, Schema, Types, model } from "mongoose";

export interface IActivity {
  _id: ObjectId;
  placeId: number;
  attendees: [Types.ObjectId];
  activityType: String;
  date: Date;
  hasBeenChecked: boolean;
}

const activitySchema = new Schema<IActivity>({
    placeId: {
      type: Number
    },
    attendees: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    activityType: {
      type: String
    },
    date: {
      type: Date
    },
    hasBeenChecked: {
      type: Boolean
    }
});

export default model('Activity', activitySchema);