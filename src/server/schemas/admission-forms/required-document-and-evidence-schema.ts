import { fileObjSchema, idSchema } from "../base-schema";

import { z } from "zod";

const studentDocuments = z.object({
  studentPhoto: z.array(fileObjSchema).default([]),
  thaiBirthCertificate: z.array(fileObjSchema).optional().default([]),
  nonImmigrantVisa: z.array(fileObjSchema).optional().default([]),
  thaiResidence: z.array(fileObjSchema).default([]),
  previousSchoolRecords: z.array(fileObjSchema).default([]),
  specialAcademic: z.array(fileObjSchema).default([]),
  recommendationForm: z.array(fileObjSchema).default([]),
});

const parentDocuments = z.object({
  fatherPhoto: z.array(fileObjSchema).default([]),
  motherPhoto: z.array(fileObjSchema).default([]),
  guardianPhoto: z.array(fileObjSchema).optional().default([]),
  copyOfEachParentId: z.array(fileObjSchema).default([]),
});

export const createRequiredDocumentAndEvidenceSchema = z.object({
  studentDocuments: studentDocuments,
  parentDocuments: parentDocuments,
});

export const updateRequiredDocumentAndEvidenceSchema = createRequiredDocumentAndEvidenceSchema.merge(idSchema);

export type CreateRequiredDocumentAndEvidenceSchema = z.infer<typeof createRequiredDocumentAndEvidenceSchema>;
export type UpdateRequiredDocumentAndEvidenceSchema = z.infer<typeof updateRequiredDocumentAndEvidenceSchema>;
