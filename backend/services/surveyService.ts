import { MongooseError } from "mongoose";
import Survey, { ISurvey } from "../config/models/Surveys";


const getCorrectObject = (result: any) => ({ result, statusCode: 200 })
const getErrorObject = (statusCode: number, message?: string) => ({ statusCode, result: message })

export const getSurveys = async ({ id }: { id: string }) => {
    const result = await Survey
        .find({ user: id })
        .then((surveys: [ISurvey] | any) => getCorrectObject(surveys))
        .catch((err: MongooseError) => getErrorObject(500, err.message));

    return result;
}

export const addSurvey = async (id: string) => {

    // Check if the user already got a survey today

    const surveys = await getSurveys({ id: id });
    const now = new Date();
    const todaySurveys = surveys.result.filter((x: any) => {
        const date = new Date(x.date)
        return (date.getFullYear() === now.getFullYear() &&
                date.getMonth() === now.getMonth() &&
                date.getDate() == now.getDate())
    })

    if (todaySurveys.length > 0) return { statusCode: 200, completed: true}

    const result = await Survey.create({
        user: id,
        date: new Date(),
        waterScore: 0,
        sleepScore: 0,
        trainingScore: 0,
        hasBeenChecked: false
    })
    .then((survey: ISurvey) => getCorrectObject({ ...survey, amount: surveys.result.length + 1 }))
    .catch((err: MongooseError) => getErrorObject(400, err.message));

    return result;
};

export const finishSurvey = async ({ id, ...body }: { id: string}) => {
    
    const survey = await Survey.findByIdAndUpdate(id, { ...body, date: new Date(), hasBeenChecked: true })
        .then((survey: any) => getCorrectObject(survey))
        .catch((err: MongooseError) => getErrorObject(400, err.message));
    return survey;
}
