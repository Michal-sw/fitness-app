import {
  addActivity,
  editActivity,
  getActivities,
  getActivityById,
} from "../services/activitiesService";
import express, { Request, Response, Router } from "express";

import { authorizeMiddleware } from "../middlewares/middlewares";

const router: Router = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *  name: activities
 * /activities:
 *   get:
 *     summary: Get all activities
 *     tags: [activities]
 *     responses:
 *      200:
 *        description: All activities 
 *   post:
 *     summary: Create an activity
 *     tags: [activities]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - placeId
 *              - attendees
 *            properties:
 *              placeId:
 *                type: string
 *              attendees:
 *                type: array
 *                items:
 *                  type: string
 *     responses:
 *      200:
 *        description: Activity created
 *   patch:
 *     summary: Edit activity
 *     tags: [activities]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - id
 *              - placeId
 *              - title
 *              - description
 *              - level
 *              - attendees
 *              - activityType
 *              - date
 *              - hasBeenChecked
 *            properties:
 *              id:
 *                type: string
 *              placeId:
 *                type: string
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              level:
 *                type: string
 *              attendees:
 *                type: string
 *              activityType:
 *                type: array
 *                items:
 *                  type: string
 *              date:
 *                type: string
 *              hasBeenChecked:
 *                type: boolean
 *     responses:
 *      200:
 *        description: Edit activity
 * /activities/{id}:
 *   get:
 *     summary: Get activity by id
 *     tags: [activities]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Id of the activity
 *     responses:
 *      200:
 *        description: Activity of a given id
 */
router.get("/", authorizeMiddleware, async (req: Request, res: Response) => {
  const response: any = await getActivities();
  res.status(response.statusCode).json(response);
});

router.get("/:id", authorizeMiddleware, async (req: Request, res: Response) => {
  const response: any = await getActivityById(req.params.id);
  res.status(response.statusCode).json(response);
});

router.post("/", authorizeMiddleware, async (req: Request, res: Response) => {
  const response: any = await addActivity(req.body);

  res.status(response.statusCode).json(response);
});

router.patch("/", authorizeMiddleware, async (req: Request, res: Response) => {
  const response: any = await editActivity({ id: req.body._id, ...req.body });
  res.status(response.statusCode).json(response);
});

export default router;
