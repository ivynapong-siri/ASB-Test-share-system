import {
  ApplyForAcademicYear,
  Gender,
  IncomingGrade,
  IntakeTerm,
  Nationality,
  StudentEnglishProficiency,
  StudentSpokenLanguage,
} from "@/shared/constants/enums";

import { z } from "zod";
import { idSchema } from "../base-schema";

export type PhoneNumberSchema = z.infer<typeof phoneNumber>;

export const phoneNumber = z.object({
  areaCode: z.string(),
  number: z.string(),
});

const name = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  nickName: z.string(),
});

const personalInformation = z.object({
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.date().nullish(),
  age: z.number(),
  nationality: z.nativeEnum(Nationality),
  religion: z.string(),
  emergencyPhoneNumber: phoneNumber,
  idNumber: z.string(),
  dateOfIssue: z.date().nullish(),
  expiryDate: z.date().nullish(),
});

const academicInformation = z.object({
  incomingGrade: z.nativeEnum(IncomingGrade),
  applyForAcademicYear: z.nativeEnum(ApplyForAcademicYear),
  startDate: z.date().nullish(),
  intakeTerm: z.nativeEnum(IntakeTerm),
});

const languageProficiency = z.object({
  firstLanguage: z.nativeEnum(StudentSpokenLanguage),
  mainLanguage: z.nativeEnum(StudentSpokenLanguage),
  secondAndThirdLanguage: z.nativeEnum(StudentSpokenLanguage),
  englishProficiency: z.nativeEnum(StudentEnglishProficiency),
});

const studentPermanentMailingAddress = z.object({
  name: z.string(),
  address: z.string(),
  country: z.string(),
  postalCode: z.number(),
  phoneNumber: phoneNumber,
});

export const createStudentInformationSchema = z.object({
  name: name,
  personalInformation: personalInformation,
  academicInformation: academicInformation,
  languageProficiency: languageProficiency,
  studentPermanentMailingAddress: studentPermanentMailingAddress,
});

export const updateStudentInformationSchema = createStudentInformationSchema.merge(idSchema);

export type CreateStudentInformationSchema = z.infer<typeof createStudentInformationSchema>;
export type UpdateStudentInformationSchema = z.infer<typeof updateStudentInformationSchema>;
