import nodemailer from "nodemailer";
import HandlebarsMailTemplete from "./HandlebarsMailTemplete";

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new HandlebarsMailTemplete();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },

      tls: {
        rejectUnauthorized: false,
      }
    });

    transporter
      .sendMail({
        from: {
          name: from?.name || "Equipe API",
          address: from?.email || "equipe@apivendas.com",
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await mailTemplate.parse(templateData),
      })
      .then((message) => {
        console.log("Message sent: " + message.messageId);
        console.log("Preview URL: " + nodemailer.getTestMessageUrl(message));
      });
  }
}
