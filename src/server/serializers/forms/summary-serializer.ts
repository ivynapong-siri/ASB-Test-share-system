import { SummaryDetail } from "@/server/models/model-types";

export function serializeSummary(data: SummaryDetail) {
  return {
    consent: data.consent,
  };
}
