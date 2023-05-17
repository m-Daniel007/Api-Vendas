import { Request, Response } from "express";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";

export default class ForgotPasswwordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPassword = new SendForgotPasswordEmailService();

    await sendForgotPassword.execute({ email });

    return res.status(204).json();
  }
}
