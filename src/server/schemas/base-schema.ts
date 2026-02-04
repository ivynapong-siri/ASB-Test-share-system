import { z } from "zod";

export const idSchema = z.object({ id: z.string().uuid().optional() });

export const fileObjSchema = z.object({
  id: z.string().optional(),
  file: z.instanceof(File).optional(),
  url: z.string().optional(),
});

export type FileObjSchema = z.infer<typeof fileObjSchema>;

export type FileObjFormDataSchema = { id?: string; formData?: FormData };
