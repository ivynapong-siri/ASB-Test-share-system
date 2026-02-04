import { z } from "zod";

export const envSchema = z.object({
  WORDPRESS_URL: z.string(),
  WORDPRESS_CUSTOM_URL: z.string(),
  WORDPRESS_BASE_URL: z.string(),

  CANONICAL_URL: z.string(),

  NODE_MAILER_GMAIL: z.string(),
  NODE_MAILER_SENDER: z.string(),
  NODE_MAILER_GMAIL_APP_PASSWORD: z.string(),
  SUPPORT_EMAIL: z.string(),

  GOOGLE_MAPS_API_KEY: z.string(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
