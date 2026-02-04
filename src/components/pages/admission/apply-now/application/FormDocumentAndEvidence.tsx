import { UpdateAdmissionFormSchema } from "@/server/schemas/admission-forms/admission-form-schema";
import { UseFormReturn } from "react-hook-form";

interface FormDocumentAndEvidenceProps {
  form: UseFormReturn<UpdateAdmissionFormSchema>;
}

const FormDocumentAndEvidence = ({ form }: FormDocumentAndEvidenceProps) => {
  return (
    <>
      {/* <FormContent formContentTitle="student’s documents">
        <FormInputFile
          label="Upload student photo"
          name="requiredDocuments.studentDocuments.studentPhoto"
          form={form}
        />
        <FormInputFile
          label="Upload student’s passport or Thai birth certificate for Thai citizens"
          name="requiredDocuments.studentDocuments.thaiBirthCertificate"
          form={form}
        />
        <FormInputFile
          label="A copy of the non-immigrant “Ed” visa for foreign students"
          name="requiredDocuments.studentDocuments.nonImmigrantVisa"
          form={form}
        />
        <FormInputFile
          label="A copy of the Thai residence registration"
          name="requiredDocuments.studentDocuments.thaiResidence"
          form={form}
        />
        <FormInputFile
          label="A copy of previous school records"
          name="requiredDocuments.studentDocuments.previousSchoolRecords"
          form={form}
        />
        <FormInputFile
          label="Special academic or evaluation reports, if applicable"
          name="requiredDocuments.studentDocuments.specialAcademic"
          form={form}
        />
        <FormInputFile
          label="Recommendation Form completed by students current school"
          name="requiredDocuments.studentDocuments.recommendationForm"
          form={form}
        />
      </FormContent>

      <FormContent formContentTitle="parent’s / guardian’s documents">
        <FormInputFile
          label="Please upload the father’s photo here"
          name="requiredDocuments.parentDocuments.fatherPhoto"
          form={form}
        />
        <FormInputFile
          label="Please upload the mother’s photo here"
          name="requiredDocuments.parentDocuments.motherPhoto"
          form={form}
        />
        <FormInputFile
          label="Please upload the guardian’s photo here"
          name="requiredDocuments.parentDocuments.guardianPhoto"
          form={form}
        />
        <FormInputFile
          label="A copy of each parent’s passport or Thai I.D. card"
          name="requiredDocuments.parentDocuments.copyOfEachParentId"
          form={form}
        />
      </FormContent> */}
    </>
  );
};

export default FormDocumentAndEvidence;
