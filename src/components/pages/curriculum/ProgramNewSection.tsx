import { AlarmClockIcon, BackPackIcon, GlobeIcon, KnotIcon } from "@/components/icons";

import IntroSection from "@/components/shared/intro-section";
import { cn } from "@/lib/utils";
import { SectionJson } from "@/server/serializers/section-serializer";

interface ProgramNewYearsSectionProps {
  data: SectionJson;
  customTopLeftPosition?: string;
  customTopRightPosition?: string;
  customBottomLeftPosition?: string;
  customBottomRightPosition?: string;
}

export default function ProgramNewYearsSection({
  data,
  customBottomLeftPosition,
  customBottomRightPosition,
  customTopLeftPosition,
  customTopRightPosition,
}: ProgramNewYearsSectionProps) {
  return (
    <IntroSection
      imageSrc={data.image?.imageUrl || ""}
      reverse
      showBreadcrumb={false}
      showStandardVector={false}
      ribbonText={data.ribbonText}
      title={data.title}
      description={data.description}
      textClassName="justify-center max-w-[505px]"
      containerClassName="sm:h-92 sm:w-88 xl:h-[596px] xl:w-[592px] transform scale-x-[-1]"
      topLeftIconClassName={cn(
        "top-4 -left-4 scale-x-[-1] -rotate-26 transform sm:top-16 sm:left-4 md:left-1 lg:-left-3 xl:-left-1",
        customTopLeftPosition
      )}
      topRightIconClassName={cn(
        "-top-2 right-3 sm:top-7 sm:right-14 md:top-6 lg:top-5 xl:top-4",
        customTopRightPosition
      )}
      bottomLeftIconClassName={cn(
        "-bottom-4 -left-0 scale-x-[-1] -rotate-36 transform sm:bottom-5 sm:left-4 md:bottom-4 md:left-2 lg:bottom-2 lg:left-0",
        customBottomLeftPosition
      )}
      bottomRightIconClassName={cn(
        "-right-5 -bottom-2 rotate-30 sm:right-4 sm:bottom-14 md:right-0 lg:-right-2 lg:rotate-18",
        customBottomRightPosition
      )}
      topLeftIcon={<GlobeIcon className="h-[25px] w-5 md:h-10 md:w-8 lg:h-13 lg:w-10" />}
      topRightIcon={<KnotIcon className="h-6 w-5 lg:h-9 lg:w-9" />}
      bottomLeftIcon={<AlarmClockIcon className="h-7 w-7 md:h-10 md:w-8 lg:h-13 lg:w-10" />}
      bottomRightIcon={<BackPackIcon className="h-6 w-6 md:h-9 md:w-8 lg:h-12 lg:w-11" />}
    />
  );
}
