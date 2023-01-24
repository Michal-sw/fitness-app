import express, { Request, Response, Router } from 'express';
import { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { authorizeMiddleware } from '../middlewares/middlewares';
import utils from '../utils/utils';
import { addUser, getUsers, getUserIfCredentialValid, getUserByLogin } from '../services/userService';
import { IUser } from '../config/models/User';
import { addSurvey, finishSurvey, getSurveys } from '../services/surveyService';

const router: Router = express.Router({mergeParams: true});

router.get('/', authorizeMiddleware, async (req: Request, res: Response) => {
  const response: any = await getSurveys(req.body.id);
  res.status(response.statusCode).json(response);
});

router.post('/', authorizeMiddleware, async (req: Request, res: Response) => {
    const response: any = await addSurvey(req.body.id);

    res.status(response.statusCode).json(response);
});

router.patch('/:id', authorizeMiddleware, async (req: Request, res: Response) => {
    const response: any = await finishSurvey({ id: req.params.id, ...req.body });

    res.status(response.statusCode).json(response);
});

export default router;
