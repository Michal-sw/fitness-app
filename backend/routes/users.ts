import express, { Request, Response, Router } from 'express';
import { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { authorizeMiddleware } from '../middlewares/middlewares';
import utils from '../utils/utils';
import { addUser, getUsers, isCredentialsValid } from '../services/userService';

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

router.post('/signin', async (req: Request, res: Response) => {
  const response = await addUser(req.body);

  if (response.statusCode !== 200) {
    return res.status(response.statusCode).send(response.result);
  }
    
  const { refreshToken, token } = getNewTokenPair(req.body.login);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict'
  });

  return res.send({ token, result: response.result });
})

router.post('/login', (req: Request, res: Response) => {
  const login = req.body.login;
  const password = req.body.password;
  // CHECK IF USER IS VALID
  
  const isValid = isCredentialsValid({login, password});
  console.log(`Password validated? - ${isValid}`);

  const { refreshToken, token } = getNewTokenPair(login);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict'
  });

  return res.send({ token });
})

router.post('/refresh', (req: Request, res: Response) => {
  const privateKey = utils.getPrivateKey();
  if (!req.headers.cookie) {
    return res.sendStatus(403);
  }
  const oldRefreshToken = utils.getCookie(req.headers.cookie, 'refreshToken');

  jwt.verify(oldRefreshToken, privateKey, (error: VerifyErrors, decodedPayload: JwtPayload) => {
    if (error) return res.sendStatus(403)
    const login = decodedPayload?.login;
    console.log(`USER MAKING REQUEST -> ${login}`);

    const { refreshToken, token } = getNewTokenPair(login);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    return res.send({ token });
  });
})

router.get('/test', (req: Request, res: Response) => {
  res.sendStatus(401);
});

export default router;
