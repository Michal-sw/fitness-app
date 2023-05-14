import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyCallback } from "jsonwebtoken";

import { getPrivateKey } from "../utils/utils";
import { getUserById } from "../services/userService";

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

  jwt.verify(token, privateKey, (async (error, payload: JwtPayload) => {
    if (error) return res.sendStatus(401);
    const user = await getUserById(payload?.id);
    if (user.statusCode !== 200) return res.sendStatus(400);
    req.user = user.result;
    return next();
  }) as VerifyCallback);
};

const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) return res.sendStatus(400);
  if (!req.user.isAdmin && req.user._id.toString() !== req.params.id) {
    return res.sendStatus(403);
  } 
  return next();
};

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.info(req.headers);
  console.info(req.url);
  return next();
};

export { authorizeMiddleware, authenticateMiddleware, corsMiddleware, logger };
