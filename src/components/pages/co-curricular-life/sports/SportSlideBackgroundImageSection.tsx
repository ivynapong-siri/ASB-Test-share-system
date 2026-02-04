import SlideBackgroundImageCarousel from "@/components/carousel/slide-background-image-carousel";
import ContactBanner from "@/components/custom/contact-banner";
import { NavBoxJson } from "@/server/serializers/nav-box-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SportSlideBackgroundImageSectionProps {
  data: SectionJson;
  navBox: NavBoxJson | null;
}

const ExpandDescriptionComponent = ({ description }: { description: string }) => {
  return <p className="text-[1.25rem]/[1.75rem] font-semibold text-white md:text-[1.75rem]/[2.25rem]">{description}</p>;
};

export default function SportSlideBackgroundImageSection({ data, navBox }: SportSlideBackgroundImageSectionProps) {
  return (
    <SlideBackgroundImageCarousel
      vectorPosition="left"
      descriptionComponent={ExpandDescriptionComponent}
      slides={data.cards ?? []}
      title={data.cards && data.cards[0] ? data.cards[0].title : ""}
      ribbonText={data.ribbonText ?? ""}
      className="flex flex-col items-start md:items-end"
    >
      <div className="relative z-10 mt-16 w-full max-w-6xl md:w-4xl 2xl:w-6xl">
        {navBox && (
          <ContactBanner buttonText={navBox.buttonLabel} buttonHref={navBox.buttonUrl}>
            <p className="font-mono text-base/[1.625rem] text-white max-md:text-center lg:hidden">
              {navBox.title} {navBox.subtitle}
            </p>
            <div className="hidden flex-col font-mono text-base/[1.625rem] font-normal text-white lg:flex lg:max-w-96">
              <p>{navBox.title}</p>
              <p>{navBox.subtitle}</p>
            </div>
          </ContactBanner>
        )}
      </div>
    </SlideBackgroundImageCarousel>
  );
}
