import { getMinSectionCardJsonLoop } from "@/client/utils/helper";
import GalleryCarousel from "@/components/carousel/gallery-carousel";
import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import { NavBoxJson } from "@/server/serializers/nav-box-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";

interface ProgramOverviewSectionProps {
  data: SectionJson;
  navBox: NavBoxJson | null;
}

const Banner = ({ banner }: { banner: NavBoxJson }) => {
  return (
    <div className="bg-secondary-300 mt-15 w-full">
      <div className="mx-auto my-5 w-full border-y border-dashed border-white py-9">
        <div className="mx-auto flex flex-col items-center gap-10 px-6 max-md:w-96 max-sm:w-full lg:flex-row lg:gap-20 xl:container xl:gap-0 xl:px-35 2xl:gap-80 2xl:px-10">
          <p className="text-center font-sans text-base/[1.5rem] font-semibold text-white md:text-xl/[1.625rem] lg:text-start">
            {banner.title}
          </p>
          <LinkButton buttonText={banner.buttonLabel} href={banner.buttonUrl} linkButtonVariant={"secondary"} />
        </div>
      </div>
    </div>
  );
};

export default function ProgramOverviewSection({ data, navBox }: ProgramOverviewSectionProps) {
  const galleryImages = getMinSectionCardJsonLoop({ cards: data.cards ?? [], minLoopCard: 7 });

  return (
    <>
      <SectionContainer className="pb-0 max-md:pt-0 lg:pb-0 xl:py-20">
        <ASBRibbonText title={data.ribbonText ?? ""} />
        <div className="flex flex-col gap-8 md:flex-row xl:pb-15">
          <ASBTitle title={data.title ?? ""} className="text-start md:w-full md:min-w-[382px]" />
          <ASBDescription description={data.description ?? ""} />
        </div>
      </SectionContainer>
      <GalleryCarousel slides={galleryImages} />
      {navBox && <Banner banner={navBox} />}
    </>
  );
}
