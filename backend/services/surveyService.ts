import { MongooseError } from "mongoose";
import Survey, { ISurvey } from "../config/models/Surveys";
import User from "../config/models/User";


const getCorrectObject = (result: any) => ({ result, statusCode: 200 })
const getErrorObject = (statusCode: number, message?: string) => ({ statusCode, result: message })

export const getSurveys = async ({ id }: { id: number }) => {
    const result = await Survey
        .find({ user: User.findById(id)})
        .then((surveys: [ISurvey] | any) => getCorrectObject(surveys))
        .catch((err: MongooseError) => getErrorObject(500, err.message));

    return result;
}

export const addSurvey = async ({ id }: { id: number }) => {

    const result = await Survey.create({
        user: User.findById(id),
        date: new Date(),
        waterScore: 0,
        sleepScore: 0,
        trainingScore: 0,
        hasBeenChecked: false
    })
    .then((survey: ISurvey) => getCorrectObject(survey))
    .catch((err: MongooseError) => getErrorObject(400, err.message));

    return result;
};

export const finishSurvey = async ({ id, ...body }: { id: string}) => {
    
    const survey = await Survey.findOneAndReplace({id}, { ...body, date: new Date(), hasBeenChecked: true });
    
    return getCorrectObject(survey);
}
