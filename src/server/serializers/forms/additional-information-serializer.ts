import {
  ASBPlusResidentialProgram,
  AdditionalInformationDetail,
  AttendingXCL,
  BrotherSisterAttending,
  ChildProblem,
  Service,
  SpecialCare,
} from "@/server/models/model-types";

import { serializePhoneNumber } from "./student-information-serializer";

export function serializeAdditionalInformation(data: AdditionalInformationDetail) {
  return {
    childProblem: data.childProblem && serializeChildProblem(data.childProblem),
    specialCare: data.specialCare && serializeSpecialCare(data.specialCare),
    service: data.service && serializeService(data.service),
    brotherSisterAttending: data.brotherSisterAttending && serializeBrotherSisterAttending(data.brotherSisterAttending),
    asbPlusResidentialProgram:
      data.asbPlusResidentialProgram && serializeASBPlusResidentialProgram(data.asbPlusResidentialProgram),
  };
}

export function serializeASBPlusResidentialProgram(data: ASBPlusResidentialProgram) {
  return {
    interestBoardingProgram: data.interestBoardingProgram,
    optionInterest: data.optionInterest,
    phoneNumber: data.phoneNumber && serializePhoneNumber(data.phoneNumber),
    signature: data.signature,
    dateOfApplication: data.dateOfApplication && new Date(data.dateOfApplication),
  };
}

export function serializeChildProblem(data: ChildProblem) {
  return {
    learningSupport: data.learningSupport,
    learningSupportElaborate: data.learningSupportElaborate,
    childBehavior: data.childBehavior,
    childBehaviorElaborate: data.childBehaviorElaborate,
  };
}

export function serializeSpecialCare(data: SpecialCare) {
  return {
    physicalHealthLimit: data.physicalHealthLimit,
    dietaryRequirement: data.dietaryRequirement,
  };
}

export function serializeService(data: Service) {
  return {
    requireSchoolBusService: data.requireSchoolBusService,
    employerPaySchoolFees: data.employerPaySchoolFees,
    employerInformation: data.employerInformation,
  };
}

export function serializeBrotherSisterAttending(data: BrotherSisterAttending) {
  return {
    brotherSister: data.brotherSister,
    detail: data.detail && serializeAttendingXCLs(data.detail),
  };
}

export function serializeAttendingXCLs(data: AttendingXCL[]) {
  return data.map((e) => serializeAttendingXCL(e));
}

export function serializeAttendingXCL(data: AttendingXCL) {
  return { name: data.name, grade: data.grade };
}
