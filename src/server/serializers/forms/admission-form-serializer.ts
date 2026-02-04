import { AdmissionDetail } from "@/server/models/model-types";
import { DeepPartial } from "react-hook-form";
import { serializeAdditionalInformation } from "./additional-information-serializer";
import { serializeParentInformationDetail } from "./parent-information-serializer";
import { serializePreviousSchoolInformation } from "./previous-school-information-serializer";
import { serializeRequiredDocuments } from "./required-documents-serializer";
import { serializeStudentHealth } from "./student-health-serializer";
import { serializeStudentInformation } from "./student-information-serializer";
import { serializeSummary } from "./summary-serializer";

export type AdmissionFormJson = ReturnType<typeof serializeAdmissionForm>;

export function serializeAdmissionForm(admission: AdmissionDetail) {
  return {
    studentInformation: admission.studentInformation && serializeStudentInformation(admission.studentInformation),
    parentInformation: admission.parentInformation && serializeParentInformationDetail(admission.parentInformation),
    previousSchoolInformation:
      admission.previousSchoolInformation && serializePreviousSchoolInformation(admission.previousSchoolInformation),
    additionalInformation:
      admission.additionalInformation && serializeAdditionalInformation(admission.additionalInformation),
    requiredDocuments: admission.requiredDocuments && serializeRequiredDocuments(admission.requiredDocuments),
    studentHealth: admission.studentHealth && serializeStudentHealth(admission.studentHealth),
    summary: admission.summary && serializeSummary(admission.summary),
  };
}

export function serializeDraftAdmissionForm(admission: DeepPartial<AdmissionDetail>) {
  return {
    studentInformation: admission.studentInformation
      ? serializeStudentInformation(admission.studentInformation as any)
      : undefined,
    parentInformation: admission.parentInformation
      ? serializeParentInformationDetail(admission.parentInformation as any)
      : undefined,
    previousSchoolInformation: admission.previousSchoolInformation
      ? serializePreviousSchoolInformation(admission.previousSchoolInformation as any)
      : undefined,
    additionalInformation: admission.additionalInformation
      ? serializeAdditionalInformation(admission.additionalInformation as any)
      : undefined,
    requiredDocuments: admission.requiredDocuments
      ? serializeRequiredDocuments(admission.requiredDocuments as any)
      : undefined,
    studentHealth: admission.studentHealth ? serializeStudentHealth(admission.studentHealth as any) : undefined,
    summary: admission.summary ? serializeSummary(admission.summary as any) : undefined,
  };
}
