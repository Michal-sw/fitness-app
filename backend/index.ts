import { corsMiddleware, logger } from "./middlewares/middlewares";
import express, { Express } from "express";

import SwaggerUI from "swagger-ui-express";
import activities from "./routes/activities";
import connectToMongoDB from "./config/mongoClient";
import { createServer } from "https";
import { createWebsocketServer } from "./config/websocket";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import surveys from "./routes/surveys";
import { swaggerJs } from "./config/SwaggerOptions";
import users from "./routes/users";

dotenv.config();

const port = process.env.PORT || 8080;
const app: Express = express();

const sslOptions = {
  key: readFileSync(".cert/klucz_TLS_no_passphrase.key"),
  cert: readFileSync(".cert/tls_certificate.crt"),
};

app.use('/api', SwaggerUI.serve, SwaggerUI.setup(swaggerJs, { explorer: true }))

app.use(logger);
app.use(corsMiddleware);
app.use(express.json());
app.use("/users", users);
app.use("/surveys", surveys);
app.use("/activities", activities);

const server = createServer(sslOptions, app);
createWebsocketServer(server);

const runApp = async () => {
  await connectToMongoDB()
    .then((e) => {
      server.listen(port, () => {
        console.info(e);
        console.info(`App listening on ${port}`);
      });
    })
    .catch((e) => {
      console.error(e);
    });
};

runApp();
