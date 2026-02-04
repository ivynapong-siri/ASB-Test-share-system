import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";

interface AmericanPersonalizedSectionProps {
  data: SectionJson;
}

export default function AmericanPersonalizedSection({ data }: AmericanPersonalizedSectionProps) {
  const isMobile = useIsMobile();
  const imageUrl =
    (isMobile ? data.imageMobile?.imageUrl : data.image?.imageMediumLargeUrl) ||
    data.image?.imageUrl ||
    "/mock-image.jpg";
  return (
    <SectionContainer className="flex gap-x-15 pt-10 pb-30 lg:flex-row">
      <div>
        <ASBRibbonText title={data.ribbonText ?? "personalized & collaborative"} />
        <div className="flex w-full flex-col gap-8 pb-12 lg:w-[470px]">
          <ASBTitle title={data.title ?? ""} className="text-start" />
          <ASBDescription description={data.description ?? ""} />
        </div>
      </div>
      <div className="-mb-15 flex w-full flex-col items-end gap-7">
        <div className="relative h-[360px] w-full rounded-[50px]">
          <Image src={imageUrl} alt="" fill priority className="mb-7 w-full rounded-[50px] object-cover md:h-90" />
        </div>

        <div className="bg-primary-gray relative overflow-hidden rounded-4xl px-6 py-10 lg:pr-10 lg:pl-20">
          <div className="absolute top-0 -left-3 z-0 h-[100px] w-[100px]">
            <Image alt="Background image" src="/bg-5.svg" fill className="object-contain" />
          </div>
          <div className="relative z-10 font-mono text-sm text-neutral-300">{data.cards?.[0]?.description}</div>
        </div>
      </div>
    </SectionContainer>
  );
}
