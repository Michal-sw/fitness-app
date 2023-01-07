import express, { Request, Response, Router } from 'express';
import { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { authorizeMiddleware } from '../middlewares/middlewares';
import utils from '../utils/utils';

const jwt = require('jsonwebtoken');

const router: Router = express.Router({mergeParams: true});

const getNewTokenPair = (login: String) => {
  const privateKey = utils.getPrivateKey();

  // The tokens must be paired with the user in the database
  const refreshToken = jwt.sign({ login }, privateKey, {
    expiresIn: 60*15
  });
  const token = jwt.sign({ login }, privateKey, {
    expiresIn: 60*15
  });

  return {
    refreshToken,
    token
  }
};

router.get('/', authorizeMiddleware,(req: Request, res: Response) => {
  res.sendStatus(200);
});

router.post('/login', (req: Request, res: Response) => {
  const login = req.body.login;
  const password = req.body.password;
  // CHECK IF USER IS VALID
  
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
    return res.sendStatus(401);
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
