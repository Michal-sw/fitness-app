import Survey from "../config/models/Surveys";
import User from "../config/models/User";

const fs = require('fs');
const jwt = require('jsonwebtoken');


export const getPublicKey = (): string => {
  try {
    const publicKey = fs.readFileSync('public.pem');
    return publicKey;
  } catch {
    return "MOCK_SECRET"
  }
};

export const getPrivateKey = (): string => {
  try {
    const privateKey = fs.readFileSync('private.pem');
    return privateKey;
  } catch {
    return "MOCK_SECRET"
  }
};

export const getNewTokenPair = (login: String) => {
  const privateKey = getPrivateKey();

  // The tokens must be paired with the user in the database
  // 15 minute expire
  const refreshToken = jwt.sign({ login }, privateKey, {
    expiresIn: 60*15
  });
  // 5 minutes expire
  const token = jwt.sign({ login }, privateKey, {
    expiresIn: 60*5
  });

  return {
    refreshToken,
    token
  }
};

export const getCookie = (cookies: String, key: string): string => {
  const cookiesSplitted = cookies.split("; ");
  const targetCookie = cookiesSplitted.find(cookie => cookie.startsWith(key));
  
  return targetCookie?.slice(key.length + 1) || "";
};

export const getCorrectObject = (result: any) => ({ result, statusCode: 200 });
export const getErrorObject = (statusCode: number, message?: string) => ({ statusCode, result: message });

export enum ScoreWeights {
  WATER = 6,
  SLEEP = 7,
  TRAINING = 9,
  ACTIVITY = 6
}

export enum ScoreType {
  SURVEY,
  ACTIVITY
}

export const calculateScore = async (type: ScoreType, id?: string, userId?: string, completed: boolean = false) => {
  if (type === ScoreType.SURVEY && id) {
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
  } else if (type === ScoreType.ACTIVITY && userId) {
    const user = await User.findById(userId);
    if (user) {
      let score = user.score || 100;
            
      score *= completed ? ((ScoreWeights.ACTIVITY) / 10) + 1 : ScoreWeights.ACTIVITY / 10

      await user.updateOne({ score: Math.ceil(score).toFixed(2) })
      user.save
    }
  }
}
export default { getPublicKey, getPrivateKey, getCookie, getCorrectObject, getErrorObject, getNewTokenPair };