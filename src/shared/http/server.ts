import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import ansi from "ansi-colors";
import routes from "./routes";
import { errors } from "celebrate";
import AppError from "@shared/errors/AppError";
import "@shared/typeorm";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    //console.error(error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

app.listen(5555, () => {
  console.log(
    ansi.underline.italic.bold.cyanBright("Servidor rodando na porta 5555 🚀")
  );
});
