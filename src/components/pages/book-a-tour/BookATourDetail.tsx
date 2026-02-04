"use client";
import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import { SectionContainer } from "@/components/custom/section-container";
import LazySection from "@/components/shared/lazy-section";
import { BookATourPageJson } from "@/server/serializers/pages/book-a-tour-serializer";
// Keep above-the-fold components as regular imports
import BookATourFormSection from "./BookATourFormSection";
import BookATourTitleSection from "./BookATourTitleSection";
interface BookATourPageProps {
  data: BookATourPageJson;
}
const BookATourDetail = ({ data }: BookATourPageProps) => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <BookATourTitleSection data={data} />
      <SectionContainer className="gap-8" sectionClassName="bg-white py-16">
        <ASBRibbonText title={data.ribbonText} />
        <h2 className="text-primary-400 text-start text-[2rem]/[2.25rem] font-semibold md:text-[3.875rem]/[4.375rem]">
          {data.title}
        </h2>
        <LazySection>
          <ASBDescription description={data.description} />
        </LazySection>
        <LazySection>
          <BookATourFormSection data={data} />
        </LazySection>
      </SectionContainer>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3875.7319180367595!2d100.571436!3d13.7346737!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f7e4c3bf5c1%3A0xa23ecdfe05e67a31!2sThe%20American%20School%20of%20Bangkok%20(ASB)!5e0!3m2!1sen!2sth!4v1755070084410!5m2!1sen!2sth"
        width="280"
        height="200"
        allowFullScreen
        loading="lazy"
        className="min-h-[800px] w-full"
      />
    </div>
  );
};
export default BookATourDetail;
