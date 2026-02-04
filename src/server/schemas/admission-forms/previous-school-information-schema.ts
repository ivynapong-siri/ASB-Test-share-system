import { z } from "zod";
import { idSchema } from "../base-schema";
import { phoneNumber } from "./student-information-schema";

const formerSchool = z.object({
  name: z.string(),
  yearOfStudy: z.number().optional(),
  location: z.string(),
});

const referrerContactDetails = z.object({
  name: z.string(),
  email: z.string(),
  phoneNumber: phoneNumber,
});

export const createPreviousSchoolInformationSchema = z.object({
  formerSchool: z.array(formerSchool),
  referrerContactDetails: referrerContactDetails,
});

export const updatePreviousSchoolInformationSchema = createPreviousSchoolInformationSchema.merge(idSchema);

export type CreatePreviousSchoolInformationSchema = z.infer<typeof createPreviousSchoolInformationSchema>;
export type UpdatePreviousSchoolInformationSchema = z.infer<typeof updatePreviousSchoolInformationSchema>;
