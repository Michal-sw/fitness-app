import { MongooseError, Types } from "mongoose";
import Survey, { ISurvey } from "../config/models/Surveys";
import User from "../config/models/User";
import {
  calculateScore,
  getCorrectObject,
  getErrorObject,
  ScoreType,
} from "../utils/utils";

export const getSurveys = async ({ id }: { id: string }) => {
  const result = await Survey.find({ user: id })
    .then((surveys: [ISurvey] | any) => getCorrectObject(surveys))
    .catch((err: MongooseError) => getErrorObject(500, err.message));

  const user = await User.findById(id);

  if (user) {
    return { ...result, score: user.score || 100 };
  }

  return result;
};

export const addSurvey = async (id: string) => {
  // Check if the user already got a survey today

  const surveys = await getSurveys({ id: id });
  const now = new Date();
  const todaySurveys = surveys.result.filter((x: any) => {
    const date = new Date(x.date);
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() == now.getDate()
    );
  });
  if (todaySurveys.length > 0) {
    if (todaySurveys[0].hasBeenChecked)
      return { statusCode: 200, completed: true };
    else return { statusCode: 200, completed: false, survey: todaySurveys[0] };
  }

  // Check if the last survey was yesterday to keep the streak

  const lastDate = surveys.result.length
    ? new Date(surveys.result[surveys.result.length - 1].date)
    : new Date("2000-12-17T03:24:00");

  // Date diff in hours
  const dateDiff = (now.getTime() - lastDate.getTime()) / (60 * 60 * 1000);

  if (dateDiff < 24) {
    await User.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { $inc: { surveyStreak: 1 } }
    );
  } else
    await User.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { surveyStreak: 1 }
    );

  const result = await Survey.create({
    user: id,
    date: new Date(),
    waterScore: 0,
    sleepScore: 0,
    trainingScore: 0,
    hasBeenChecked: false,
  })
    .then((survey: ISurvey) =>
      getCorrectObject({ ...survey, amount: surveys.result.length + 1 })
    )
    .catch((err: MongooseError) => getErrorObject(400, err.message));

  // Get the current streak

  let currentStreak = 1;

  await User.findOne({ _id: new Types.ObjectId(id) })
    .then((res: any) => (currentStreak = res.surveyStreak))
    .catch((err: MongooseError) => getErrorObject(400, err.message));

  return { ...result, currentStreak: currentStreak };
};

export const finishSurvey = async ({ id, ...body }: { id: string }) => {
  const survey = await Survey.findByIdAndUpdate(
    { _id: new Types.ObjectId(id) },
    { ...body, date: new Date(), hasBeenChecked: true }
  )
    .then((survey: any) => getCorrectObject(survey))
    .catch((err: MongooseError) => getErrorObject(400, err.message));

  calculateScore(ScoreType.SURVEY, id);

  return survey;
};
