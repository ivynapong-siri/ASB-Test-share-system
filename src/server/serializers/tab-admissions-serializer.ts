import { WordPressTabAdmissionsJson } from "../types/wordpress-type";

export type TabAdmissionJson = ReturnType<typeof serializeTabAdmission>;

export const serializeTabAdmissions = (data: WordPressTabAdmissionsJson[]) => {
  return data.map((tab) => serializeTabAdmission(tab));
};

export const serializeTabAdmission = (data: WordPressTabAdmissionsJson) => {
  return {
    id: data.ID,
    badge: data.acf_fields.badge,
    description: data.acf_fields.description,
    from: data.acf_fields.from,
    to: data.acf_fields.to,
    title: data.acf_fields.title,
  };
};
