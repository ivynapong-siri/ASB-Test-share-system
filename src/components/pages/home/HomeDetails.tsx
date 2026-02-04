"use client";

import { SectionJson, SectionWithTabJson } from "@/server/serializers/section-serializer";

import { ASBVector } from "@/components/icons";
import HomeASBStorySection from "./HomeASBStorySection";
import { HomeJson } from "@/server/serializers/pages/home-serializer";
import HomeTitleSection from "./HomeTitleSection";
import LazySection from "@/components/shared/lazy-section";
import { SectionIconJson } from "@/server/serializers/icon-serializer";
import dynamic from "next/dynamic";

// Dynamically import below-fold sections to reduce initial bundle size
const HomeInnovativeSection = dynamic(() => import("./HomeInnovativeSection"), {
  loading: () => <div className="min-h-[500px] animate-pulse bg-gray-50" />,
  ssr: false,
});

const HomeEducationNetworkSection = dynamic(() => import("./HomeEducationNetworkSection"), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-gray-50" />,
  ssr: false,
});

const HomeHeadOfSchoolSection = dynamic(() => import("./HomeHeadOfSchoolSection"), {
  loading: () => <div className="min-h-[700px] animate-pulse bg-gray-50" />,
  ssr: false,
});

const HomeLifeAtXCLSection = dynamic(() => import("./HomeLifeAtXCLSection"), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-gray-50" />,
  ssr: false,
});

const HomeTestimonialSection = dynamic(() => import("./HomeTestimonialSection"), {
  loading: () => <div className="min-h-[500px] animate-pulse bg-gray-50" />,
  ssr: false,
});

const HomeFacilitiesSection = dynamic(() => import("./HomeFacilitiesSection"), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-gray-50" />,
  ssr: false,
});

const HomeXCLASBInActionSection = dynamic(() => import("./HomeXCLASBInActionSection"), {
  loading: () => <div className="min-h-[700px] animate-pulse bg-gray-50" />,
  ssr: false,
});

const MarkYourCalendarSection = dynamic(() => import("@/components/shared/mark-your-calendar-section"), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-gray-50" />,
  ssr: false,
});

const HomeRecognizeSection = dynamic(() => import("./HomeRecognizeSection"), {
  loading: () => <div className="min-h-[500px] animate-pulse bg-gray-50" />,
  ssr: false,
});

interface HomeDetailsProps {
  homeData: HomeJson;
  iconData: SectionIconJson[];
}

const HomeDetails = ({ homeData, iconData }: HomeDetailsProps) => {
  const { section } = homeData;
  const [
    asbSection,
    innovationSection,
    educationNetworkSection,
    headOfSchoolSection,
    lifeAtXCLSection,
    testimonialSection,
    facilitiesSection,
    xclASBInActionSection,
    markYourCalendarSection,
    recognizeSection,
  ] = section as [
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
    SectionWithTabJson,
    SectionJson,
    SectionJson,
    SectionWithTabJson,
    SectionJson,
  ];

  return (
    <div className="flex flex-col overflow-x-hidden">
      <HomeTitleSection titleData={homeData} />
      <HomeASBStorySection asbStoryData={asbSection} />

      {/* Lazy load below-the-fold sections with accurate min heights */}
      <LazySection minHeight="500px">
        <HomeInnovativeSection innovativeData={innovationSection} />
      </LazySection>

      <LazySection minHeight="600px">
        <HomeEducationNetworkSection educationNetworkData={educationNetworkSection} />
      </LazySection>

      <LazySection minHeight="700px">
        <HomeHeadOfSchoolSection headOfSchool={headOfSchoolSection} />
      </LazySection>

      <LazySection minHeight="600px">
        <HomeLifeAtXCLSection lifeAtXCL={lifeAtXCLSection} />
      </LazySection>

      <LazySection minHeight="500px">
        <HomeTestimonialSection testimonialData={testimonialSection} />
      </LazySection>

      <LazySection minHeight="600px">
        <HomeFacilitiesSection facilitiesData={facilitiesSection} />
      </LazySection>

      <LazySection minHeight="700px">
        <HomeXCLASBInActionSection xclASBInActionData={xclASBInActionSection} />
      </LazySection>

      <LazySection minHeight="600px">
        <MarkYourCalendarSection
          data={markYourCalendarSection}
          customMinusTopOffset={0}
          vectorChildren={
            <div className="absolute -bottom-10 z-20 h-10 w-full max-md:-bottom-5 sm:h-20">
              <ASBVector
                fill="#B81E29"
                className="absolute right-4 h-full sm:top-7.5 md:top-1/8 md:right-8 lg:top-0 xl:right-12"
              />
              <div className="bg-secondary-200 absolute top-15 left-0 h-1/2 w-[65%] -translate-y-10 sm:top-25 sm:h-1/3 sm:w-[70%] md:top-20 md:w-[75%] lg:top-20 lg:h-1/2 lg:w-[75%] 2xl:w-[80%]" />
            </div>
          }
        />
      </LazySection>

      <LazySection minHeight="500px">
        <HomeRecognizeSection recognizeData={recognizeSection} iconData={iconData} />
      </LazySection>
    </div>
  );
};

export default HomeDetails;
