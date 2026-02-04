import { AnimatedLeftItemSlide, AnimatedRightItemSlide } from "@/components/shared/animation-section";
import { ASBVector, QuotationMarkSymbols } from "../../icons";

import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface HomeHeadOfSchoolProps {
  headOfSchool: SectionJson;
}

const HomeHeadOfSchoolSection = ({ headOfSchool }: HomeHeadOfSchoolProps) => {
  return (
    <div className="relative mt-10 flex h-[900px] w-full md:h-[600px]">
      <Image
        alt={headOfSchool.title ?? "Head of School Background"}
        src={headOfSchool.image?.imageUrl ?? "/mock-image.jpg"}
        fill
        priority
        className="object-cover opacity-70"
      />

      <div className="absolute h-full w-full bg-black opacity-80" />

      <div className="relative flex w-full px-10 md:gap-4 lg:gap-8 xl:container xl:mx-auto xl:gap-0 xl:px-0">
        <>
          {/* Large size */}
          <AnimatedLeftItemSlide className="hidden md:flex">
            <div className="relative bottom-0 z-10 h-[450px] w-[340px] rotate-y-180 md:-bottom-1/10 md:h-[550px] md:w-[350px] lg:bottom-[200px] lg:h-[800px] lg:w-[500px] xl:-left-24 2xl:bottom-[270px] 2xl:h-[870px] 2xl:w-[580px]">
              {headOfSchool.image2?.imageUrl && (
                <Image
                  alt=""
                  src={headOfSchool.image2?.imageUrl ?? ""}
                  fill
                  priority
                  sizes="(max-width: 768px) 340px, (max-width: 1024px) 350px, (max-width: 1280px) 500px, 580px"
                />
              )}
            </div>
          </AnimatedLeftItemSlide>

          <div className="flex h-full w-full flex-col md:min-w-[270px] md:flex-row xl:gap-20">
            <div className="relative z-20 flex w-full flex-col pt-[60px] text-white md:flex-3/5 md:pt-20 lg:flex-4/5 xl:min-w-[723px]">
              <div className="absolute -top-12 -left-0 xl:-left-12">
                <QuotationMarkSymbols className="h-[60px] w-[80px] lg:h-[84px] lg:w-[112px]" />
              </div>
              <AnimatedRightItemSlide className="flex w-full flex-col gap-12 lg:gap-20 xl:min-w-[723px]">
                <p className="w-full font-sans text-xl/[1.625rem] font-semibold xl:min-w-[723px] xl:text-[1.75rem]/[2.25rem]">
                  {headOfSchool.description}
                </p>
                <div className="flex flex-col gap-4">
                  <p className="font-mono text-lg font-medium tracking-widest uppercase">{headOfSchool.titleLine1}</p>
                  <p className="font-mono text-sm">{headOfSchool.titleLine2}</p>
                </div>
              </AnimatedRightItemSlide>
            </div>

            {/* Small size */}
            <AnimatedLeftItemSlide className="absolute bottom-0 left-0 z-10 -mt-20 flex h-full w-full items-start sm:-mt-28 md:hidden">
              <div className="absolute bottom-0 left-0 z-10 h-[430px] w-[470px] rotate-y-180">
                {headOfSchool.image2?.imageUrl && (
                  <Image alt="" src={headOfSchool.image2?.imageUrl ?? ""} fill priority className="object-cover" />
                )}
              </div>
            </AnimatedLeftItemSlide>
          </div>
        </>
      </div>

      <div className="absolute -bottom-10 z-20 h-10 w-full max-md:-bottom-5 sm:h-20">
        <ASBVector fill="#B81E29" className="absolute left-1/8 h-full sm:top-7.5 md:top-1/8 lg:top-0" />
        <div className="bg-secondary-200 absolute top-1/2 left-0 h-1/2 w-[20%] sm:top-15 sm:h-7.5 md:top-1/2 lg:h-1/2" />
      </div>
    </div>
  );
};

export default HomeHeadOfSchoolSection;
