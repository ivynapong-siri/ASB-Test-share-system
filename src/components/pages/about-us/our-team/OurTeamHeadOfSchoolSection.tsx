"use client";

import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import { slidePrincipalBreakPoints } from "@/client/configs/slide-carousel-config";
import OurTeamTeacherCarousel from "@/components/carousel/our-team-teacher-carousel";
import ASBTitle from "@/components/custom/asb-title";
import HoverCard from "@/components/custom/cards/hover-card";
import { SectionContainer } from "@/components/custom/section-container";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { SectionProfileJson } from "@/server/serializers/profile-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";

interface OurTeamHeadOfSchoolSectionProps {
  headOfSchoolData: SectionJson;
  principalData: SectionJson;
  headOfDivisionData: SectionJson;
  openModal: (items: any[], index: number) => void;
}

const RenderPrincipal = ({
  data,
  openModal,
}: {
  data: SectionProfileJson[];
  openModal?: (items: SectionProfileJson[], index: number) => void;
}) => {
  return data.map((e, index) => (
    <HoverCard
      key={e.id}
      title={`${e?.firstName} ${e?.middleName ?? ""} ${e?.lastName}`}
      personPosition={e.position}
      badgeLabel={e.badgeLabel}
      buttonLabel={e.buttonLabel}
      buttonLink={e.buttonUrl}
      linkClassName="bg-white text-primary-400 pointer-events-auto hover:text-white"
      iconClassName="text-secondary border-primary-400 group-hover/button:text-white group-hover/button:border-white"
      backgroundContent={
        <Image
          alt={`Profile-${e?.firstName}-${e?.id}`}
          src={e?.imageUrl || "/mock-image.jpg"}
          fill
          priority
          className="rounded-4xl object-cover transition-all duration-300 ease-out group-hover:scale-120"
        />
      }
      contentClassName="gap-4"
      isHover={false}
      isProfile={true}
      className="rounded-4xl"
      requiredHiddenStrip={false}
      {...(openModal && { buttonAction: () => openModal(data, index) })}
    />
  ));
};

const OurTeamHeadOfSchoolSection = ({
  openModal,
  headOfSchoolData,
  principalData,
  headOfDivisionData,
}: OurTeamHeadOfSchoolSectionProps) => {
  const headOfSchoolProfile = headOfSchoolData.profiles?.[0];

  return (
    <>
      <SectionContainer
        className="items-center px-9 max-md:pb-0 md:px-10"
        sectionClassName="bg-[#F3F5F6] lg:bg-gradient-to-b lg:from-[#FFFFFF] lg:to-[#F3F5F6]"
        vectorChildren={
          <>
            <div className="absolute top-0 flex h-[500px] w-full bg-white"></div>

            <PatternStroke1 className="absolute top-24 -right-14 h-[132px] w-[180px] md:top-0 md:-right-0 md:h-[265px] md:w-[360px]" />
            <PatternStroke2 className="absolute top-5 -left-20 h-[132px] w-[180px] md:h-[265px] md:w-[360px] lg:top-64" />
          </>
        }
      >
        <ASBTitle title={headOfSchoolData.title ?? "Head of School"} className="z-10" />
        <div className="flex pt-8 pb-16 md:pb-32">
          <HoverCard
            title={`${headOfSchoolProfile?.firstName} ${headOfSchoolProfile?.middleName} ${headOfSchoolProfile?.lastName}`}
            badgeLabel={headOfSchoolProfile?.badgeLabel}
            buttonLabel={headOfSchoolProfile?.buttonLabel}
            buttonLink={headOfSchoolProfile?.buttonUrl}
            personPosition={headOfSchoolProfile?.position}
            linkClassName="bg-white text-primary-400 pointer-events-auto hover:text-white"
            iconClassName="text-secondary border-primary-400 group-hover/button:text-white group-hover/button:border-white"
            backgroundContent={
              <Image
                alt={`Profile-${headOfSchoolProfile?.firstName}-${headOfSchoolProfile?.id}`}
                src={headOfSchoolProfile?.imageUrl ?? "/mock-image.jpg"}
                fill
                priority
                className="object-cover transition-all duration-300 ease-out group-hover:scale-120"
              />
            }
            isHover={false}
            isProfile={true}
            requiredHiddenStrip={false}
            contentClassName="gap-4"
            className="w-full max-md:max-w-[360px] md:h-[570px] md:w-[360px]"
            buttonAction={() => openModal([headOfSchoolProfile], 0)}
          />
        </div>

        <ASBTitle title={principalData.title ?? ""} as="h3" />
        <div className="hidden flex-row gap-5 pt-16 pb-32 lg:flex">
          <RenderPrincipal data={principalData.profiles ?? []} openModal={openModal} />
        </div>

        <div className="flex flex-col items-center max-xl:hidden">
          <ASBTitle title={headOfDivisionData.title ?? ""} className="max-w-5xl" as="h4" />
          <OurTeamTeacherCarousel
            slides={headOfDivisionData.profiles ?? []}
            buttonName="head-of-division-and-administration"
            sectionClassName="w-screen px-10 md:pr-0 lg:pr-0 xl:pr-10"
            openModal={openModal}
          />
        </div>
      </SectionContainer>

      <div className="flex flex-col items-center bg-[#F3F5F6] xl:hidden">
        {/* School principle mobile */}
        <div className="flex w-screen pb-0 lg:hidden">
          <SimpleContentCarouselSection
            slides={principalData.profiles ?? []}
            buttonName="principals"
            carouselName="principals"
            breakPoints={slidePrincipalBreakPoints}
            sectionClassName="py-16 md:pt-0 px-0 w-screen"
            isConvertPagination
            isProfile={true}
            openModal={openModal}
            hoverCardImageClassName="rounded-4xl"
            cardClassName="rounded-4xl"
            requirePadding
            useIsLabTopOffset
          />
        </div>

        {/* Head of division mobile */}
        <ASBTitle title={headOfDivisionData.title ?? ""} className="max-lg:max-w-lg" as="h4" />
        <OurTeamTeacherCarousel
          slides={headOfDivisionData.profiles ?? []}
          buttonName="head-of-division-and-administration-mobile"
          sectionClassName="py-16 w-screen pl-10 pr-0"
          openModal={openModal}
        />
      </div>
    </>
  );
};

export default OurTeamHeadOfSchoolSection;
