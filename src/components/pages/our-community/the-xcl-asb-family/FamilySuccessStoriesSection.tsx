"use client";

import SlideBackgroundImageCarousel from "@/components/carousel/slide-background-image-carousel";
import ASBDescription from "@/components/custom/asb-description";
import ContactBanner from "@/components/custom/contact-banner";
import { DoubleQuote } from "@/components/icons";
import { NavBoxJson } from "@/server/serializers/nav-box-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";

interface FamilySuccessStoriesSectionProps {
  data: SectionJson;
  navBox?: NavBoxJson | null;
}

interface FamilySuccessStoriesSlideComponentProps {
  description: string;
  title: string;
  subtitle: string;
}

function SuccessStoriesSlideComponent({ description, subtitle, title }: FamilySuccessStoriesSlideComponentProps) {
  return (
    <div className="flex w-full flex-col gap-8 text-white lg:flex-row">
      <DoubleQuote className="h-9 w-12 max-md:h-[20px] max-md:w-[28px]" />
      <div>
        <ASBDescription
          description={description}
          className="max-w-3xl text-[1.25rem]/[1.625rem] text-white lg:text-[1.75rem]/[2.25rem]"
        />
        <p className="pt-28 font-mono text-[1.125rem] font-medium tracking-widest text-white uppercase">{title}</p>
        <p className="font-mono text-sm/[1.25rem] text-white">{subtitle}</p>
      </div>
    </div>
  );
}

export default function FamilySuccessStoriesSection({ data, navBox }: FamilySuccessStoriesSectionProps) {
  return (
    <SlideBackgroundImageCarousel
      ribbonText={data.ribbonText ?? ""}
      title={data.title ?? ""}
      vectorPosition="left"
      slides={data.cards ?? []}
      className="flex flex-col items-start md:items-end"
      descriptionComponent={SuccessStoriesSlideComponent as any}
    >
      <div className="relative z-10 mt-16 w-full">
        {navBox && (
          <ContactBanner buttonText={navBox.buttonLabel} buttonHref={navBox.buttonUrl}>
            <div className="text-base/[1.625rem] text-white max-md:text-center lg:hidden">
              {navBox.title} {navBox.subtitle}
            </div>
            <div className="hidden flex-col font-normal lg:flex lg:max-w-[565px]">
              <ASBDescription description={navBox.title} className="text-white" />
              <ASBDescription description={navBox.subtitle} className="text-white" />
            </div>
          </ContactBanner>
        )}
      </div>
    </SlideBackgroundImageCarousel>
  );
}
