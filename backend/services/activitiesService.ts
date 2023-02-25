import { MongooseError, Types } from "mongoose";
import Activity, { IActivity } from "../config/models/Activity";
import { getCorrectObject, getErrorObject } from '../utils/utils';
import { addUserActivity } from "./userService";

export const getActivities = async () => {
    const result = await Activity
        .find()
        .populate('attendees', 'login')
        .then((activities: [IActivity] | any) => getCorrectObject(activities))
        .catch((err: MongooseError) => getErrorObject(500, err.message));

    return result;
}

export const addActivity = async ({ placeId, attendees, ...body }: {placeId: number, attendees: string[]}) => {
    if (!placeId) {
        return getErrorObject(400);
    }  

    const result = await Activity.create({
        placeId,
        attendees: attendees.map(userId => new Types.ObjectId(userId)),
        ...body
    })
    .then((activity: IActivity) => getCorrectObject(activity))
    .catch((err: MongooseError) => getErrorObject(400, err.message));

    if (result.statusCode !== 200) return result;

    // Add activity to users
    const activity: IActivity = result.result;

    for (let user of attendees) {
        const userResult = await addUserActivity(user, activity._id);
        if (userResult.statusCode !== 200) return getErrorObject(404, "Activity not added to user");
    }

    return getCorrectObject(result);

};

export const getActivityById = async (id: string) => {
    const activity = await Activity
        .findById(id)
        .populate('attendees', 'login');
    if (!activity) {
        return getErrorObject(404);
    }
    return getCorrectObject(activity);
};

export const getActivitiesByUser = async (userId: string) => {
    const id = new Types.ObjectId(userId);

    const activities = await Activity
        .find({ attendees: id })
        .populate('attendees', 'login');
    if (!activities) {
        return getErrorObject(404);
    }

    return getCorrectObject(activities);
};

export const replaceActivity = async ({ id, ...body }: {id:string}) => {
    const activity = await Activity.findOneAndReplace({ _id: new Types.ObjectId(id) }, body);
    
    return getCorrectObject(activity);
};

export const deleteActivity = async (id: string) => {
    await Activity.findOneAndDelete({ _id: new Types.ObjectId(id) })
        .then((activity: IActivity | null) => {
            return getCorrectObject(activity);
        }).catch((err: MongooseError) => {
            return getErrorObject(400, err.message);
        });
};

export const editActivity = async ({ id, ...body }: {id:string}) => {
    const activity = await Activity.findOneAndUpdate({ _id: new Types.ObjectId(id) }, body);
    return getCorrectObject(activity);
};

export const addUserToActivity = async (id: string, userId: string) => {
    const result = await Activity.findOneAndUpdate(
        { _id: new Types.ObjectId(id) }, 
        { $push: { attendees: new Types.ObjectId(userId) }}
    )
    .then((activity: IActivity | any) => getCorrectObject(activity))
    .catch((err: MongooseError) => getErrorObject(500, err.message));

    return result;
};
