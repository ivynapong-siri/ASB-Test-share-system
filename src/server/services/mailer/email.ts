// import { render } from "@react-email/components";

// import RequestResetPasswordEmail from "../../../../emails/reset-password";
// import VerifyEmail from "../../../../emails/verify-email";

// export async function verificationEmail({
//   recipient,
//   code,
//   link,
//   linkValidityMinutes,
//   supportEmail,
// }: {
//   recipient: string;
//   code: string;
//   link: string;
//   linkValidityMinutes: number;
//   supportEmail: string;
// }) {
//   const html = await render(VerifyEmail({ code, link, linkValidityMinutes, supportEmail }));
//   return { from: process.env.NODE_MAILER_SENDER, recipient, subject: "Verify your account", html };
// }

// export async function resetPasswordEmail({
//   firstName,
//   recipient,
//   link,
//   linkValidityMinutes,
// }: {
//   firstName: string;
//   recipient: string;
//   link: string;
//   linkValidityMinutes: number;
// }) {
//   const html = await render(RequestResetPasswordEmail({ firstName, link, linkValidityMinutes }));
//   return { from: process.env.NODE_MAILER_SENDER, recipient, subject: "Reset your password", html };
// }
