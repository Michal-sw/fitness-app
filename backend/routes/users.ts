import express, { Request, Response, Router } from 'express';
import { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { authorizeMiddleware } from '../middlewares/middlewares';
import utils from '../utils/utils';
const jwt = require('jsonwebtoken');

const router: Router = express.Router({mergeParams: true});

const getNewTokenPair = (username: String) => {
  const privateKey = utils.getPrivateKey();

  // The tokens must be paired with the user in the database
  const refreshToken = jwt.sign({ username }, privateKey, {
    expiresIn: 60*15
  });
  const token = jwt.sign({ username }, privateKey, {
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
  const username = req.body.username;
  const password = req.body.password;
  // CHECK IF USER IS VALID
  
  const { refreshToken, token } = getNewTokenPair(username);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
  });

  return res.send({ token });
})

router.post('/refresh', (req: Request, res: Response) => {
  const privateKey = utils.getPrivateKey();
  if (!req.cookies) {
    return res.sendStatus(401);
  }
  const oldRefreshToken = req.cookies['refreshToken'];

  jwt.verify(oldRefreshToken, privateKey, (error: VerifyErrors, decodedPayload: JwtPayload) => {
    const username = decodedPayload.username;
    console.log(`USER MAKING REQUEST -> ${username}`);
    if (error) return res.sendStatus(403)

    const { refreshToken, token } = getNewTokenPair(username);

    res.cookie("refreshToken", refreshToken, {
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
