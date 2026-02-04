import { BloodType } from "@/shared/constants/enums";
import { z } from "zod";
import { idSchema } from "../base-schema";

const studentInformation = z.object({
  bloodType: z.nativeEnum(BloodType),
  foodRestriction: z.string().optional(),
});

const contract = z.object({
  name: z.string(),
  relationShip: z.string(),
  mobileNumber: z.string(),
});

export const createStudentHealthSchema = z.object({
  studentInformation: studentInformation,
  alternatePersonEmergency: z.array(contract),
});

export const updateStudentHealthSchema = createStudentHealthSchema.merge(idSchema);

export type CreateStudentHealthSchema = z.infer<typeof createStudentHealthSchema>;
export type UpdateStudentHealthSchema = z.infer<typeof updateStudentHealthSchema>;
