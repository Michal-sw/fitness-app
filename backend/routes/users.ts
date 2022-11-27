import express, { Request, Response, Router } from 'express';

const router: Router = express.Router({mergeParams: true});

router.get('/', (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default router;
