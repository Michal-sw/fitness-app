import { Schema, Types, model } from "mongoose";

interface IActivity {
  placeID: string;
  attendees: [Types.ObjectId];
  activityType: Types.ObjectId;
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
      type: Schema.Types.ObjectId
    }
});

export default model('Activity', activitySchema);