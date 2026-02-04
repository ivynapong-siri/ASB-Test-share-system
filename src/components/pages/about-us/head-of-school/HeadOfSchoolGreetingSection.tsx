import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import ProfilePictureFrame from "@/components/custom/profile-picture-frame";
import { SectionContainer } from "@/components/custom/section-container";
import { KnotIcon } from "@/components/icons";
import { BreadcrumbProps } from "@/server/models/model-types";
import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";
import { isObject } from "@/server/utils/helpers";
import Image from "next/image";
interface HeadOfSchoolGreetingSectionProps {
  data: AboutUsPageJson;
  breadcrumbData: BreadcrumbProps;
}

const HeadOfSchoolGreetingSection = ({ data, breadcrumbData }: HeadOfSchoolGreetingSectionProps) => {
  const renderVectors = () => (
    <>
      <PatternStroke2 className="absolute top-0 -right-50 h-[205px] w-[300px] lg:-top-20 lg:-right-60 lg:h-[265px] lg:w-[360px]" />
      <PatternStroke1 className="absolute top-2/5 hidden lg:-left-18 lg:block lg:h-[150px] lg:w-[340px]" />
    </>
  );

  return (
    <SectionContainer vectorChildren={renderVectors()}>
      <div className="py-10 lg:pb-20">
        <BreadcrumbCustom
          data={{ breadcrumbs1: breadcrumbData.breadcrumb1, breadcrumbs2: breadcrumbData.breadcrumb2 }}
        />
      </div>

      {data.image && (
        <div className="mx-auto max-w-sm bg-white lg:max-w-4xl">
          <div className="relative mb-8 py-4">
            <ProfilePictureFrame
              className="rounded-4xl py-2"
              image={isObject(data.image) ? data.image.imageUrl : (data.image ?? "")}
              topRightIcon={<KnotIcon className="absolute -top-3.5 -right-8 h-9 w-9 lg:-top-6 lg:right-0" />}
              imageClassName="object-cover [transform:scale(2.4)] [transform-origin:center_25%] [object-position:50%_20%] lg:[transform:scale(1)] lg:[object-position:50%_25%]"
            />
          </div>
        </div>
      )}

      <div className="pb-12 text-center">
        <div className="mb-2 flex items-center justify-center pt-12 pb-6">
          <ASBRibbonText title={data.ribbonText} vectorHidden className="font-sans" />
        </div>
        <ASBTitle title={data.name} />
        <ASBTitle title={data.position} as="h3" />
      </div>

      <div className="flex flex-col gap-8 pb-23">
        <p className="text-base/[1.5rem] font-bold whitespace-pre-line text-neutral-400">{data.firstParagraph}</p>

        <p className="space-y-4 font-mono text-base/[1.625rem] whitespace-pre-line text-neutral-300">
          {data.contentParagraph}
        </p>
        <div className="whitespace-pre-line text-neutral-400">
          <p className="font-semibold">{data.lastParagraph}</p>
        </div>
      </div>

      <div className="pb-16 text-center lg:pb-10">
        {data.signatureImage && (
          <div className="flex w-full items-center justify-center">
            <div className="relative h-28 w-full md:w-[370px]">
              <Image src={data.signatureImage} fill className="object-contain md:object-cover" alt="sign" priority />
            </div>
          </div>
        )}
        <h6 className="pt-2 text-xl/[1.625rem] font-medium text-neutral-400">{data.name}</h6>
        <p className="pt-2.5 font-mono text-base/[1.5rem] text-neutral-400">{data.position}</p>
      </div>
    </SectionContainer>
  );
};

export default HeadOfSchoolGreetingSection;
