import { WordPressAdditionalRemarksJson } from "@/server/types/wordpress-type";
import { serializeSimpleTuitionAndFees } from "./simple-tuition-and-fees-serializer";

export type AdditionalRemarkJson = ReturnType<typeof serializeAdditionalRemark>;

export const serializeAdditionalRemark = (data: WordPressAdditionalRemarksJson) => {
  return {
    title: data.additional_remarks.title,
    additionalRemark: data.additional_remarks && serializeSimpleTuitionAndFees(data.additional_remarks),
    learningSupportFees: data.learning_support_fees && serializeSimpleTuitionAndFees(data.learning_support_fees),
    schoolFeeRefundPolicy:
      data.school_fee_refund_policy && serializeSimpleTuitionAndFees(data.school_fee_refund_policy),
  };
};
