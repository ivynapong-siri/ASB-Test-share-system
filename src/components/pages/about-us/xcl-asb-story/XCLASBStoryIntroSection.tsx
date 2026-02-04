import { BookIcon, KnotIcon, LightBulbIcon, MagnifyIcon } from "@/components/icons";

import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface XCLASBStoryIntroSectionProps {
  sectionData: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const XCLASBStoryIntroSection = ({ sectionData, breadcrumbData }: XCLASBStoryIntroSectionProps) => {
  const { ribbonText, title, description, image } = sectionData;

  return (
    <IntroSection
      title={title}
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      description={description}
      ribbonText={ribbonText}
      imageSrc={image?.imageUrl ?? ""}
      showStandardVector={false}
      imageClassName="object-cover"
      topLeftIcon={<LightBulbIcon className="h-10 w-8 lg:h-16 lg:w-12" />}
      topRightIcon={<KnotIcon className="h-6 w-5 lg:h-10 lg:w-9" />}
      bottomLeftIcon={<BookIcon className="h-8 w-13 lg:h-13 lg:w-21" />}
      bottomRightIcon={<MagnifyIcon className="h-5 w-6 lg:h-9 lg:w-10" />}
      topLeftIconClassName="-left-12 top-0 lg:-left-18 lg:top-0"
      topRightIconClassName="-top-4 right-0 lg:-top-4 lg:right-0"
      bottomLeftIconClassName="-bottom-10 -left-10 lg:-bottom-10 lg:-left-20"
      bottomRightIconClassName="-bottom-10 right-0 lg:-bottom-10 lg:right-0"
    />
  );
};

export default XCLASBStoryIntroSection;
