import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import ansi from "ansi-colors";
import routes from "./routes";
import AppError from "@shared/errors/AppError";
import "@shared/typeorm";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(5555, () => {
  console.log(
    ansi.underline.italic.bold.cyanBright("Servidor rodando na porta 5555 🚀")
  );
});
