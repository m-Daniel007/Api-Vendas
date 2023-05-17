import handlebars from "handlebars";
import fs from "fs";

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

export default class HandlebarsMailTemplete {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const fileTemplateContent = await fs.promises.readFile(file, {
      encoding: "utf8",
    });
    const parseTemplate = handlebars.compile(fileTemplateContent);

    return parseTemplate(variables);
  }
}
