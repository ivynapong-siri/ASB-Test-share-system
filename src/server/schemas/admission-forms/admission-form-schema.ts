import { z } from "zod";
import { idSchema } from "../base-schema";
import { createAdditionalInformationSchema } from "./additional-information-schema";
import { createParentInformationSchema } from "./parent-information-schema";
import { createPreviousSchoolInformationSchema } from "./previous-school-information-schema";
import { createRequiredDocumentAndEvidenceSchema } from "./required-document-and-evidence-schema";
import { createStudentHealthSchema } from "./student-health-schema";
import { createStudentInformationSchema } from "./student-information-schema";
import { createSummarySchema } from "./summary-schema";

export const createAdmissionFormSchema = z.object({
  studentInformation: createStudentInformationSchema,
  parentInformation: createParentInformationSchema,
  previousSchoolInformation: createPreviousSchoolInformationSchema,
  additionalInformation: createAdditionalInformationSchema,
  requiredDocuments: createRequiredDocumentAndEvidenceSchema,
  studentHealth: createStudentHealthSchema,
  summary: createSummarySchema,
});

export const updateAdmissionFormSchema = createAdmissionFormSchema.merge(idSchema);
export const draftAdmissionFormSchema = createAdmissionFormSchema.partial();

export type CreateAdmissionFormSchema = z.infer<typeof createAdmissionFormSchema>;
export type UpdateAdmissionFormSchema = z.infer<typeof updateAdmissionFormSchema>;
