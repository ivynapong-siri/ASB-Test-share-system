"use client";

import { useEffect, useState } from "react";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { useNavbarContext } from "@/client/contexts/navbar-context";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { AdmissionPageJson } from "@/server/serializers/pages/admission-serializer";
import AdmissionKeyDatesCards from "./AdmissionKeyDatesCards";
import AdmissionKeyDatesTitleSection from "./AdmissionKeyDatesTitleSection";

interface AdmissionKeyDatesDetailsProps {
  data: AdmissionPageJson;
}

const AdmissionKeyDatesDetails = ({ data }: AdmissionKeyDatesDetailsProps) => {
  const { setIsWhite } = useNavbarContext();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsWhite(true);
    return () => setIsWhite(false);
  }, []);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <AdmissionKeyDatesTitleSection data={data} onSearch={setSearch} />
      <AdmissionKeyDatesCards data={data.admissionKeyDate} search={search} />
      <SimpleContentCarouselSection
        buttonName="admission-key-dates"
        carouselName="admissionKeyDates"
        breakPoints={slideBottomCarouselBreakPoints}
        isProfile
        isBottomCarousel
        contentClassName="min-w-0"
      />
    </div>
  );
};

export default AdmissionKeyDatesDetails;
