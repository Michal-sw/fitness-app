import { MongooseError } from "mongoose";
import Survey, { ISurvey } from "../config/models/Surveys";
import User from "../config/models/User";


const getCorrectObject = (result: any) => ({ result, statusCode: 200 })
const getErrorObject = (statusCode: number, message?: string) => ({ statusCode, result: message })

enum ScoreWeights {
    WATER = 7,
    SLEEP = 8,
    TRAINING = 9
}

const calculateScore = async (id: string) => {
    const survey = await Survey.findById(id);
    if (survey) {
        const user = await User.findById(survey.user);
        if (user) {
            let score = user.score || 100;
            
            score *= ((survey.waterScore + ScoreWeights.WATER) / 10)
            score *= ((survey.sleepScore + ScoreWeights.SLEEP) / 10)
            score *= ((survey.trainingScore + ScoreWeights.TRAINING) / 10)

            await user.updateOne({ score: Math.ceil(score).toFixed(2) })
            user.save
        }
    }
}

export const getSurveys = async ({ id }: { id: string }) => {
    const result = await Survey
        .find({ user: id })
        .then((surveys: [ISurvey] | any) => getCorrectObject(surveys))
        .catch((err: MongooseError) => getErrorObject(500, err.message));
    
    const user = await User.findById(id)

    if (user) {
        return { ...result, score: user.score || 100 }
    }

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


    // Check if the last survey was yesterday to keep the streak

    const lastDate = new Date(surveys.result[surveys.result.length - 1].date);

    // Date diff in hours
    const dateDiff = (now.getTime() - lastDate.getTime()) / (60 * 60 * 1000);

    if (dateDiff < 24) {
        await User.findOneAndUpdate({ _id: id }, { $inc: { surveyStreak: 1 }});
    } else await User.findOneAndUpdate({ _id: id }, { surveyStreak: 1 })

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

    // Get the current streak

    let currentStreak = 1;

    await User.findOne({ _id: id })
        .then((res: any) => currentStreak = res.surveyStreak)
        .catch((err: MongooseError) => getErrorObject(400, err.message));

    return { ...result, currentStreak: currentStreak };
};

export const finishSurvey = async ({ id, ...body }: { id: string}) => {
    
    const survey = await Survey.findByIdAndUpdate(id, { ...body, date: new Date(), hasBeenChecked: true })
        .then((survey: any) => getCorrectObject(survey))
        .catch((err: MongooseError) => getErrorObject(400, err.message));

    calculateScore(id);

    return survey;
}
