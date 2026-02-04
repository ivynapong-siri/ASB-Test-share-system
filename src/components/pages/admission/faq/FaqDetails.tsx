"use client";

import { contentCarouselPoints } from "@/client/configs/slide-carousel-config";
import { useNavbarContext } from "@/client/contexts/navbar-context";
import { FaqSection } from "@/components/shared/faq-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { AdmissionPageJson } from "@/server/serializers/pages/admission-serializer";
import { useEffect } from "react";

interface FaqDetailProps {
  data: AdmissionPageJson;
}

const FaqDetails = ({ data }: FaqDetailProps) => {
  const { ribbonText, faqs, breadcrumbs1, breadcrumbs2 } = data;

  const { setIsWhite } = useNavbarContext();

  useEffect(() => {
    setIsWhite(true);
    return () => setIsWhite(false);
  }, []);

  return (
    <div className="mt-52 flex flex-col overflow-x-hidden xl:mt-40">
      <FaqSection
        faqs={faqs ?? []}
        showBreadcrumb
        ribbonText={ribbonText}
        ribbonClassName="lg:ms-16"
        breadcrumbs1={breadcrumbs1}
        breadcrumbs2={breadcrumbs2}
        questionClassName="font-semibold md:text-[1.25rem]/[1.625rem] text-base/[1.5rem] text-primary-400"
      />
      <SimpleContentCarouselSection
        buttonName="faq"
        carouselName="faq"
        breakPoints={contentCarouselPoints}
        isProfile={true}
        contentClassName="min-w-0"
      />
    </div>
  );
};

export default FaqDetails;
