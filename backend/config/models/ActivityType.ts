import { Schema, Types, model } from "mongoose";

interface IActivityType {
  name: string;
}

const activityTypeSchema = new Schema<IActivityType>({
    name: {
        type: String
    }
});

export default model('ActivityType', activityTypeSchema);