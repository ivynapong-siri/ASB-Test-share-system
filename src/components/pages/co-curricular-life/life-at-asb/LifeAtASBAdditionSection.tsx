"use client";

import ASBDescription from "@/components/custom/asb-description";
import ASBTitle from "@/components/custom/asb-title";
import BlogCard from "@/components/custom/cards/blog-card";
import ModalFlatCard from "@/components/custom/modals/modal-flat-card";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import { useState } from "react";

interface AdditionalProgramsSectionProps {
  data: SectionJson;
}

const RenderBlogCards = ({ card, onClick }: { card: SectionCardJson; onClick: () => void }) => {
  return (
    <BlogCard
      key={`addition-program-${card.id}`}
      learnMoreHref={card.buttonUrl ?? ""}
      title={card.title}
      content={card.description}
      badgeOnImage={true}
      badgeOnImageText={card.badge}
      imgSrc={card.image?.imageUrl ?? ""}
      classNameCardBody="min-h-auto grow"
      classNameContent="grow"
      classNameTitle="text-[1.75rem]/[2rem]"
      classNameImg="max-md:max-h-[369px] aspect-[358/369]"
      buttonText={card.buttonLabel}
      onClick={onClick}
    />
  );
};

const LifeAtASBAdditionSection = ({ data }: AdditionalProgramsSectionProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <SectionContainer sectionClassName="bg-primary-gray" className="items-center">
        <ASBTitle title={data.title ?? ""} className="max-w-[900px] pb-8" />
        <ASBDescription description={data.description ?? ""} className="max-w-[580px] pb-14 text-center" />
        <div className="grid w-full max-w-7xl grid-cols-1 flex-col gap-5 lg:grid-cols-2 xl:grid-cols-3 xl:pb-12">
          {data.cards &&
            data.cards.map((data, index) => (
              <RenderBlogCards
                key={data.id}
                card={data}
                onClick={() => {
                  setActiveIndex(index);
                  handleOpenModal();
                }}
              />
            ))}
        </div>
      </SectionContainer>

      {isModalOpen && (
        <ModalFlatCard
          slides={data.cards ?? []}
          buttonName="additional-programs-modal"
          carouselName="additionalPrograms"
          otherLabel="Additional Programs"
          onClose={() => handleCloseModal()}
          currentIndex={activeIndex}
        />
      )}
    </>
  );
};

export default LifeAtASBAdditionSection;
