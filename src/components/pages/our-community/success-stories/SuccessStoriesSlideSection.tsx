"use client";

import SlideBackgroundImageCarousel from "@/components/carousel/slide-background-image-carousel";
import ASBDescription from "@/components/custom/asb-description";
import ContactBanner from "@/components/custom/contact-banner";
import { DoubleQuote } from "@/components/icons";
import { NavBoxJson } from "@/server/serializers/nav-box-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SuccessStoriesSlideSectionProps {
  data: SectionJson;
  navBox: NavBoxJson | null;
}

function SuccessStoriesSlideComponent({ description }: { description: string }) {
  return (
    <div className="flex flex-col gap-3 lg:py-24">
      <DoubleQuote className="block max-md:h-[20px] max-md:w-[28px] lg:hidden" />
      <p className="text-xl font-semibold text-white md:text-3xl">{description}</p>
    </div>
  );
}

export default function SuccessStoriesSlideSection({ data, navBox }: SuccessStoriesSlideSectionProps) {
  // const isMobile = useIsMobile()

  return (
    <SlideBackgroundImageCarousel
      ribbonText={data.ribbonText ?? ""}
      title={data.title ?? ""}
      vectorPosition="left"
      slides={data.cards ?? []}
      className="flex flex-col items-start md:items-end"
      descriptionComponent={SuccessStoriesSlideComponent as any}
      buttonClassName="max-md:gap-4"
    >
      {navBox && (
        <div className="relative z-10 mt-16 w-full">
          <ContactBanner buttonText={navBox.buttonLabel} buttonHref={navBox.buttonUrl}>
            <div className="text-base/[1.625rem] text-white max-md:text-center lg:hidden">
              {navBox.title} {navBox.subtitle}
            </div>
            <div className="hidden flex-col font-normal lg:flex lg:max-w-[565px]">
              <ASBDescription description={navBox.title} className="text-white" />
              <ASBDescription description={navBox.subtitle} className="text-white" />
            </div>
          </ContactBanner>
        </div>
      )}
    </SlideBackgroundImageCarousel>
  );
}
