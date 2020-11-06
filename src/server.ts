import express from "express";
import "./database/connection";
import userController from "./controllers/userController";
import errorHandler from "./errors/handler";
import routes from "./routes";
import dotenv from "dotenv";
import "express-async-errors";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(process.env.APP_PORT);
