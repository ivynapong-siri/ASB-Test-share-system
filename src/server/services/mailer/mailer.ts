export type EmailParam = {
  recipient: string | string[];
  subject: string;
  html: string;
  bcc?: string | string[];
  cc?: string | string[];
};
