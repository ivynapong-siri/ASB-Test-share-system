"use client";

import { slidePrincipalBreakPoints } from "@/client/configs/slide-carousel-config";
import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import HoverCard from "@/components/custom/cards/hover-card";
import { SectionContainer } from "@/components/custom/section-container";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { cn } from "@/lib/utils";
import { SectionProfileJson } from "@/server/serializers/profile-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface ProgramTeachersSectionProps {
  data: SectionJson;
  openModal: (items: any[], index: number) => void;
  asbTitleClassName?: string;
  headerContainerClassName?: string;
}

const RenderCards = ({
  profiles,
  openModal,
}: {
  profiles: SectionProfileJson[];
  openModal: (items: SectionProfileJson[], index: number) => void;
}) => {
  return (
    <>
      {profiles.map((profile, index) => (
        <div key={index}>
          <HoverCard
            key={`${profile.id}-${profile.firstName}-${profile.lastName}`}
            title={`${profile.firstName} ${profile.lastName}`}
            backgroundContent={
              <Image
                alt=""
                src={profile.imageUrl ?? ""}
                fill
                className="object-cover transition-all duration-300 ease-out group-hover:scale-120"
                priority
              />
            }
            personPosition={profile.position}
            badgeLabel={profile.badgeLabel}
            linkClassName="bg-white text-primary-400 pointer-events-auto hover:text-white"
            iconClassName="text-secondary border-primary-400 group-hover/button:text-white group-hover/button:border-white"
            isHover={false}
            isProfile={true}
            buttonLabel={profile.buttonLabel}
            buttonLink={profile.buttonUrl}
            contentClassName="min-w-0"
            className="rounded-[50px]"
            requiredHiddenStrip={false}
            {...(openModal && { buttonAction: () => openModal(profiles, index) })}
          />
        </div>
      ))}
    </>
  );
};

export default function ProgramTeachersSection({
  data,
  openModal,
  asbTitleClassName,
  headerContainerClassName,
}: ProgramTeachersSectionProps) {
  return (
    <div className="bg-primary-gray flex w-full flex-col lg:pb-20">
      <SectionContainer sectionClassName="bg-primary-gray" className="max-sm:pb-0">
        <ASBRibbonText title={data.ribbonText ?? ""} />
        <div
          className={cn("flex w-full flex-col gap-8 max-md:max-w-90 md:flex-row xl:gap-55", headerContainerClassName)}
        >
          <ASBTitle
            title={data.title ?? ""}
            className={cn("flex-shrink-0 text-start md:w-[320px] lg:w-[400px]", asbTitleClassName)}
          />
          <ASBDescription description={data.description ?? ""} />
        </div>
        <div className="grid grid-cols-2 gap-4 pt-15 max-sm:hidden xl:grid-cols-4 xl:pt-30 2xl:pt-36">
          {data.profiles && <RenderCards profiles={data.profiles} openModal={openModal} />}
        </div>
      </SectionContainer>
      <div className="flex w-full min-w-screen sm:hidden">
        <SimpleContentCarouselSection
          slides={data.profiles ?? []}
          buttonName="teacher-school-principals"
          carouselName="teacherSchoolPrincipals"
          breakPoints={slidePrincipalBreakPoints}
          sectionClassName="w-screen px-0"
          isConvertPagination
          isProfile={true}
          openModal={openModal}
        />
      </div>
    </div>
  );
}
