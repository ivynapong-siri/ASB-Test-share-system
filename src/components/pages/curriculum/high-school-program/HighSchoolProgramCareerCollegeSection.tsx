import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import { PatternStroke1 } from "@/components/shapes";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface HighSchoolProgramCareerCollegeSectionProps {
  data: SectionJson;
}

export default function HighSchoolProgramCareerCollegeSection({ data }: HighSchoolProgramCareerCollegeSectionProps) {
  return (
    <SectionContainer
      vectorChildren={
        <PatternStroke1 className="absolute -right-10 bottom-4 z-10 h-20 w-40 md:right-0 lg:bottom-0 lg:h-37 lg:w-83" />
      }
    >
      <ASBRibbonText title={data.ribbonText ?? ""} />
      <div className="grid w-full grid-cols-2 gap-25 max-md:flex max-md:flex-col max-md:gap-12">
        <div className="flex w-full flex-col gap-8 max-sm:w-90">
          <ASBTitle title={data.title ?? ""} className="text-start" />
          <div className="pb-4 md:hidden">
            <ASBDescription description={data.description ?? ""} className="pb-12" />
            <LinkButton buttonText={data.buttonLabel ?? ""} href={data.buttonUrl ?? "#"} />
          </div>
          <div className="relative h-75 lg:h-[438px] lg:w-full">
            <Image
              src={data.image?.imageMediumLargeUrl || data.image?.imageUrl || ""}
              alt=""
              fill
              className="rounded-[50px] object-center"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-12 max-md:hidden">
          <p className="text-neutral font-mono">{data.description}</p>
          <LinkButton buttonText={data.buttonLabel ?? ""} href={data.buttonUrl ?? "#"} />
        </div>
      </div>
    </SectionContainer>
  );
}
