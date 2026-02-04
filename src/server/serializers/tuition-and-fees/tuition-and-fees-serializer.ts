import { WordPressTuitionFeesJson } from "../../types/wordpress-type";

export type TuitionAndFeesJson = ReturnType<typeof serializeTuitionAndFees>;

const mapGradeGroup = (group: { name: string; semester: string; annual: string }) => ({
  name: group.name,
  semester: group.semester,
  annual: group.annual,
});

export const serializeTuitionAndFees = (data: WordPressTuitionFeesJson) => {
  const { acf_fields: acf } = data;

  return {
    title: acf.title,
    subtitle: acf.subtitle,
    description: acf.description,
    table: {
      earlyYears: {
        division: acf.early_years.division,
        gradeGroup1: mapGradeGroup({
          name: acf.early_years.grade_group_1,
          semester: acf.early_years.grade_group_1_semester,
          annual: acf.early_years.grade_group_1_annual,
        }),
        gradeGroup2: mapGradeGroup({
          name: acf.early_years.grade_group_2,
          semester: acf.early_years.grade_group_2_semester,
          annual: acf.early_years.grade_group_2_annual,
        }),
        gradeGroup3: mapGradeGroup({
          name: acf.early_years.grade_group_3,
          semester: acf.early_years.grade_group_3_semester,
          annual: acf.early_years.grade_group_3_annual,
        }),
        gradeGroup4: mapGradeGroup({
          name: acf.early_years.grade_group_4,
          semester: acf.early_years.grade_group_4_semester,
          annual: acf.early_years.grade_group_4_annual,
        }),
      },
      currencyLabel: acf.currency_label,
      elementary: {
        division: acf.elementary.division,
        gradeGroup1: mapGradeGroup({
          name: acf.elementary.grade_group_1,
          semester: acf.elementary.grade_group_1_semester,
          annual: acf.elementary.grade_group_1_annual,
        }),
      },
      middleSchool: {
        division: acf.middle_school.division,
        gradeGroup1: mapGradeGroup({
          name: acf.middle_school.grade_group_1,
          semester: acf.middle_school.grade_group_1_semester,
          annual: acf.middle_school.grade_group_1_annual,
        }),
      },
      highSchool: {
        division: acf.high_school.division,
        gradeGroup1: mapGradeGroup({
          name: acf.high_school.grade_group_1,
          semester: acf.high_school.grade_group_1_semester,
          annual: acf.high_school.grade_group_1_annual,
        }),
      },
      tableSettings: {
        pages: {
          admissionAndProcess: {
            tableHeader1: acf.table_settings.pages.admission_and_process.table_header_1,
            tableHeader2: acf.table_settings.pages.admission_and_process.table_header_2,
            tableHeader3: acf.table_settings.pages.admission_and_process.table_header_3,
          },
          tuitionAndFees: {
            tableHeader1: acf.table_settings.pages.tuition_and_fees.table_header_1,
            tableHeader2: acf.table_settings.pages.tuition_and_fees.table_header_2,
            tableHeader3: acf.table_settings.pages.tuition_and_fees.table_header_3,
            tableHeader4: acf.table_settings.pages.tuition_and_fees.table_header_4,
          },
        },
      },
    },
  };
};
