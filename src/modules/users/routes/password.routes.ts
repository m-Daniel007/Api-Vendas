import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ForgotPasswwordController from "../controllers/ForgotPawwordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswwordController();


passwordRouter
  .post(
    "/forgot",
    celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
      },
    }),
  forgotPasswordController.create
  )


export default passwordRouter;
