"use client";

import {
  transformAdditionalRemarksToQA,
  transformBulletTuitionAndFeesToQA,
  transformPaymentMethodToQA,
  transformSiblingDiscountPoliciesToQA,
  transformSimpleTuitionAndFeesToQA,
  transformTableTuitionAndFeesToQA,
  transformTuitionAndFeesToQA,
} from "@/client/utils/helper";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { useNavbarContext } from "@/client/contexts/navbar-context";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { TuitionFees } from "@/server/models/model-types";
import { AdmissionPageJson } from "@/server/serializers/pages/admission-serializer";
import { useEffect } from "react";
import TuitionAndFeeTitleSection from "./TuitionAndFeeTitleSection";
import TuitionAndFeesSection from "./TuitionAndFeesSection";

interface TuitionAndFeesDetailsProps {
  data: AdmissionPageJson;
}

const TuitionAndFeesDetails = ({ data }: TuitionAndFeesDetailsProps) => {
  const { setIsWhite } = useNavbarContext();

  const {
    additionalRemarks,
    applicationFees,
    ellFees,
    paymentMethods,
    refundableDeposit,
    registrationFee,
    schoolDevelopmentFund,
    siblingDiscountPolicies,
    tuitionAndFees,
  } = data.tuitionAndFees;

  useEffect(() => {
    setIsWhite(true);
    return () => setIsWhite(false);
  }, []);

  const transformTuitionData: TuitionFees[] = [
    transformTuitionAndFeesToQA(tuitionAndFees, 1),
    transformSimpleTuitionAndFeesToQA(applicationFees, 2),
    transformSimpleTuitionAndFeesToQA(refundableDeposit, 3),
    registrationFee && transformTableTuitionAndFeesToQA(registrationFee, 4),
    schoolDevelopmentFund && transformTableTuitionAndFeesToQA(schoolDevelopmentFund, 5),
    transformBulletTuitionAndFeesToQA(ellFees, 6),
    siblingDiscountPolicies && transformSiblingDiscountPoliciesToQA(siblingDiscountPolicies, 7),
    transformAdditionalRemarksToQA(additionalRemarks, 8),
    transformPaymentMethodToQA(paymentMethods, 9),
  ].filter((item): item is TuitionFees => item !== null);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <TuitionAndFeeTitleSection data={data} />
      <TuitionAndFeesSection tuitionData={transformTuitionData} />
      <SimpleContentCarouselSection
        buttonName="tuition-and-fees"
        carouselName="tuitionAndFees"
        breakPoints={slideBottomCarouselBreakPoints}
        isProfile
        isBottomCarousel
        contentClassName="min-w-0"
      />
    </div>
  );
};

export default TuitionAndFeesDetails;
