import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { handleNotFound, handleError, verifyJWT } from "./middlewares.js";
import apiV1 from "./api/v1/apiRouter.js";
import auth from "./auth/auth.routes.js";

const server = express();

const PORT = process.env.PORT;

server.use(morgan("dev"));
server.use(helmet());
server.use(cors());
server.use(express.urlencoded({extended: true}));
server.use(express.json());
server.use(cookieParser());

// here goes accesToken verify Middleware

server.use("/", auth);

server.use(verifyJWT);
server.use("/api/v1", apiV1);

server.use(handleNotFound);
server.use(handleError);

server.listen(PORT, () => {
  console.log("Server up and ready on port 3000");
});
