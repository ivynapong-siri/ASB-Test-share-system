import {
  AcademicInformation,
  LanguageProficiency,
  Name,
  PersonalInformation,
  PhoneNumber,
  StudentInformationDetail,
  StudentPermanentMailingAddress,
} from "@/server/models/model-types";
import {
  ApplyForAcademicYear,
  IncomingGrade,
  IntakeTerm,
  Nationality,
  StudentEnglishProficiency,
  StudentSpokenLanguage,
} from "@/shared/constants/enums";

export type StudentInformationJson = ReturnType<typeof serializeStudentInformation>;

export function serializeStudentInformation(data: StudentInformationDetail) {
  return {
    name: serializeName(data.name),
    personalInformation: serializePersonalInformation(data.personalInformation),
    academicInformation: serializeAcademicInformation(data.academicInformation),
    languageProficiency: serializeLanguageProficiency(data.languageProficiency),
    studentPermanentMailingAddress: serializeStudentPermanentMailingAddress(data.studentPermanentMailingAddress),
  };
}

export function serializePhoneNumber(data: PhoneNumber) {
  return {
    areaCode: data.areaCode,
    number: data.number,
  };
}

export function serializeName(data: Name) {
  return {
    firstName: data.firstName,
    middleName: data.middleName ?? "",
    lastName: data.lastName,
    nickName: data.nickName,
  };
}

function serializePersonalInformation(data: PersonalInformation) {
  return {
    gender: data.gender,
    dateOfBirth: data.dateOfBirth && new Date(data.dateOfBirth),
    age: data.age,
    nationality: data.nationality as Nationality,
    religion: data.religion,
    emergencyPhoneNumber: data.emergencyPhoneNumber && serializePhoneNumber(data.emergencyPhoneNumber),
    idNumber: data.idNumber,
    dateOfIssue: data.dateOfIssue && new Date(data.dateOfIssue),
    expiryDate: data.expiryDate && new Date(data.expiryDate),
  };
}

function serializeAcademicInformation(data: AcademicInformation) {
  return {
    startDate: data.startDate && new Date(data.startDate),
    incomingGrade: data.incomingGrade as IncomingGrade,
    applyForAcademicYear: data.applyForAcademicYear as ApplyForAcademicYear,
    intakeTerm: data.intakeTerm as IntakeTerm,
  };
}

function serializeLanguageProficiency(data: LanguageProficiency) {
  return {
    firstLanguage: data.firstLanguage as StudentSpokenLanguage,
    mainLanguage: data.mainLanguage as StudentSpokenLanguage,
    secondAndThirdLanguage: data.secondAndThirdLanguage as StudentSpokenLanguage,
    englishProficiency: data.englishProficiency as StudentEnglishProficiency,
  };
}

function serializeStudentPermanentMailingAddress(data: StudentPermanentMailingAddress) {
  return {
    name: data.name,
    address: data.address,
    country: data.country,
    postalCode: data.postalCode,
    phoneNumber: data.phoneNumber && serializePhoneNumber(data.phoneNumber),
  };
}
