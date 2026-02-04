import { WordPressTabProfile } from "../types/wordpress-type";

export type SectionProfileJson = ReturnType<typeof serializeProfile>;

export const serializeProfiles = (data: WordPressTabProfile[]) => {
  return data.map((card) => serializeProfile(card));
};

export const serializeProfile = (data: WordPressTabProfile) => {
  return {
    id: data.ID,
    position: data.acf_fields.position,
    quote: data.acf_fields.quote,
    qualifications: data.acf_fields.qualifications,
    about: data.acf_fields.about,
    firstName: data.acf_fields.firstName,
    middleName: data.acf_fields.middleName,
    lastName: data.acf_fields.lastName,
    imageUrl: data.acf_fields.imageUrl || null,
    // imageMediumUrl: data.acf_fields.sizes.medium,
    // imageMediumLargeUrl: data.acf_fields.sizes.medium_large,
    profileType: data.acf_fields.profileType,
    badgeLabel: data.acf_fields.badgeLabel,
    experience: data.acf_fields.experience,
    quoteAuthor: data.acf_fields.quoteAuthor,
    nationality: data.acf_fields.nationality,
    nationalityFlagUrl: data.acf_fields.nationalityFlagUrl,
    buttonLabel: data.acf_fields.buttonLabel,
    buttonUrl: data.acf_fields.buttonUrl,
  };
};
