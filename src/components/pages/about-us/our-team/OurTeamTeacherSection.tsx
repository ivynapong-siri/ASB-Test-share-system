"use client";

import OurTeamTeacherCarousel from "@/components/carousel/our-team-teacher-carousel";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionProfileJson } from "@/server/serializers/profile-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";

interface OurTeamTeacherSectionProps {
  data: SectionJson;
  openModal: (items: SectionProfileJson[], index: number) => void;
}

const OurTeamTeacherSection = ({ openModal, data }: OurTeamTeacherSectionProps) => {
  return (
    <>
      <SectionContainer
        className="z-1 items-center py-10 md:py-20 lg:pb-0"
        vectorChildren={<div className="bg-primary absolute flex h-[310px] w-full lg:h-[500px]"></div>}
      >
        <ASBTitle title={data.title ?? ""} className="z-1 text-white" />
        <OurTeamTeacherCarousel
          slides={data.profiles ?? []}
          buttonName="teachers"
          sectionClassName="pt-10 pb-4 md:py-16 w-screen max-xl:hidden"
          openModal={openModal}
          requiredOffsetPaginate
          paginateClassName="xl:w-[min(100%,250px)]"
        />
      </SectionContainer>

      <OurTeamTeacherCarousel
        slides={data.profiles ?? []}
        buttonName="teachersMobile"
        sectionClassName="md:pt-0 pt-10 px-0 pb-4 md:pb-16 w-screen xl:hidden pl-10 pr-0"
        openModal={openModal}
        requiredOffsetPaginate
        paginateClassName="md:w-[min(100%,340px)] lg:w-[min(100%,365px)]"
      />
    </>
  );
};

export default OurTeamTeacherSection;
