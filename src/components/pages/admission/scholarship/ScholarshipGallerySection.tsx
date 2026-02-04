"use client";

import { getMinSectionCardJsonLoop } from "@/client/utils/helper";
import GalleryCarousel from "@/components/carousel/gallery-carousel";
import ASBTitle from "@/components/custom/asb-title";
import { SectionCardJson } from "@/server/serializers/card-serializer";

interface ScholarshipGallerySectionProps {
  titleText: string;
  slides: SectionCardJson[];
}

const ScholarshipGallerySection = ({ titleText, slides }: ScholarshipGallerySectionProps) => {
  const galleryImages = getMinSectionCardJsonLoop({ cards: slides, minLoopCard: 7 });

  return (
    <div className="bg-[#F3F5F6] py-20 pb-15 lg:pb-20">
      <ASBTitle title={titleText} className="pb-14 lg:pb-20" />
      <GalleryCarousel slides={galleryImages} />
    </div>
  );
};

export default ScholarshipGallerySection;
