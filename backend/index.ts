import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import users from './routes/users';

import { corsMiddleware, logger } from './middlewares/middlewares';

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

const tryConnecting = setInterval(
  async () => {
    await mongoose.connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`, {
  
    })
    .then(response => {
        console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
        const apiHost = process.env.API_HOST || '127.0.0.1';
        app.listen(port, () => {
            console.log(`API server available from: https://${apiHost}:${port}`);
        })
        clearInterval(tryConnecting);
    })
    .catch(error => console.error("[ERR] unable to connect, trying again in 5 seconds... " + error));
  }
, 5000);

