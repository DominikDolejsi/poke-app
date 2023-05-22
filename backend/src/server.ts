import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import { notFoundHandler, errorHandler } from "./middlewares.js";
import apiV1 from "./api/v1/apiRouter.js";

dotenv.config();

const server = express();

const PORT = process.env.PORT;

server.use(morgan("dev"));
server.use(helmet());
server.use(express.json());

server.use("/api/v1", apiV1);

server.use(notFoundHandler);
server.use(errorHandler);

server.listen(PORT, () => {
  console.log("Server up and ready on port 3000");
});
