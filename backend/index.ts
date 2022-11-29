import express, { Express } from 'express';
import dotenv from 'dotenv';

import users from './routes/users';

import postgresClient from "./config/postgresClient";
import { checkOriginMiddleware, logger } from './middlewares/middlewares';

dotenv.config();
const port = process.env.PORT || 8080;
const app: Express = express();

app.use(logger);
app.use(checkOriginMiddleware);
app.use(express.json());
app.use('/users', users);

app.listen(port, () => console.log("listening"));

// const tryConnecting = setInterval(
//   () => postgresClient.connect()
//     .then(() => {
//       console.log("Connected to PostgreSQL");
//       app.listen(port, () => {
//         console.log(`Express server listening on port ${port}!`);
//       });
//       clearInterval(tryConnecting);
//     })
//     .catch(() => {
//       console.log("[ERR] unable to connect, trying again in 5 seconds...")
//     })
//   , 5000);

