import ASBDescription from "@/components/custom/asb-description";
import ASBTitle from "@/components/custom/asb-title";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface PerformingLargeImageSectionProps {
  data: SectionJson;
}

const PerformingLargeImageSection = ({ data }: PerformingLargeImageSectionProps) => {
  const isMobile = useIsMobile();
  const imageUrl =
    (isMobile ? data.imageMobile?.imageUrl : data.image?.imageMediumLargeUrl) ||
    data.image?.imageUrl ||
    "/mock-image.jpg";
  return (
    <div className="relative h-[766px] xl:h-[100vh]">
      <Image src={imageUrl} alt="Background" fill className="object-cover object-[32%_80%] xl:object-center" priority />

      <div className="relative -top-40 z-10 ml-10 flex h-full items-center justify-end sm:-top-20 lg:top-0 lg:ml-0">
        <div className="bg-primary-400 flex flex-col gap-8 rounded-tl-[40px] rounded-bl-[40px] px-8 py-12 text-white lg:max-w-md lg:px-20 lg:py-20 xl:max-w-2xl xl:px-24 xl:pr-48">
          <ASBTitle title={data.title ?? ""} className="text-start text-white" />
          <ASBDescription description={data.description ?? ""} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default PerformingLargeImageSection;
