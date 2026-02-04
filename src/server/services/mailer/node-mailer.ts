import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import { EmailParam } from "./mailer";

const gmailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // `false` for port 587 (TLS), `true` for port 465 (SSL)
  auth: { user: process.env.NODE_MAILER_GMAIL, pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD },
  from: process.env.NODE_MAILER_GMAIL,
});

export async function nodeMailerSendEmail(params: EmailParam) {
  gmailTransporter.verify((error, success) => {
    if (error) {
      console.error("Nodemailer verification failed:", error);
    } else {
      console.log("Nodemailer is ready to send emails.");
    }
  });
  const option: Mail.Options = {
    from: `${process.env.NODE_MAILER_SENDER} <${process.env.NODE_MAILER_GMAIL}>`,
    to: params.recipient,
    subject: params.subject,
    html: params.html,
    cc: params.cc,
    bcc: params.bcc,
  };
  try {
    const result = await gmailTransporter.sendMail(option);
    console.log(`Successfully sent email messageId: ${result.messageId} response: ${result.response}`);
  } catch (error) {
    if (error instanceof Error && error?.message) {
      console.log(`mailer error: ${error.message}`);
    } else {
      console.log(`mailer error: ${error}`);
    }
  }
}
