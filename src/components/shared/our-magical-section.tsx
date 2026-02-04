"use client";

import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import { ReactNode } from "react";
import ASBRibbonText from "../custom/asb-ribbon-text";
import { SectionContainer } from "../custom/section-container";
import { TextHighlight2 } from "../shapes";

interface OurMagicalSectionProps {
  vectorChildren?: ReactNode;
  hoveredId: number;
  setHoveredId: React.Dispatch<React.SetStateAction<number>>;
  data: SectionJson;
}

const RenderHeaderSection = ({ data }: { data: SectionJson }) => {
  return (
    <div className="relative flex flex-col items-center">
      <ASBRibbonText title={data.ribbonText ?? ""} vectorHidden className="-translate-x-2" />
      <div className="relative flex flex-row pt-6 text-center text-[2rem] font-semibold xl:text-[3.875rem]/[4.375rem]">
        <div className="flex flex-col gap-0">
          <h2>{data.titleLine1}</h2>
          <h2>{data.titleLine2}</h2>
        </div>
        <TextHighlight2 className="absolute -top-10 -right-12 h-24 w-20 rotate-y-180 lg:top-4 lg:-right-8 xl:top-4 xl:-right-8" />
      </div>
    </div>
  );
};

const RenderHoverMagical = ({
  data,
  hoveredId,
  setHoveredId,
}: {
  data: SectionCardJson[];
  hoveredId: number;
  setHoveredId: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return data.map((e, index) => {
    const imageClasses = cn(
      "absolute top-1/2 translate-x-0 -translate-y-1/2 opacity-100 xl:opacity-80",

      index === 0 && "h-36 w-36 xl:h-42 xl:w-42",
      index === 1 && "h-24 w-16 xl:h-19 xl:w-14",
      index === 2 && "h-25 w-17",
      index === 3 && "h-22 w-14",
      index === 4 && "h-24 w-24",
      index === 5 && "h-36 w-30",

      (index === 4 || index === 5) && "xl:rotate-y-180",

      index === 0 && "right-8",
      index === 1 && "left-16",
      index === 2 && "right-18.5",
      index === 3 && "left-24",
      index === 4 && "right-16",
      index === 5 && "left-11",

      index === 0 && "xl:-left-34",
      index === 1 && "xl:-left-24",
      index === 2 && "xl:-left-[4.3rem]",
      index === 3 && "xl:-right-[2.9rem] xl:left-auto",
      index === 4 && "xl:-right-37",
      index === 5 && "xl:-right-55 xl:left-auto",

      index === 0 && "xl:top-auto xl:-bottom-11",
      [2].includes(index) && "xl:top-1/3",
      index == 3 && "top-auto bottom-0 xl:top-1/3",
      index === 5 && "xl:top-4/10",
      [1, 4].includes(index) && "xl:top-[11%]"
    );

    return (
      <div className="flex flex-col text-center" onMouseEnter={() => setHoveredId(e.id)} key={e.id}>
        <div
          className={cn(
            "text-primary relative text-[8.75rem] font-semibold duration-300",
            hoveredId == e.id ? "text-primary" : "xl:text-[#45A9E0]"
          )}
        >
          <p className="cursor-pointer" style={{ caretColor: "transparent" }}>
            {e.title.slice(0, 1).toUpperCase()}
          </p>
          {e.id != 7 && e.image?.imageUrl && (
            <div className={imageClasses}>
              <Image
                alt=""
                src={e.image?.imageMediumLargeUrl || e.image?.imageUrl || ""}
                fill
                className="object-fill"
                priority
              />
            </div>
          )}
        </div>
        <p className="block font-bold xl:hidden">{e.title}</p>
      </div>
    );
  });
};

const OurMagicalSection = ({ data, hoveredId, setHoveredId, vectorChildren }: OurMagicalSectionProps) => {
  return (
    <SectionContainer
      sectionClassName="bg-primary-gray"
      className="text-primary z-1 items-center px-10 py-24 xl:pb-32"
      vectorChildren={vectorChildren}
    >
      <RenderHeaderSection data={data} />
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col gap-0 pt-0 xl:flex-row xl:gap-10 xl:pt-16">
          <RenderHoverMagical data={data.cards ?? []} hoveredId={hoveredId} setHoveredId={setHoveredId} />
        </div>
        <div className="bg-primary hidden min-h-16 w-fit min-w-48 rounded-full px-10 py-2 xl:flex">
          <p className="text-[1.75rem] font-semibold text-white">
            {hoveredId ? data.cards?.find((item) => item.id === hoveredId)?.title : ""}
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

export default OurMagicalSection;
