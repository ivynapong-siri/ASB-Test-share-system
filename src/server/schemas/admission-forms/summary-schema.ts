import { z } from "zod";
import { idSchema } from "../base-schema";

export const createSummarySchema = z.object({
  consent: z.boolean(),
});

export const updateSummarySchema = createSummarySchema.merge(idSchema);

export type CreateSummarySchema = z.infer<typeof createSummarySchema>;
export type UpdateSummarySchema = z.infer<typeof updateSummarySchema>;
