import express, { Request, Response, Router } from 'express';
import { authorizeMiddleware } from '../middlewares/middlewares';
import { addSurvey, finishSurvey, getSurveys } from '../services/surveyService';

const router: Router = express.Router({mergeParams: true});

router.get('/:id', authorizeMiddleware, async (req: Request, res: Response) => {
  const response: any = await getSurveys({ id: req.params.id });
  res.status(response.statusCode).json(response);
});

router.post('/', authorizeMiddleware, async (req: Request, res: Response) => {
    const response: any = await addSurvey(req.body.id);

    res.status(response.statusCode).json(response);
});

router.patch('/', authorizeMiddleware, async (req: Request, res: Response) => {
    const response: any = await finishSurvey({ id: req.body.id, ...req.body });

    res.status(response.statusCode).json(response);
});

export default router;
