import express, { Request, Response, Router } from 'express';
import { authorizeMiddleware } from '../middlewares/middlewares';
import { addActivity, editActivity, getActivities, getActivityById } from '../services/activitiesService';

const router: Router = express.Router({mergeParams: true});

router.get('/', authorizeMiddleware, async (req: Request, res: Response) => {
  const response: any = await getActivities();
  res.status(response.statusCode).json(response);
});

router.get('/:id', authorizeMiddleware, async (req: Request, res: Response) => {
    const response: any = await getActivityById(req.params.id);
    res.status(response.statusCode).json(response);
});

router.post('/', authorizeMiddleware, async (req: Request, res: Response) => {
    const response: any = await addActivity(req.body);

    res.status(response.statusCode).json(response);
});

router.patch('/', authorizeMiddleware, async (req: Request, res: Response) => {
    const response: any = await editActivity({ id: req.body._id, ...req.body });
    res.status(response.statusCode).json(response);
});

export default router;
