"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import EnrollmentServiceSection from "@/components/shared/enrollment-service-section";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { AdmissionPageJson } from "@/server/serializers/pages/admission-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import ScholarshipApplyCardSection from "./ScholarshipApplyCardSection";
import ScholarshipGallerySection from "./ScholarshipGallerySection";
import ScholarshipIntroSection from "./ScholarshipIntroSection";
import ScholarshipOpportunitiesSection from "./ScholarshipOpportunitiesSection";
import ScholarshipTimelineSection from "./ScholarshipTimelineSection";
import ScholarshipTitleSection from "./ScholarshipTitleSection";
import ScholarshipVoiceOfXCLSection from "./ScholarshipVoiceOfXCLSection";

// Keep above-the-fold components as regular imports

interface ScholarshipProps {
  data: AdmissionPageJson;
}

const ScholarshipDetail = ({ data }: ScholarshipProps) => {
  const { sections, navBox1 } = data;
  const [
    ,
    ,
    whyASBSukhumvitSection,
    milestonesSection,
    categoriesSection,
    voicesSection,
    gallerySection,
    futureSection,
  ] = sections as [any, any, SectionJson, SectionJson, SectionJson, SectionJson, SectionJson, SectionJson];

  const contactBanner = {
    description: [navBox1?.title ?? "", navBox1?.subtitle ?? ""],
    buttonText: navBox1?.buttonLabel ?? "",
    buttonHref: navBox1?.buttonUrl ?? "",
  };

  const categoriesCards =
    categoriesSection?.cards?.map((card: SectionCardJson) => ({
      titleText: card.title,
      grade: card.badge,
      lists: card.description,
    })) ?? [];

  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: whyASBSukhumvitSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ScholarshipTitleSection data={data} />
      <ScholarshipIntroSection whyASBSukhumvitSectionData={whyASBSukhumvitSection} breadcrumbData={breadcrumbData} />
      <ScholarshipTimelineSection mineStonesSectionData={milestonesSection} />

      <LazySection>
        <ScholarshipOpportunitiesSection
          categoriesSectionData={categoriesSection}
          categoriesCards={categoriesCards}
          contactBanner={contactBanner}
        />
      </LazySection>

      <LazySection>
        <ScholarshipVoiceOfXCLSection data={voicesSection} />
      </LazySection>

      <LazySection>
        <ScholarshipGallerySection titleText={gallerySection?.title ?? ""} slides={gallerySection.cards ?? []} />
      </LazySection>

      <LazySection>
        <ScholarshipApplyCardSection futureSectionData={futureSection} />
      </LazySection>

      <LazySection>
        <EnrollmentServiceSection />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="scholarship"
          carouselName="scholarship"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};

export default ScholarshipDetail;
