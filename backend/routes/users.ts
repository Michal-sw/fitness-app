import {
  addUser,
  addUserActivity,
  deleteUser,
  editUser,
  getUserById,
  getUserIfCredentialValid,
  getUsers,
  markActivityAsPerformed,
  markActivityAsSkipped,
} from "../services/userService";
import {
  addUserToActivity,
  getActivitiesByUser,
} from "../services/activitiesService";
import express, { Request, Response, Router } from "express";
import { getCookie, getNewTokenPair, getPrivateKey } from "../utils/utils";
import jwt, { JwtPayload, VerifyErrors, VerifyOptions } from "jsonwebtoken";

import { IUser } from "../config/models/User";
import { authenticateMiddleware, authorizeMiddleware } from "../middlewares/middlewares";

const router: Router = express.Router({ mergeParams: true });

router.get("/", authorizeMiddleware, async (req: Request, res: Response) => {
  const response: any = await getUsers();
  res.status(response.statusCode).json(response);
});

router.get("/:id", authorizeMiddleware, async (req: Request, res: Response) => {
  const response: any = await getUserById(req.params.id);
  res.status(response.statusCode).json(response);
});

router.post("/login", async (req: Request, res: Response) => {
  const login = req.body.login;
  const password = req.body.password;

  const user: IUser | null = await getUserIfCredentialValid({
    login,
    password,
  });

  if (!user) return res.sendStatus(401);

  const { refreshToken, token } = getNewTokenPair(user._id);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
  });

  return res.send({ token, user });
});

router.post("/signin", async (req: Request, res: Response) => {
  const login = req.body.login;
  const password = req.body.password;

  const response = await addUser({ login, password });

  if (response.statusCode !== 200) {
    return res.status(response.statusCode).send(response.result);
  }

  const user: IUser = response.result;
  const { refreshToken, token } = getNewTokenPair(user._id);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
  });


  return res.send({ token, user });
});

router.get("/logout", (req: Request, res: Response) => {
  res.cookie("refreshToken", "", {
    httpOnly: true,
    sameSite: "strict",
  });

  return res.send();
});

router.post("/refresh", (req: Request, res: Response) => {
  const privateKey = getPrivateKey();
  if (!req.headers.cookie) {
    return res.sendStatus(403);
  }
  const oldRefreshToken = getCookie(req.headers.cookie, "refreshToken");

  jwt.verify(oldRefreshToken, privateKey, (async (
    error: VerifyErrors,
    payload: JwtPayload
  ) => {
    if (error) return res.sendStatus(403);
    const userId = payload?.id;

    const { refreshToken, token } = getNewTokenPair(userId);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });

    const response = await getUserById(userId);
    const user: IUser = response.result;

    return res.send({ token, user });
  }) as VerifyOptions);
});

router.patch("/:id", authorizeMiddleware, authenticateMiddleware, async (req: Request, res: Response) => {
  const response = await editUser({
    id: req.params.id,
    ...req.body,
  });

  return res.status(response.statusCode).send(response);
});

router.delete("/:id", authorizeMiddleware, authenticateMiddleware, async (req: Request, res: Response) => {
  const response = await deleteUser({
    id: req.params.id,
    ...req.body,
  });

  return res.status(response.statusCode).send(response);
});

router.get("/:id/activities", authorizeMiddleware, authenticateMiddleware, async (req: Request, res: Response) => {
  const response = await getActivitiesByUser(req.params.id);

  return res.status(response.statusCode).send(response);
});

router.patch("/:id/activities", authorizeMiddleware, authenticateMiddleware, async (req: Request, res: Response) => {
  const activityId = req.body.activityId;
  const skipped = req.body.skipped;

  const response = skipped
    ? await markActivityAsSkipped(req.params.id, activityId)
    : await markActivityAsPerformed(req.params.id);

  return res.status(response.statusCode).send(response);
});

router.post("/:id/activities", authorizeMiddleware, async (req: Request, res: Response) => {
  const activityId = req.body.activityId;

  const response = await addUserActivity(req.params.id, activityId);
  const activityResponse = await addUserToActivity(activityId, req.params.id);

  if (activityResponse.statusCode !== 200) {
    return res.status(activityResponse.statusCode).send(activityResponse);
  }

  return res.status(response.statusCode).send(response);
});

export default router;
