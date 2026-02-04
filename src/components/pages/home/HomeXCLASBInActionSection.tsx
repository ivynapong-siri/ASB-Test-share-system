import ASBDescription from "@/components/custom/asb-description";
import { PatternStroke1 } from "@/components/shapes";
import { AnimatedFadeInWhenVisible } from "@/components/shared/animation-section";
import { SectionJson } from "@/server/serializers/section-serializer";
import BlogCarousel from "../../carousel/blog-carousel";
import ASBRibbonText from "../../custom/asb-ribbon-text";
import { SectionContainer } from "../../custom/section-container";

interface HomeXCLASBInActionSectionProps {
  xclASBInActionData: SectionJson;
}

const HomeXCLASBInActionSection = ({ xclASBInActionData }: HomeXCLASBInActionSectionProps) => {
  return (
    <SectionContainer
      sectionClassName="bg-gray-200"
      className="items-center gap-20 px-0 max-md:pb-0 lg:px-10"
      vectorChildren={
        <>
          <PatternStroke1 className="absolute bottom-96 -left-20 h-[150px] w-[340px]" />
          <PatternStroke1 className="absolute top-80 -right-40 h-[150px] w-[340px] -rotate-0" />
        </>
      }
    >
      <AnimatedFadeInWhenVisible className="flex flex-col items-center max-lg:px-10">
        <ASBRibbonText title={xclASBInActionData.ribbonText ?? ""} className="translate-x-8" />
        <h2>{xclASBInActionData.header ?? ""}</h2>
        <ASBDescription
          description={xclASBInActionData.description ?? ""}
          className="pt-4 text-center lg:w-[450px] lg:pt-8"
        />
      </AnimatedFadeInWhenVisible>

      <AnimatedFadeInWhenVisible className="w-full">
        {xclASBInActionData.cards && <BlogCarousel blogData={xclASBInActionData.cards} hiddenNavigate={false} />}
      </AnimatedFadeInWhenVisible>
    </SectionContainer>
  );
};

export default HomeXCLASBInActionSection;
