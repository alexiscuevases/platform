"use server";

import nodemailer from "nodemailer";
import { NodemailerResponseInterface, ResponseInterface, sendMailNodemailerInterface } from "interfaces";
import { getSettings } from "settings";
import { getEnvironmentVariable } from "helpers";

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
}: sendMailNodemailerInterface): Promise<ResponseInterface<NodemailerResponseInterface, any>> => {
  try {
    const response = await transporter.sendMail({
      from: getSettings("application").mails.noReply,
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
