import { Contract, StudentHealthDetail, StudentInformation } from "@/server/models/model-types";

import { BloodType } from "@/shared/constants/enums";

export function serializeStudentHealth(data: StudentHealthDetail) {
  return {
    studentInformation: data.studentInformation && serializeStudentInformation(data.studentInformation),
    alternatePersonEmergency: data.alternatePersonEmergency && serializeContracts(data.alternatePersonEmergency),
  };
}

function serializeStudentInformation(data: StudentInformation) {
  return {
    bloodType: data.bloodType as BloodType,
    foodRestriction: data.foodRestriction,
  };
}

function serializeContracts(data: Contract[]) {
  return data.map((e) => serializeContract(e));
}

function serializeContract(data: Contract) {
  return {
    name: data.name,
    relationShip: data.relationShip,
    mobileNumber: data.mobileNumber,
  };
}
