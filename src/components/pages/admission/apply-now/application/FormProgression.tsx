import { cn } from "@/lib/utils";
import { UpdateAdmissionFormSchema } from "@/server/schemas/admission-forms/admission-form-schema";
import { PartialParentInfo } from "@/server/schemas/admission-forms/parent-information-schema";
import { CurrentLivingStatus } from "@/shared/constants/enums";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

interface FormProgressionProps {
  form: UseFormReturn<UpdateAdmissionFormSchema>;
  formData: {
    id: number;
    ribbonTitle: string;
    title: string;
  }[];
  goToStep: (stepIndex: number) => void;
}

const FormProgression = ({ form, formData, goToStep }: FormProgressionProps) => {
  const values = form.getValues();

  const hasData = (stepId: number) => {
    switch (stepId) {
      case 1: {
        const info = values?.studentInformation;

        if (!info) return false;

        const nameValid =
          !!info.name?.firstName?.trim() && !!info.name?.lastName?.trim() && !!info.name?.nickName?.trim();

        const personalValid =
          !!info.personalInformation?.nationality?.trim() &&
          !!info.personalInformation?.religion?.trim() &&
          typeof info.personalInformation?.age === "number";

        const academicValid =
          typeof info.academicInformation?.incomingGrade === "number" &&
          info.academicInformation?.applyForAcademicYear !== undefined &&
          info.academicInformation?.intakeTerm !== undefined;

        const languageValid =
          !!info.languageProficiency?.firstLanguage?.trim() &&
          !!info.languageProficiency?.mainLanguage?.trim() &&
          !!info.languageProficiency?.secondAndThirdLanguage?.trim() &&
          info.languageProficiency?.englishProficiency !== undefined;

        const addressValid =
          !!info.studentPermanentMailingAddress?.name?.trim() &&
          !!info.studentPermanentMailingAddress?.address?.trim() &&
          !!info.studentPermanentMailingAddress?.country?.trim() &&
          !!(info.studentPermanentMailingAddress?.phoneNumber?.areaCode ?? "").trim() &&
          !!info.studentPermanentMailingAddress?.phoneNumber?.number.trim() &&
          typeof info.studentPermanentMailingAddress?.postalCode === "number";

        return nameValid && personalValid && academicValid && languageValid && addressValid;
      }

      case 2: {
        const { parentInformation } = values;
        const status = parentInformation?.currentLivingStatus;

        const isFilled = (info?: PartialParentInfo) => {
          if (!info) return false;

          const nameFilled = !!info.name?.firstName?.trim() && !!info.name?.lastName?.trim();
          const personalFilled =
            !!info.personalInformation?.nationality?.trim() && !!info.personalInformation?.idNumber?.trim();
          const contactFilled =
            !!(info.contactInformation?.phoneNumber?.areaCode ?? "").trim() &&
            !!info.contactInformation?.phoneNumber?.number.trim() &&
            !!info.contactInformation?.email?.trim();
          const professionalFilled =
            !!info.professionalInformation?.companyName?.trim() &&
            !!info.professionalInformation?.position?.trim() &&
            !!info.professionalInformation?.companyAddress?.trim() &&
            !!info.professionalInformation?.country?.trim() &&
            typeof info.professionalInformation?.postalCode === "number";

          return nameFilled && personalFilled && contactFilled && professionalFilled;
        };

        return (
          (status === CurrentLivingStatus.Parents &&
            isFilled(parentInformation.fatherInformation) &&
            isFilled(parentInformation.motherInformation)) ||
          (status === CurrentLivingStatus.Father && isFilled(parentInformation.fatherInformation)) ||
          (status === CurrentLivingStatus.Mother && isFilled(parentInformation.motherInformation)) ||
          (status === CurrentLivingStatus.Guardian && isFilled(parentInformation.guardianInformation))
        );
      }

      case 3: {
        const info = values?.previousSchoolInformation;
        const schoolsValid =
          Array.isArray(info?.formerSchool) &&
          info.formerSchool.length > 0 &&
          info.formerSchool.every((school) => !!school.name?.trim() && !!school.location?.trim());

        const referrer = info?.referrerContactDetails;
        const referrerValid =
          !!referrer?.name?.trim() &&
          !!referrer?.email?.trim() &&
          !!(referrer?.phoneNumber?.areaCode ?? "").trim() &&
          !!referrer?.phoneNumber?.number.trim();

        return schoolsValid && referrerValid;
      }

      case 4: {
        const info = values?.additionalInformation;
        if (!info) return false;

        const childProblemExists =
          "learningSupport" in (info.childProblem ?? {}) ||
          "learningSupportElaborate" in (info.childProblem ?? {}) ||
          "childBehavior" in (info.childProblem ?? {}) ||
          "childBehaviorElaborate" in (info.childProblem ?? {});

        const specialCareExists =
          "dietaryRequirement" in (info.specialCare ?? {}) || "physicalHealthLimit" in (info.specialCare ?? {});

        const serviceExists =
          "requireSchoolBusService" in (info.service ?? {}) ||
          "employerPaySchoolFees" in (info.service ?? {}) ||
          "employerInformation" in (info.service ?? {});

        const brotherSisterExists =
          "brotherSister" in (info.brotherSisterAttending ?? {}) || "detail" in (info.brotherSisterAttending ?? {});

        return childProblemExists || specialCareExists || serviceExists || brotherSisterExists;
      }

      case 5: {
        const studentDocuments = values?.requiredDocuments?.studentDocuments;
        const parentDocuments = values?.requiredDocuments?.parentDocuments;

        const result =
          studentDocuments &&
          Object.values(studentDocuments).every((arr) => Array.isArray(arr) && arr.length > 0) &&
          parentDocuments &&
          Object.values(parentDocuments).every((arr) => Array.isArray(arr) && arr.length > 0);

        return result;
      }

      case 6: {
        const health = values?.studentHealth;
        if (!health) return false;

        const studentInfo = health.studentInformation ?? {};
        const hasStudentInformation = studentInfo.bloodType !== undefined || !!studentInfo?.foodRestriction?.trim();

        const hasEmergencyContacts =
          Array.isArray(health.alternatePersonEmergency) &&
          health.alternatePersonEmergency.some(
            (contact) => !!contact.name.trim() && !!contact.relationShip.trim() && !!contact.mobileNumber.trim()
          );

        return hasStudentInformation && hasEmergencyContacts;
      }

      case 7: {
        // const { summary } = values;
        // return !!summary.consent;
        return false;
      }
      default:
        return false;
    }
  };

  const totalSteps = 7;
  const completedSteps = formData.reduce((count, step) => count + (hasData(step.id) ? 1 : 0), 0);
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="text-primary-400 hidden w-full max-w-64 flex-col items-start gap-4 font-mono md:flex">
      {formData.map((step, index) => (
        <div key={step.id} className="flex w-full items-center justify-between">
          <p
            className={cn(
              "hover:text-secondary max-w-52 cursor-pointer transition-colors",
              hasData(step.id) && "font-bold"
            )}
            onClick={() => goToStep(index)}
          >
            {`- ${step.title}`}
          </p>
          {hasData(step.id) && (
            <div className="relative size-8">
              <Image alt="completed" src="/progression-check.svg" className="object-cover" fill />
            </div>
          )}
        </div>
      ))}

      <div className="bg-primary-gray mt-12 h-3 w-full gap-2 rounded-full">
        <div className="bg-primary-400 h-3 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        <p className="font-bold">{progressPercentage.toFixed(0)}%</p>
      </div>
    </div>
  );
};

export default FormProgression;
