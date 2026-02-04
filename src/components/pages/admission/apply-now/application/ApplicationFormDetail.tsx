"use client";

import {
  UpdateAdmissionFormSchema,
  createAdmissionFormSchema,
  updateAdmissionFormSchema,
} from "@/server/schemas/admission-forms/admission-form-schema";
import {
  CreateParentInformationSchema,
  PartialParentInfo,
} from "@/server/schemas/admission-forms/parent-information-schema";
import {
  ApplyForAcademicYear,
  BloodType,
  CurrentLivingStatus,
  Gender,
  IncomingGrade,
  IntakeTerm,
  Nationality,
  StudentEnglishProficiency,
  StudentSpokenLanguage,
} from "@/shared/constants/enums";
import { Resolver, useForm } from "react-hook-form";

import { Country } from "@/server/models/model-types";
import { FileObjSchema } from "@/server/schemas/base-schema";
import { AdmissionFormJson } from "@/server/serializers/forms/admission-form-serializer";
import { JOTFORMDataPageJson } from "@/server/serializers/jotform-serializer";
import { encodeFileObjsToFormData } from "@/server/utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { saveAsDraftForm } from "./action";

interface ApplicationDetailProps {
  admissionData?: AdmissionFormJson | null;
  countries: Country[];
  jotformData: JOTFORMDataPageJson[][];
}

const ApplicationFormDetail = ({ jotformData, admissionData, countries }: ApplicationDetailProps) => {
  const form = useForm<UpdateAdmissionFormSchema>({
    resolver: zodResolver(
      admissionData ? updateAdmissionFormSchema : createAdmissionFormSchema
    ) as Resolver<UpdateAdmissionFormSchema>,
    // defaultValues: getInitialValues(admissionData),
  });
  const [currentStep, setCurrentStep] = useState(0);

  // const formData = [
  //   {
  //     id: 1,
  //     ribbonTitle: "step 1: Student Information",
  //     title: "Student Information",
  //     form: <FormStudentInformation form={form} countries={countries} />,
  //   },
  //   {
  //     id: 2,
  //     ribbonTitle: "step 2: parents information",
  //     title: "Applicant’s Living Status",
  //     form: <FormParentInformation form={form} />,
  //   },
  //   {
  //     id: 3,
  //     ribbonTitle: "step 3: Previous School Information",
  //     title: "Previous Education",
  //     form: <FormPreviousSchoolInformation form={form} />,
  //   },
  //   {
  //     id: 4,
  //     ribbonTitle: "step 4: Additional Information",
  //     title: "Additional Information",
  //     form: <FormAdditionalInformation form={form} />,
  //   },
  //   {
  //     id: 5,
  //     ribbonTitle: "step 5: Required Documents and Evidence",
  //     title: "Required Documents and Evidence",
  //     form: <FormDocumentAndEvidence form={form} />,
  //   },
  //   {
  //     id: 6,
  //     ribbonTitle: "step 6: Student Health From",
  //     title: "Student Health Form",
  //     form: <FormStudentHealth form={form} />,
  //   },
  //   { id: 7, ribbonTitle: "step 7: Summary", title: "Summary", form: <FormSummary form={form} /> },
  // ];

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form;

  // const handleNext = () => {
  //   if (currentStep < formData.length - 1) {
  //     setCurrentStep((prev) => prev + 1);
  //   }
  // };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSaveAsDraft = async () => {
    try {
      const requiredDocs = form.getValues("requiredDocuments") ?? {};
      const studentDocs = requiredDocs.studentDocuments ?? {};
      const parentDocs = requiredDocs.parentDocuments ?? {};

      const allFiles: FileObjSchema[] = [
        ...(studentDocs.studentPhoto ?? []),
        ...(studentDocs.thaiBirthCertificate ?? []),
        ...(studentDocs.nonImmigrantVisa ?? []),
        ...(studentDocs.thaiResidence ?? []),
        ...(studentDocs.previousSchoolRecords ?? []),
        ...(studentDocs.specialAcademic ?? []),
        ...(studentDocs.recommendationForm ?? []),
        ...(parentDocs.fatherPhoto ?? []),
        ...(parentDocs.motherPhoto ?? []),
        ...(parentDocs.guardianPhoto ?? []),
        ...(parentDocs.copyOfEachParentId ?? []),
      ];
      const filesFormData = encodeFileObjsToFormData(allFiles);
      await saveAsDraftForm(form.getValues(), filesFormData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <iframe src="https://form.jotform.com/251660299759068" className="h-[100vh] w-full border-none" allowFullScreen />
  );
};

function normalizeParentInfo(info?: PartialParentInfo): CreateParentInformationSchema["fatherInformation"] {
  return {
    name: {
      firstName: info?.name?.firstName ?? "",
      middleName: info?.name?.middleName ?? "",
      lastName: info?.name?.lastName ?? "",
    },
    personalInformation: {
      nationality: info?.personalInformation?.nationality ?? "",
      idNumber: info?.personalInformation?.idNumber ?? "",
      dateOfIssue: info?.personalInformation?.dateOfIssue ? new Date(info.personalInformation.dateOfIssue) : undefined,
    },
    contactInformation: {
      phoneNumber:
        info?.contactInformation?.phoneNumber == undefined
          ? { areaCode: "", number: "" }
          : {
              areaCode: info?.contactInformation?.phoneNumber?.areaCode ?? "",
              number: info?.contactInformation?.phoneNumber?.number ?? "",
            },
      email: info?.contactInformation?.email ?? "",
    },
    professionalInformation: {
      companyName: info?.professionalInformation?.companyName ?? "",
      position: info?.professionalInformation?.position ?? "",
      companyAddress: info?.professionalInformation?.companyAddress ?? "",
      country: info?.professionalInformation?.country ?? "",
      postalCode: info?.professionalInformation?.postalCode ?? 0,
    },
  };
}

function getInitialValues(admissionData: Partial<AdmissionFormJson> | null | undefined): UpdateAdmissionFormSchema {
  const studentInformation = admissionData?.studentInformation;
  const parentInformation = admissionData?.parentInformation;
  const previousSchool = admissionData?.previousSchoolInformation;
  const additionalInformation = admissionData?.additionalInformation;
  const parentDocuments = admissionData?.requiredDocuments?.parentDocuments;
  const studentDocuments = admissionData?.requiredDocuments?.studentDocuments;
  const studentHealth = admissionData?.studentHealth;
  const summary = admissionData?.summary;

  return {
    ...admissionData,
    studentInformation: {
      ...studentInformation,
      personalInformation: {
        dateOfBirth: studentInformation?.personalInformation?.dateOfBirth
          ? new Date(studentInformation.personalInformation.dateOfBirth)
          : null,
        gender: studentInformation?.personalInformation.gender ?? Gender.Male,
        age: studentInformation?.personalInformation.age ?? 0,
        nationality: studentInformation?.personalInformation.nationality ?? Nationality.Thai,
        religion: studentInformation?.personalInformation.religion ?? "",
        emergencyPhoneNumber:
          studentInformation?.personalInformation.emergencyPhoneNumber == undefined
            ? { areaCode: "", number: "" }
            : {
                areaCode: studentInformation?.personalInformation.emergencyPhoneNumber.areaCode,
                number: studentInformation?.personalInformation.emergencyPhoneNumber.number,
              },
        idNumber: studentInformation?.personalInformation.idNumber ?? "",
      },
      name: {
        firstName: studentInformation?.name.firstName ?? "",
        lastName: studentInformation?.name.lastName ?? "",
        nickName: studentInformation?.name.nickName ?? "",
        middleName: studentInformation?.name.middleName ?? undefined,
      },
      academicInformation: {
        applyForAcademicYear:
          studentInformation?.academicInformation.applyForAcademicYear ?? ApplyForAcademicYear.Year2024,
        incomingGrade: studentInformation?.academicInformation.incomingGrade ?? IncomingGrade.Grade1,
        intakeTerm: studentInformation?.academicInformation.intakeTerm ?? IntakeTerm.Semester1,
      },
      languageProficiency: {
        firstLanguage: studentInformation?.languageProficiency.firstLanguage ?? StudentSpokenLanguage.Thai,
        mainLanguage: studentInformation?.languageProficiency.mainLanguage ?? StudentSpokenLanguage.Thai,
        secondAndThirdLanguage:
          studentInformation?.languageProficiency.secondAndThirdLanguage ?? StudentSpokenLanguage.Thai,
        englishProficiency:
          studentInformation?.languageProficiency.englishProficiency ?? StudentEnglishProficiency.Fair,
      },
      studentPermanentMailingAddress: {
        name: studentInformation?.studentPermanentMailingAddress.name ?? "",
        address: studentInformation?.studentPermanentMailingAddress.address ?? "",
        country: studentInformation?.studentPermanentMailingAddress.country ?? "",
        postalCode: studentInformation?.studentPermanentMailingAddress.postalCode ?? 0,
        phoneNumber:
          studentInformation?.studentPermanentMailingAddress.phoneNumber.areaCode == undefined
            ? { areaCode: "", number: "" }
            : {
                areaCode: studentInformation?.studentPermanentMailingAddress.phoneNumber.areaCode ?? "",
                number: studentInformation?.studentPermanentMailingAddress.phoneNumber.number ?? "",
              },
      },
    },

    parentInformation: {
      currentLivingStatus: parentInformation?.currentLivingStatus ?? CurrentLivingStatus.Parents,
      fatherInformation: normalizeParentInfo(parentInformation?.fatherInformation),
      motherInformation: normalizeParentInfo(parentInformation?.motherInformation),
      guardianInformation: normalizeParentInfo(parentInformation?.guardianInformation),
    },

    previousSchoolInformation: {
      formerSchool: previousSchool?.formerSchool ?? [],
      referrerContactDetails: {
        name: previousSchool?.referrerContactDetails?.name ?? "",
        email: previousSchool?.referrerContactDetails?.email ?? "",
        phoneNumber:
          previousSchool?.referrerContactDetails?.phoneNumber == undefined
            ? { areaCode: "", number: "" }
            : {
                areaCode: previousSchool?.referrerContactDetails?.phoneNumber.areaCode ?? "",
                number: previousSchool?.referrerContactDetails?.phoneNumber.number ?? "",
              },
      },
    },

    additionalInformation: {
      childProblem: {
        learningSupport: additionalInformation?.childProblem.learningSupport ?? false,
        childBehavior: additionalInformation?.childProblem.childBehavior ?? false,
      },
      specialCare: { ...additionalInformation?.specialCare },
      service: {
        ...additionalInformation?.service,
        requireSchoolBusService: additionalInformation?.service.requireSchoolBusService ?? false,
        employerPaySchoolFees: additionalInformation?.service.employerPaySchoolFees ?? false,
      },
      brotherSisterAttending: {
        ...additionalInformation?.brotherSisterAttending,
        brotherSister: additionalInformation?.brotherSisterAttending.brotherSister ?? false,
      },
      // TODO: New section
      asbPlusResidentialProgram: {
        interestBoardingProgram: additionalInformation?.asbPlusResidentialProgram?.interestBoardingProgram ?? false,
        optionInterest: additionalInformation?.asbPlusResidentialProgram?.optionInterest,
        phoneNumber: {
          areaCode: additionalInformation?.asbPlusResidentialProgram?.phoneNumber?.areaCode ?? "",
          number: additionalInformation?.asbPlusResidentialProgram?.phoneNumber?.number ?? "",
        },
        signature: additionalInformation?.asbPlusResidentialProgram?.signature,
        dateOfApplication: additionalInformation?.asbPlusResidentialProgram?.dateOfApplication ?? new Date(),
      },
    },

    requiredDocuments: {
      studentDocuments: {
        studentPhoto: studentDocuments?.studentPhoto ?? [],
        thaiBirthCertificate: studentDocuments?.thaiBirthCertificate ?? [],
        nonImmigrantVisa: studentDocuments?.nonImmigrantVisa ?? [],
        thaiResidence: studentDocuments?.thaiResidence ?? [],
        previousSchoolRecords: studentDocuments?.previousSchoolRecords ?? [],
        specialAcademic: studentDocuments?.specialAcademic ?? [],
        recommendationForm: studentDocuments?.recommendationForm ?? [],
      },
      parentDocuments: {
        fatherPhoto: parentDocuments?.fatherPhoto ?? [],
        motherPhoto: parentDocuments?.motherPhoto ?? [],
        guardianPhoto: parentDocuments?.guardianPhoto ?? [],
        copyOfEachParentId: parentDocuments?.copyOfEachParentId ?? [],
      },
    },

    studentHealth: {
      alternatePersonEmergency: Array.isArray(studentHealth?.alternatePersonEmergency)
        ? studentHealth.alternatePersonEmergency
        : [],
      studentInformation: {
        bloodType: studentHealth?.studentInformation.bloodType ?? BloodType.O,
      },
    },

    summary: { consent: summary?.consent ?? false },
  };
}

export default ApplicationFormDetail;

// static version
{
  /* <FormProgression form={form} formData={formData} goToStep={(stepIndex) => setCurrentStep(stepIndex)} />
          <FormBox
            ribbonTitle={formData[currentStep].ribbonTitle}
            title={formData[currentStep].title}
            isLast={currentStep === formData.length - 1}
            onClickNext={handleNext}
            onClickPrevious={handlePrevious}
            onClickSaveAsDraft={() => {
              handleSaveAsDraft();
            }}
            onSubmit={() => console.log("submit")} // TODO: Add submit form
          >
            {formData[currentStep].form}
          </FormBox> */
}

//dynamic version
{
  /* <ApplicationFormTitle />
      <Form {...form}>
        <div className="flex flex-row gap-10">
          <FormProgression form={form} formData={formData} goToStep={(stepIndex) => setCurrentStep(stepIndex)} />
          <DynamicFormPage
            ribbonText={formData[currentStep].ribbonTitle} //TODO: Add ribbonText and title page in wp api
            titlePage={formData[currentStep].title} //TODO: Add ribbonText and title page in wp api
            data={jotformData[currentStep]}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            handleSaveAsDraft={handleSaveAsDraft}
            isLast={currentStep === jotformData.length - 1}
          />
          
          
        </div>
      </Form> */
}
