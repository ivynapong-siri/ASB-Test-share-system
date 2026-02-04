import { ParentDocuments, RequiredDocumentsDetail, StudentDocuments } from "@/server/models/model-types";

import { serializeMedias } from "../media-serializer";

export function serializeRequiredDocuments(data: RequiredDocumentsDetail) {
  return {
    studentDocuments: data.studentDocuments && serializeStudentDocuments(data.studentDocuments),
    parentDocuments: data.parentDocuments && serializeParentDocuments(data.parentDocuments),
  };
}

function serializeStudentDocuments(data: StudentDocuments) {
  return {
    studentPhoto: data.studentPhoto && serializeMedias(data.studentPhoto),
    thaiBirthCertificate: data.thaiBirthCertificate && serializeMedias(data.thaiBirthCertificate),
    nonImmigrantVisa: data.nonImmigrantVisa && serializeMedias(data.nonImmigrantVisa),
    thaiResidence: data.thaiResidence && serializeMedias(data.thaiResidence),
    previousSchoolRecords: data.previousSchoolRecords && serializeMedias(data.previousSchoolRecords),
    specialAcademic: data.specialAcademic && serializeMedias(data.specialAcademic),
    recommendationForm: data.recommendationForm && serializeMedias(data.recommendationForm),
  };
}

function serializeParentDocuments(data: ParentDocuments) {
  return {
    fatherPhoto: data.fatherPhoto && serializeMedias(data.fatherPhoto),
    motherPhoto: data.motherPhoto && serializeMedias(data.motherPhoto),
    guardianPhoto: data.guardianPhoto && serializeMedias(data.guardianPhoto),
    copyOfEachParentId: data.copyOfEachParentId && serializeMedias(data.copyOfEachParentId),
  };
}
