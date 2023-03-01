import express, { Express } from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';

import users from './routes/users';
import surveys from './routes/surveys';
import activities from './routes/activities';

import { corsMiddleware, logger } from './middlewares/middlewares';
import connectToMongoDB from './config/mongoClient';
import { createWebsocketServer } from './config/websocket';

dotenv.config();
const port = process.env.PORT || 8080;
const app: Express = express();

app.use(logger);
app.use(corsMiddleware);
app.use(express.json());
app.use('/users', users);
app.use('/surveys', surveys)
app.use('/activities', activities);

const server = createServer(app);
createWebsocketServer(server);

const runApp = async () => {
  await connectToMongoDB()
    .then((e) => {
      server.listen(port, () => {
        console.log(e);
        console.log(`App listening on ${port}`);
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

runApp();