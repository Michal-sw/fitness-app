import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError, Jwt, JwtPayload, VerifyCallback, VerifyErrors } from 'jsonwebtoken';
import utils from '../utils/utils';
const jwt = require('jsonwebtoken');

const checkOriginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  return next()
}

const authorizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader;
  const publicKey = utils.getPublicKey();
  if (!token) return res.sendStatus(401);

  jwt.verify(token, publicKey, (error: VerifyErrors, decodedPayload: JwtPayload) => {
    // JWT during issuing is signed with the username of token asker
    const username = decodedPayload.username;
    console.log(`USER MAKING REQUEST -> ${username}`);
    if (error) return res.sendStatus(403)
    return next()
  })
}

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers);
  console.log(req.url);
  return next()
}

export { authorizeMiddleware, checkOriginMiddleware, logger };