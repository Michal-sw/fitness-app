import express, { Request, Response, Router } from 'express';
import { authorizeMiddleware } from '../middlewares/middlewares';
import utils from '../utils/utils';
const jwt = require('jsonwebtoken');

const router: Router = express.Router({mergeParams: true});

router.get('/', authorizeMiddleware,(req: Request, res: Response) => {
  res.sendStatus(200);
});

router.post('/auth', (req: Request, res: Response) => {
  const publicKey = utils.getPublicKey();
  const username = req.body.username;
  const password = req.body.password;
  // CHECK IF USER IS AN ADMIN

  const token = jwt.sign({ username }, publicKey);
  console.log(token);
  return res.send({ token })
})

export default router;
