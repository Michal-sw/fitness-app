import express, { Request, Response, Router } from 'express';
import { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { authorizeMiddleware } from '../middlewares/middlewares';
import { getCookie, getPrivateKey, getNewTokenPair } from '../utils/utils';
import { addUser, getUsers, getUserIfCredentialValid, getUserByLogin, markActivityAsSkipped, addUserActivity, markActivityAsPerformed } from '../services/userService';
import { IUser } from '../config/models/User';
import { addUserToActivity, getActivitiesByUser } from '../services/activitiesService';

const jwt = require('jsonwebtoken');

const router: Router = express.Router({mergeParams: true});

router.get('/', authorizeMiddleware, async (req: Request, res: Response) => {
  const response: any = await getUsers();
  res.status(response.statusCode).json(response);
});

router.post('/login', async (req: Request, res: Response) => {
  const login = req.body.login;
  const password = req.body.password;

  const user: IUser | null = await getUserIfCredentialValid({login, password});

  if (!user) return res.sendStatus(401);

  const { refreshToken, token } = getNewTokenPair(login);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict'
  });

  return res.send({ token, user });
})

router.post('/signin', async (req: Request, res: Response) => {
  const login = req.body.login;
  const password = req.body.password;

  const response = await addUser({ login, password });
  
  if (response.statusCode !== 200) {
    return res.status(response.statusCode).send(response.result);
  }

  const { refreshToken, token } = getNewTokenPair(login);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict'
  });

  const user: IUser = response.result;

  return res.send({ token, user });
})

router.get('/logout', (req: Request, res: Response) => {
  res.cookie('refreshToken', "", {
    httpOnly: true,
    sameSite: 'strict'
  });

  return res.send();
})

router.post('/refresh', (req: Request, res: Response) => {
  const privateKey = getPrivateKey();
  if (!req.headers.cookie) {
    return res.sendStatus(403);
  }
  const oldRefreshToken = getCookie(req.headers.cookie, 'refreshToken');

  jwt.verify(oldRefreshToken, privateKey, async (error: VerifyErrors, decodedPayload: JwtPayload) => {
    if (error) return res.sendStatus(403)
    const login = decodedPayload?.login;

    const { refreshToken, token } = getNewTokenPair(login);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    const response = await getUserByLogin(login);
    const user: IUser = response.result;

    return res.send({ token, user });
  });
})

router.get('/:id/activities', async (req: Request, res: Response) => {
  const response = await getActivitiesByUser(req.params.id);
  
  return res.status(response.statusCode).send(response);
});

router.patch('/:id/activities', async (req: Request, res: Response) => {
  const activityId = req.body.activityId;
  const skipped = req.body.skipped;

  const response = skipped 
    ? await markActivityAsSkipped(req.params.id, activityId)
    : await markActivityAsPerformed(req.params.id);

  return res.status(response.statusCode).send(response);
});

router.post('/:id/activities', async (req: Request, res: Response) => {
  const activityId = req.body.activityId;
  
  const response = await addUserActivity(req.params.id, activityId);
  const activityResponse = await addUserToActivity(activityId, req.params.id);

  if (activityResponse.statusCode !== 200) {
    return res.status(activityResponse.statusCode).send(activityResponse);
  }

  return res.status(response.statusCode).send(response);
});

export default router;
