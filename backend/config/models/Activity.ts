import { Schema, Types, model } from "mongoose";

interface IActivity {
  placeID: string;
  attendees: [Types.ObjectId];
  activityType: String;
  date: Date;
  hasBeenChecked: boolean;
}

const activitySchema = new Schema<IActivity>({
    placeID: {
      type: String
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