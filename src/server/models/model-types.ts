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

export type PageProps = Promise<{ locale: string }>;

export type BreadcrumbProps = { breadcrumb1?: string; breadcrumb2?: string; breadcrumb3?: string };

export type AdmissionDetail = {
  studentInformation: StudentInformationDetail;
  parentInformation: ParentInformationDetail;
  previousSchoolInformation: PreviousSchoolInformationDetail;
  additionalInformation: AdditionalInformationDetail;
  requiredDocuments: RequiredDocumentsDetail;
  studentHealth: StudentHealthDetail;
  summary: SummaryDetail;
};

export type StudentInformationDetail = {
  name: Name;
  personalInformation: PersonalInformation;
  academicInformation: AcademicInformation;
  languageProficiency: LanguageProficiency;
  studentPermanentMailingAddress: StudentPermanentMailingAddress;
};

export type ParentInformationDetail = {
  currentLivingStatus: CurrentLivingStatus;
  fatherInformation?: ParentDetail;
  motherInformation?: ParentDetail;
  guardianInformation?: ParentDetail;
};

export type PreviousSchoolInformationDetail = {
  formerSchool: FormerSchool[];
  referrerContactDetails: ReferrerContactDetails;
};

export type AdditionalInformationDetail = {
  childProblem: ChildProblem;
  specialCare: SpecialCare;
  service: Service;
  brotherSisterAttending: BrotherSisterAttending;
  asbPlusResidentialProgram: ASBPlusResidentialProgram;
};

export type ASBPlusResidentialProgram = {
  interestBoardingProgram: boolean;
  optionInterest: boolean;
  phoneNumber: PhoneNumber;
  signature: string;
  dateOfApplication: Date;
};

export type RequiredDocumentsDetail = {
  studentDocuments: StudentDocuments;
  parentDocuments: ParentDocuments;
};

export type StudentHealthDetail = {
  studentInformation: StudentInformation;
  alternatePersonEmergency: Contract[];
};

export type SummaryDetail = {
  consent: boolean;
};

export type Name = {
  firstName: string;
  middleName?: string;
  lastName: string;
  nickName?: string;
};

export type PhoneNumber = {
  areaCode: string;
  number: string;
};

export type PersonalInformation = {
  gender: Gender;
  dateOfBirth: Date;
  age: number;
  nationality: Nationality;
  religion: string;
  emergencyPhoneNumber: PhoneNumber;
  idNumber: string;
  dateOfIssue: Date;
  expiryDate: Date;
};

export type AcademicInformation = {
  startDate: Date;
  incomingGrade: IncomingGrade;
  applyForAcademicYear: ApplyForAcademicYear;
  intakeTerm: IntakeTerm;
};

export type LanguageProficiency = {
  firstLanguage: StudentSpokenLanguage;
  mainLanguage: StudentSpokenLanguage;
  secondAndThirdLanguage: StudentSpokenLanguage;
  englishProficiency: StudentEnglishProficiency;
};

export type StudentPermanentMailingAddress = {
  name: string;
  address: string;
  country: string;
  postalCode: number;
  phoneNumber: PhoneNumber;
};

export type CurrentLivingStatusField = {
  currentLivingStatus: CurrentLivingStatus;
};

export type PersonalInformationParent = {
  nationality: Nationality;
  idNumber: string;
  dateOfIssue: Date;
};

export type ContactInformation = {
  phoneAreaCode: string;
  phoneNumber: PhoneNumber;
  officePhoneAreaCode: string;
  officePhoneNumber: PhoneNumber;
  email: string;
};

export type ProfessionalInformation = {
  companyName: string;
  position: string;
  companyAddress: string;
  country: string;
  postalCode: number;
};

export type ParentDetail = {
  name: Name;
  personalInformation: PersonalInformationParent;
  contactInformation: ContactInformation;
  professionalInformation: ProfessionalInformation;
};

export type FormerSchool = {
  name: string;
  yearOfStudy?: number;
  location: string;
};

export type ReferrerContactDetails = {
  name: string;
  email: string;
  phoneAreaCode: string;
  phoneNumber: PhoneNumber;
};

export type ChildProblem = {
  learningSupport: boolean;
  learningSupportElaborate?: string;
  childBehavior: boolean;
  childBehaviorElaborate?: string;
};

export type SpecialCare = {
  physicalHealthLimit?: string;
  dietaryRequirement?: string;
};

export type Service = {
  requireSchoolBusService: boolean;
  employerPaySchoolFees: boolean;
  employerInformation?: string;
};

export type AttendingXCL = {
  name: string;
  grade?: number;
};

export type BrotherSisterAttending = {
  brotherSister: boolean;
  detail?: AttendingXCL[];
};

export type Media = {
  id: string;
  contentType: string;
  fileName: string;
  filePath: string;
};

export type StudentDocuments = {
  studentPhoto: Media[];
  thaiBirthCertificate?: Media[];
  nonImmigrantVisa?: Media[];
  thaiResidence: Media[];
  previousSchoolRecords: Media[];
  specialAcademic: Media[];
  recommendationForm: Media[];
};

export type ParentDocuments = {
  fatherPhoto: Media[];
  motherPhoto: Media[];
  guardianPhoto?: Media[];
  copyOfEachParentId: Media[];
};

export type StudentInformation = {
  bloodType: BloodType;
  foodRestriction?: string;
};

export type Contract = {
  name: string;
  relationShip: string;
  mobileNumber: string;
};

export type Country = {
  name: string;
  code: string;
};

export type TuitionFees = {
  id: number;
  question: string;
  requireHeader?: boolean;
  requireMiddleTable?: boolean;
} & (
  | {
      type?: "string";
      answer: string;
    }
  | {
      type: "table";
      answer: {
        header?: string;
        description?: string;
        mergeKey?: string;
        data: Record<string, string>[];
      };
    }
  | {
      type: "bullet";
      answer: {
        header?: string;
        description?: string;
        sections: {
          title?: string;
          description?: string;
          data: string[];
        }[];
      };
    }
);
