import express, { Request, Response, Router } from 'express';
import { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { authorizeMiddleware } from '../middlewares/middlewares';
import utils from '../utils/utils';
import { addUser, getUsers, getUserIfCredentialValid, getUserByLogin } from '../services/userService';
import { IUser } from '../config/models/User';

const jwt = require('jsonwebtoken');

const router: Router = express.Router({mergeParams: true});

const getNewTokenPair = (login: String) => {
  const privateKey = utils.getPrivateKey();

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
  const privateKey = utils.getPrivateKey();
  if (!req.headers.cookie) {
    return res.sendStatus(403);
  }
  const oldRefreshToken = utils.getCookie(req.headers.cookie, 'refreshToken');

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

router.get('/test', (req: Request, res: Response) => {
  res.sendStatus(401);
});

export default router;
