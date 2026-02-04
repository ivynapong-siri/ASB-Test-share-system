import SportsEventsCarousel from "@/components/carousel/sports-events-carousel";
import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SportLatestEventSectionProps {
  data: SectionJson;
}

export default function SportLatestEventSection({ data }: SportLatestEventSectionProps) {
  return (
    <>
      <SectionContainer sectionClassName="bg-primary-400" className="items-center pb-0">
        <ASBRibbonText title={data.ribbonText ?? ""} className="translate-x-8" />
        <ASBTitle title={data.title ?? ""} className="mt-4 text-white" />
        <ASBDescription description={data.description ?? ""} className="my-12 max-w-2xl text-center text-white" />
        <SportsEventsCarousel slides={data.cards ?? []} className="max-xl:hidden" />
        <div className="flex w-full items-center justify-center max-xl:hidden">
          <LinkButton
            iconClassName="border-white md:border-primary text-white md:text-red-500 max-xl:bg-secondary-200 group-hover/button:border-white group-hover/button:text-white"
            linkClassName="mt-8 text-white md:text-primary-400 h-12 cursor-pointer bg-secondary-200 md:bg-white py-0 hover:text-white"
            href={data.buttonUrl ?? "#"}
            buttonText={data.buttonLabel ?? ""}
          />
        </div>
      </SectionContainer>

      <div className="bg-primary-400 flex w-full flex-col max-xl:pb-20">
        <SportsEventsCarousel slides={data.cards ?? []} className="xl:hidden" />
        <div className="flex w-full items-center justify-center xl:hidden">
          <LinkButton
            iconClassName="border-white xl:border-primary text-white xl:text-red-500 max-xl:bg-secondary-200 group-hover/button:border-white group-hover/button:text-white"
            linkClassName="mt-8 text-white xl:text-primary-400 h-12 cursor-pointer bg-secondary-200 xl:bg-white py-0 hover:text-white"
            href={data.buttonUrl ?? "#"}
            buttonText={data.buttonLabel ?? ""}
          />
        </div>
      </div>
    </>
  );
}
