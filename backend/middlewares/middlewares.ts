import { Request, Response, NextFunction } from 'express';
import { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import utils from '../utils/utils';
const jwt = require('jsonwebtoken');

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Credentials', "true");
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-HTTP-Method-Override");
  return next()
}

const authorizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader;
  const privateKey = utils.getPrivateKey();
  if (!token) return res.sendStatus(401);

  jwt.verify(token, privateKey, (error: VerifyErrors, decodedPayload: JwtPayload) => {
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

export { authorizeMiddleware, corsMiddleware, logger };