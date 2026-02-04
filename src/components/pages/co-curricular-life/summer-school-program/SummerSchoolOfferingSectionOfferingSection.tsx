"use client";

import { useEffect, useRef, useState } from "react";

import ActiveCarousel from "@/components/carousel/active-carousel";
import ASBDescription from "@/components/custom/asb-description";
import ASBTitle from "@/components/custom/asb-title";
import ModalFlatCard from "@/components/custom/modals/modal-flat-card";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";

type SummerSchoolOfferingSectionProps = {
  data: SectionJson;
};

const SummerSchoolOfferingSection = ({ data }: SummerSchoolOfferingSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionMarginLeft, setSectionMarginLeft] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setSectionMarginLeft(rect.left + 40);
    }
  }, []);

  useEffect(() => {
    const update = () => {
      if (sectionRef.current) {
        setSectionMarginLeft(sectionRef.current.getBoundingClientRect().left + 40);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <SectionContainer
        ref={sectionRef}
        sectionClassName="bg-primary-gray"
        className="gap-20 pt-12 max-md:pb-8 lg:py-40 lg:pb-16"
      >
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-20">
          <ASBTitle title={data.title ?? ""} className="w-full text-start xl:max-w-2xl" />
          <ASBDescription description={data.description ?? ""} />
        </div>
      </SectionContainer>

      <div className="bg-primary-gray relative flex w-full max-w-screen pb-8 lg:pb-20">
        <ActiveCarousel
          curveColor="#F3F5F6"
          wrapperClass="md:items-start"
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          slides={data.cards ?? []}
          inActiveSlideTextClassName="max-w-[222px] mb-8 bottom-0 px-0 mx-4"
          useSubtitle
          modalPopup={
            <ModalFlatCard
              slides={data.cards ?? []}
              buttonName="summer-school-offering-modal"
              carouselName="SummerSchoolOfferingModal"
              otherLabel="Other Summer School Program"
              onClose={() => handleCloseModal()}
              currentIndex={activeIndex}
            />
          }
          requiredInactiveBottomCard={false}
          onClick={() => handleOpenModal()}
          isModalOpen={isModalOpen}
          paddingLeft={sectionMarginLeft}
          whiteBoxPosition="bg-[#F3F5F6]"
          cardPosition="max-lg:items-end"
        />
      </div>
    </>
  );
};

export default SummerSchoolOfferingSection;
