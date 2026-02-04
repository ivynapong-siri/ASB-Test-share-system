"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ReactNode, useState } from "react";

import ASBDescription from "@/components/custom/asb-description";
import ASBTitle from "@/components/custom/asb-title";
import DropdownButtonMenus from "@/components/custom/dropdown-button-menus";
import FilterButton from "@/components/custom/filter-button";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionWithTabJson } from "@/server/serializers/section-serializer";
import { motion } from "framer-motion";
import Image from "next/image";
interface PerformingMusicSectionProps {
  data: SectionWithTabJson;
}

const RenderCardFilter = ({ card, filterContent }: { card: SectionCardJson[]; filterContent: ReactNode }) => {
  return (
    <>
      <div className="flex w-full flex-col items-center pb-10 md:pb-15">{filterContent}</div>
      {card.map((data) => (
        <motion.div
          key={data.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex w-full justify-center pb-10 text-center md:pb-15">
            <ASBDescription description={data.description} className="max-w-[450px] text-white" />
          </div>

          <div className="relative h-[530px] w-full md:px-10 lg:h-[460px] xl:mx-0">
            <Image
              key={data.id}
              src={data.image?.imageUrl ?? "/mock-image.jpg"}
              alt=""
              fill
              className="rounded-tl-4xl rounded-tr-4xl object-cover"
              priority
            />
          </div>
        </motion.div>
      ))}
    </>
  );
};

const PerformingMusicSection = ({ data }: PerformingMusicSectionProps) => {
  const [selectedTabId, setSelectedTabId] = useState<number>(data.tabs?.[0]?.id ?? 0);

  return (
    <SectionContainer sectionClassName="bg-primary" className="items-center pb-0 lg:pb-0">
      <ASBTitle title={data.title ?? ""} className="pt-4 pb-10 text-white md:pb-12" />

      <div className="w-full overflow-y-hidden">
        <div className="z-10 flex md:hidden">
          <DropdownButtonMenus
            headerContent={data.selectedTitle ?? "Select Option"}
            options={data.tabs ?? []}
            onOptionSelect={(id) => setSelectedTabId(id)}
            buttonClassName="h-16"
          />
        </div>
        <div className="flex h-full w-full flex-col overflow-x-auto">
          <RenderCardFilter
            filterContent={
              <div className="item-center z-1 hidden flex-row md:flex">
                <FilterButton options={data.tabs ?? []} onChange={(id) => setSelectedTabId(id)} />
              </div>
            }
            card={(data.tabs?.find((e) => e.id === selectedTabId)?.cards as SectionCardJson[]) ?? []}
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default PerformingMusicSection;
