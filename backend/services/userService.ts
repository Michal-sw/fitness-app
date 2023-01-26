import { MongooseError, ObjectId, Types } from "mongoose";
import User, { IUser } from "../config/models/User";
import { LoginDT } from "../types/LoginDT";
import { getCorrectObject, getErrorObject, calculateScore, ScoreType } from '../utils/utils';

export const getUsers = async () => {
    const result = await User
        .find()
        .then((users: [IUser] | any) => getCorrectObject(users))
        .catch((err: MongooseError) => getErrorObject(500, err.message));

    return result;
}

export const getUserIfCredentialValid = async ({ login, password }: LoginDT) => {
    const user: IUser | null = await User
        .findOne({ login })

    return (user && user.password === password) ? user : null;
}

export const addUser = async ({ login, password }: LoginDT) => {
    if (!login || !password) {
        return getErrorObject(400);
    }

    const result = await User.create({
        login,
        password,
        registrationDate: new Date(),
        score: 100
    })
    .then((user: IUser) => getCorrectObject(user))
    .catch((err: MongooseError) => getErrorObject(400, err.message));

    return result;
};

export const addUserActivity = async (id: string, activityId: ObjectId) => {
    const result = await User.findOneAndUpdate(
        { _id: new Types.ObjectId(id) }, 
        { $push: { 
            activities: {
                    'activity': activityId,
                    'skipped': false
                }
            }
        }
    )
    .then((user: IUser | any) => getCorrectObject(user))
    .catch((err: MongooseError) => getErrorObject(500, err.message));

    return result;
};

export const markActivityAsSkipped = async (id: string, activityId: string) => {
    const result = await User.findOneAndUpdate(
        { _id: new Types.ObjectId(id), "activities.activity": new Types.ObjectId(activityId) },
        { 
            $set: {
                "activities.$.skipped": true
            }
        }, { multi: true }
    )
    .then((user: IUser | any) => getCorrectObject(user))
    .catch((err: MongooseError) => getErrorObject(500, err.message));

    calculateScore(ScoreType.ACTIVITY, undefined, id, false);

    return result;
}

export const markActivityAsPerformed = async (id: string) => {
    calculateScore(ScoreType.ACTIVITY, undefined, id, true);

    return getCorrectObject({});
}

export const getUserById = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
        return getErrorObject(404);
    }
    return getCorrectObject(user);
};

export const getUserByLogin = async (login: string) => {
    const user = await User.find({ login });
    if (!user) {
        return getErrorObject(404);
    }
    return getCorrectObject(user[0]);
};

export const replaceUser = async ({ id, ...body }: {id:string}) => {
    const user = await User.findOneAndReplace({ _id: new Types.ObjectId(id) }, body);
    
    return getCorrectObject(user);
};

export const deleteUser = async (id: string) => {
    await User.findOneAndDelete({ _id: new Types.ObjectId(id) })
        .then((user: IUser | null) => {
            return getCorrectObject(user);
        }).catch((err: MongooseError) => {
            return getErrorObject(400, err.message);
        });
};

export const editUser = async ({ id, ...body }: {id:string}) => {
    const user = await User.findOneAndUpdate({ _id: new Types.ObjectId(id) }, body);
    
    return getCorrectObject(user);
};

const mockUsers = [
    {login: "Mike", email: "mike@mike.com", registrationDate: new Date()},
    {login: "Amy", email: "Amy@mike.com", registrationDate: new Date()},
];
