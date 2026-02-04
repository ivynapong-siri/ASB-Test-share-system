import { FormerSchool, PreviousSchoolInformationDetail, ReferrerContactDetails } from "@/server/models/model-types";

import { serializePhoneNumber } from "./student-information-serializer";

export function serializePreviousSchoolInformation(data: PreviousSchoolInformationDetail) {
  return {
    formerSchool: data.formerSchool && serializeFormerSchools(data.formerSchool),
    referrerContactDetails: data.referrerContactDetails && serializeReferrerContactDetails(data.referrerContactDetails),
  };
}

function serializeFormerSchools(data: FormerSchool[]) {
  return data.map((e) => serializeFormerSchool(e));
}

function serializeFormerSchool(data: FormerSchool) {
  return {
    name: data.name,
    yearOfStudy: data.yearOfStudy,
    location: data.location,
  };
}

function serializeReferrerContactDetails(data: ReferrerContactDetails) {
  return {
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber && serializePhoneNumber(data.phoneNumber),
  };
}
