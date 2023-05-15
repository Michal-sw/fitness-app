import { addSurvey, finishSurvey, getSurveys } from "../services/surveyService";
import express, { Request, Response, Router } from "express";

import { authorizeMiddleware } from "../middlewares/middlewares";

const router: Router = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *  name: surveys
 * /surveys/{id}:
 *   get:
 *     summary: Get survey by id
 *     tags: [surveys]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Id of the survey
 *     responses:
 *      200:
 *        description: Survey of a given id
 * /surveys:
 *   post:
 *     summary: Create an survey
 *     tags: [surveys]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: string
 *     responses:
 *      200:
 *        description: survey created
 *   patch:
 *     summary: Edit survey
 *     tags: [surveys]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - id
 *              - date
 *              - waterScore
 *              - sleepScore
 *              - trainingScore
 *              - hasBeenChecked
 *            properties:
 *              id:
 *                type: string
 *              date:
 *                type: string
 *              waterScore:
 *                type: number
 *              sleepScore:
 *                type: number
 *              trainingScore:
 *                type: number
 *              hasBeenChecked:
 *                type: boolean
 *     responses:
 *      200:
 *        description: Edit survey
 */

router.get("/:id", authorizeMiddleware, async (req: Request, res: Response) => {
  const response: any = await getSurveys({ id: req.params.id });
  res.status(response.statusCode).json(response);
});

router.post("/", authorizeMiddleware, async (req: Request, res: Response) => {
  const response: any = await addSurvey(req.body.id);

  res.status(response.statusCode).json(response);
});

router.patch("/", authorizeMiddleware, async (req: Request, res: Response) => {
  const response: any = await finishSurvey({ id: req.body.id, ...req.body });

  res.status(response.statusCode).json(response);
});

export default router;
