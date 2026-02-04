import { z } from "zod";
import { idSchema } from "../base-schema";
import { phoneNumber } from "./student-information-schema";

const childProblem = z.object({
  learningSupport: z.boolean(),
  learningSupportElaborate: z.string().optional(),
  childBehavior: z.boolean(),
  childBehaviorElaborate: z.string().optional(),
});

const specialCare = z.object({
  physicalHealthLimit: z.string().optional(),
  dietaryRequirement: z.string().optional(),
});

const service = z.object({
  requireSchoolBusService: z.boolean(),
  employerPaySchoolFees: z.boolean(),
  employerInformation: z.string().optional(),
});

const attendingXCL = z.object({
  name: z.string(),
  grade: z.number().optional(),
});

const brotherSisterAttending = z.object({
  brotherSister: z.boolean(),
  detail: z.array(attendingXCL).optional(),
});

const asbPlusResidentialProgram = z.object({
  interestBoardingProgram: z.boolean(),
  optionInterest: z.boolean().optional(),
  phoneNumber: phoneNumber,
  signature: z
    .string()
    .regex(/^data:image\/png;base64,/, {
      message: "Invalid signature format",
    })
    .optional(),
  dateOfApplication: z.date(),
});

export const createAdditionalInformationSchema = z.object({
  childProblem: childProblem,
  specialCare: specialCare,
  service: service,
  brotherSisterAttending: brotherSisterAttending,
  asbPlusResidentialProgram: asbPlusResidentialProgram,
});

export const updateAdditionalInformationSchema = createAdditionalInformationSchema.merge(idSchema);

export type CreateAdditionalInformationSchema = z.infer<typeof createAdditionalInformationSchema>;
export type UpdateAdditionalInformationSchema = z.infer<typeof updateAdditionalInformationSchema>;
