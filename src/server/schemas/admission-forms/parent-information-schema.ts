import { PhoneNumberSchema, phoneNumber } from "./student-information-schema";

import { CurrentLivingStatus } from "@/shared/constants/enums";
import { z } from "zod";
import { idSchema } from "../base-schema";

const name = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const personalInformation = z.object({
  nationality: z.string(),
  idNumber: z.string(),
  dateOfIssue: z.date().nullish(),
});

const contactInformation = z.object({
  phoneNumber: phoneNumber,
  email: z.string(),
});

const professionalInformation = z.object({
  companyName: z.string(),
  position: z.string(),
  companyAddress: z.string(),
  country: z.string(),
  postalCode: z.number(),
});

const parentInformation = z.object({
  name: name,
  personalInformation: personalInformation,
  contactInformation: contactInformation,
  professionalInformation: professionalInformation,
});

export const createParentInformationSchema = z.object({
  currentLivingStatus: z.nativeEnum(CurrentLivingStatus).default(CurrentLivingStatus.Parents),
  fatherInformation: parentInformation.optional(),
  motherInformation: parentInformation.optional(),
  guardianInformation: parentInformation.optional(),
});

export const updateParentInformationSchema = createParentInformationSchema.merge(idSchema);

export type CreateParentInformationSchema = z.infer<typeof createParentInformationSchema>;
export type UpdateParentInformationSchema = z.infer<typeof updateParentInformationSchema>;

export type PartialParentInfo = {
  name?: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    nickName?: string;
    [key: string]: any;
  };
  personalInformation?: {
    nationality?: string;
    idNumber?: string;
    dateOfIssue?: string | Date | null;
    [key: string]: any;
  };
  contactInformation?: {
    phoneNumber?: PhoneNumberSchema;
    email?: string;
    [key: string]: any;
  };
  professionalInformation?: {
    companyName?: string;
    position?: string;
    companyAddress?: string;
    country?: string;
    postalCode?: number;
    [key: string]: any;
  };
};
