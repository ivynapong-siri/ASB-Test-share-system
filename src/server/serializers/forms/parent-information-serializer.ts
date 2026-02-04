import {
  ContactInformation,
  ParentDetail,
  ParentInformationDetail,
  PersonalInformationParent,
  ProfessionalInformation,
} from "@/server/models/model-types";
import { serializeName, serializePhoneNumber } from "./student-information-serializer";

import { CurrentLivingStatus } from "@/shared/constants/enums";

export type ParentInformationJson = ReturnType<typeof serializeParentInformationDetail>;

export function serializeParentInformationDetail(data: ParentInformationDetail) {
  return {
    currentLivingStatus: data.currentLivingStatus as CurrentLivingStatus,
    fatherInformation: data.fatherInformation && serializeParentDetail(data.fatherInformation),
    motherInformation: data.motherInformation && serializeParentDetail(data.motherInformation),
    guardianInformation: data.guardianInformation && serializeParentDetail(data.guardianInformation),
  };
}

function serializeParentDetail(data: ParentDetail) {
  return {
    name: data.name && serializeName(data.name),
    personalInformation: data.personalInformation && serializePersonalInformationParent(data.personalInformation),
    contactInformation: data.contactInformation && serializeContactInformation(data.contactInformation),
    professionalInformation:
      data.professionalInformation && serializeProfessionalInformation(data.professionalInformation),
  };
}

function serializePersonalInformationParent(data: PersonalInformationParent) {
  return {
    nationality: data.nationality,
    idNumber: data.idNumber,
    dateOfIssue: data.dateOfIssue && new Date(data.dateOfIssue),
  };
}
function serializeContactInformation(data: ContactInformation) {
  return {
    phoneNumber: data.phoneNumber && serializePhoneNumber(data.phoneNumber),
    email: data.email,
  };
}
function serializeProfessionalInformation(data: ProfessionalInformation) {
  return {
    companyName: data.companyName,
    position: data.position,
    companyAddress: data.companyAddress,
    country: data.country,
    postalCode: data.postalCode,
  };
}
