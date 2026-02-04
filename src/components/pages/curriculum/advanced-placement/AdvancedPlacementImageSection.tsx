import { SectionContainer } from "@/components/custom/section-container";
import { ASBVector } from "@/components/icons";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface AdvancedPlacementImageSectionProps {
  imageData: SectionJson;
}

export default function AdvancedPlacementImageSection({ imageData }: AdvancedPlacementImageSectionProps) {
  return (
    <SectionContainer
      vectorChildren={
        <>
          <div className="bg-secondary-200 absolute bottom-0 left-0 z-10 block h-5.5 w-1/3 translate-y-1/1 sm:h-7.5 md:hidden md:h-5.5" />
          <ASBVector className="absolute bottom-0 left-12 z-10 h-14 translate-y-1/2 md:left-0 md:h-20" />
        </>
      }
      sectionClassName="h-[710px] lg:h-[1080px]"
    >
      <h4 className="absolute bottom-15 z-10 max-w-3xl text-[2rem]/[2rem] font-semibold text-white lg:bottom-32">
        {imageData.title}
      </h4>
      <div className="from-primary-400 absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t to-transparent" />
      <Image
        src={imageData.image?.imageUrl ?? ""}
        alt="advanced-placement-image-section"
        fill
        className="-z-10 object-cover"
        priority
      />
    </SectionContainer>
  );
}
