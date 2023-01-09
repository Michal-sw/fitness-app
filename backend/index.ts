import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import users from './routes/users';

import { corsMiddleware, logger } from './middlewares/middlewares';
import connectToMongoDB from './config/mongoClient';

dotenv.config();
const port = process.env.PORT || 8080;
const app: Express = express();

app.use(logger);
app.use(corsMiddleware);
app.use(express.json());
app.use('/users', users);

const dbConnData = {
  host: process.env.MONGODB_HOST || '127.0.0.1',
  port: process.env.MONGODB_PORT || 27017,
  database: process.env.MONGODB_DATABASE || 'db'
};

const runApp = async () => {
  await connectToMongoDB()
    .then((e) => {
      app.listen(port, () => {
        console.log(e);
        console.log(`App listening on ${port}`);
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

runApp();