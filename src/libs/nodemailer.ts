"use server";

import { getConfigs } from "@helpers/getConfigs";
import { getEnvironmentVariable } from "@helpers/getEnvironmentVariable";
import { NodemailerResponse, SendEmailWithNodemailer } from "@typescript/libs/nodemailer";
import { GeneralResponse } from "@typescript/others";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: getEnvironmentVariable("SMTP_HOST"),
  port: getEnvironmentVariable("SMTP_PORT"),
  secure: false,
  auth: {
    user: getEnvironmentVariable("BREVO_SMTP_USERNAME"),
    pass: getEnvironmentVariable("BREVO_SMTP_PASSWORD")
  }
});

export const sendMail = async ({
  to,
  subject,
  body
}: SendEmailWithNodemailer): Promise<GeneralResponse<NodemailerResponse, any>> => {
  try {
    const response = await transporter.sendMail({
      from: getConfigs("application").mails.noReply,
      to,
      subject,
      text: body
    });

    return {
      success: true,
      result: response
    };
  } catch (error: any) {
    return {
      success: false,
      errors: { GENERAL_ERROR: error.response }
    };
  }
};
