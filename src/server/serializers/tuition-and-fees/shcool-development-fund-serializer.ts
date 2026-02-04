import { WordPressSchoolDevelopmentFundJson } from "@/server/types/wordpress-type";
import { serializeTuitionAndFeesTableRow } from "./registration-fee-serializer";

export type SimpleSchoolDevelopmentFundJson = ReturnType<typeof serializeSchoolDevelopmentFund>;

export const serializeSchoolDevelopmentFund = (data: WordPressSchoolDevelopmentFundJson) => {
  return {
    title: data.title,
    description: data.description,
    table: {
      tableLabel: data.table.table_label,
      header: {
        tableHeader1: data.table.header.header_1,
        tableHeader2: data.table.header.header_2,
      },
      row: {
        row1: data.table.row_1 && serializeTuitionAndFeesTableRow(data.table.row_1),
        row2: data.table.row_2 && serializeTuitionAndFeesTableRow(data.table.row_2),
        row3: data.table.row_3 && serializeTuitionAndFeesTableRow(data.table.row_3),
        row4: data.table.row_4 && serializeTuitionAndFeesTableRow(data.table.row_4),
      },
    },
  };
};
