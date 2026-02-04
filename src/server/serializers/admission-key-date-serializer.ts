import { WordPressAdmissionKeyDateCardsJson, WordPressAdmissionKeyDateJson } from "../types/wordpress-type";

export type AdmissionKeyDateJson = ReturnType<typeof serializeAdmissionKeyDateSection>;
export type AdmissionKeyDateCardJson = ReturnType<typeof serializeAdmissionKeyDateData>;

export const serializeAdmissionGroup = (group: { admissions: WordPressAdmissionKeyDateCardsJson[] } | undefined) => {
  return group && group.admissions.length > 0 ? group.admissions.map(serializeAdmissionKeyDateData) : null;
};

export const serializeAdmissionKeyDateData = (data: WordPressAdmissionKeyDateCardsJson) => {
  return {
    id: data.acf_fields.id,
    title: data.acf_fields.title,
    grade: data.acf_fields.grade,
    badge: data.acf_fields.badge,
    description: data.acf_fields.description,
    from: data.acf_fields.from,
    to: data.acf_fields.to,
  };
};

export const serializeAdmissionKeyDateSection = (data: WordPressAdmissionKeyDateJson) => {
  return {
    earlyYears: { title: data.early_years.title, contents: serializeAdmissionGroup(data.early_years) },
    elementary: { title: data.elementary.title, contents: serializeAdmissionGroup(data.elementary) },
    middleSchool: { title: data.middle_school.title, contents: serializeAdmissionGroup(data.middle_school) },
    highSchool: { title: data.high_school.title, contents: serializeAdmissionGroup(data.high_school) },
  };
};
