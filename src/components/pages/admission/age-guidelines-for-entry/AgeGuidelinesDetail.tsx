"use client";

import { transformAgeGuidelinesFromACF, transformAgeGuidelinesToAppFees } from "@/client/utils/helper";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { useNavbarContext } from "@/client/contexts/navbar-context";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { TuitionFees } from "@/server/models/model-types";
import { AdmissionPageJson } from "@/server/serializers/pages/admission-serializer";
import { useEffect } from "react";
import AgeGuidelinesTableSection from "./AgeGuidelinesTableSection";
import AgeGuidelinesTitleSection from "./AgeGuidelinesTitleSection";

interface AgeGuidelinesDetailProps {
  data: AdmissionPageJson;
}

const AgeGuidelinesDetail = ({ data }: AgeGuidelinesDetailProps) => {
  const { setIsWhite } = useNavbarContext();

  useEffect(() => {
    setIsWhite(true);
    return () => setIsWhite(false);
  }, []);

  const transformTuitionData: TuitionFees[] = [
    data.ageGuidelinesTable &&
      transformAgeGuidelinesFromACF({
        acfData: data.ageGuidelinesTable ?? [],
        fallbackId: 1,
        title: data.ageGuidelinesTitle ?? "",
      }),
    data.appFeesTable &&
      transformAgeGuidelinesToAppFees({
        acfData: data.appFeesTable ?? [],
        fallbackId: 2,
        title: data.applicationFeeslinesTitle ?? "",
      }),
  ].filter((item): item is TuitionFees => item !== null);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <AgeGuidelinesTitleSection data={data} />

      <LazySection>
        <AgeGuidelinesTableSection data={transformTuitionData} />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="age-guidelines"
          carouselName="ageGuidelines"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};

export default AgeGuidelinesDetail;
