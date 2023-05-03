import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors, VerifyOptions } from "jsonwebtoken";

import { getPrivateKey } from "../utils/utils";

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const origin = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL
    : "http://127.0.0.1:3000";
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,PATCH,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-HTTP-Method-Override, Authorization"
  );
  return next();
};

const authorizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.slice(7);
  const privateKey = getPrivateKey();
  if (!token) return res.sendStatus(401);

  jwt.verify(token, privateKey, ((error: VerifyErrors) => {
    if (error) return res.sendStatus(401);
    return next();
  }) as VerifyOptions);
};

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.info(req.headers);
  console.info(req.url);
  return next();
};

export { authorizeMiddleware, corsMiddleware, logger };
