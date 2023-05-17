import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ForgotPasswwordController from "../controllers/ForgotPawwordController";
import ResetPasswwordController from "../controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswwordController();
const resetPasswordController = new ResetPasswwordController();

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create
)
.post(
  "/reset",
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref("password")),
    },
  }),
  resetPasswordController.create
);

export default passwordRouter;
