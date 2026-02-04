"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { OurCommunityPageJson } from "@/server/serializers/pages/our-community-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import WorkWithUsAvailablePositionsSection from "./WorkWithUsAvailablePositionsSection";
import WorkWithUsIntroSection from "./WorkWithUsIntroSection";
import WorkWithUsOurValueSection from "./WorkWithUsOurValueSection";
import WorkWithUsPerksSection from "./WorkWithUsPerksSection";
import WorkWithUsTitleSection from "./WorkWithUsTitleSection";

interface WorkWithUsDetailProps {
  data: OurCommunityPageJson;
}

export default function WorkWithUsDetail({ data }: WorkWithUsDetailProps) {
  const { sections, navBox1 } = data;

  const [introSection, ourValueSection, perksSection, availablePositionSection] = sections as [
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
  ];

  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <WorkWithUsTitleSection data={data} />
      <WorkWithUsIntroSection data={introSection} breadcrumbData={breadcrumbData} />
      <WorkWithUsOurValueSection data={ourValueSection} />
      <WorkWithUsPerksSection data={perksSection} />
      <WorkWithUsAvailablePositionsSection data={availablePositionSection} navBox={navBox1} />
      <SimpleContentCarouselSection
        buttonName="work-with-us"
        carouselName="workWithUs"
        breakPoints={slideBottomCarouselBreakPoints}
        isProfile
        isBottomCarousel
        contentClassName="min-w-0"
      />
    </div>
  );
}
