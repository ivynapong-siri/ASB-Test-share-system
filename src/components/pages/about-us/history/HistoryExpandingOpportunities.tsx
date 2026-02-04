import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import React from "react";

interface HistoryExpandingOpportunitiesProps {
  data: SectionJson;
}

const DecorativeImage: React.FC<{ imageSrc?: string; className: string }> = ({ className, imageSrc }) => (
  <div className={`absolute hidden ${className}`}>
    <Image alt="" src={imageSrc ?? ""} fill className="rounded-3xl object-cover" />
  </div>
);

const HistoryExpandingOpportunities: React.FC<HistoryExpandingOpportunitiesProps> = ({ data }) => {
  return (
    <SectionContainer className="relative items-center justify-center xl:py-40 xl:pt-60">
      <DecorativeImage
        className="top-0 left-10 h-40 w-40 -rotate-12 rounded-3xl lg:block xl:top-30"
        imageSrc="https://dcb9450325.nxcli.io/wp-content/uploads/2025/04/3c62b5d834c1c148a13f93268ffaa0eeea059cf2-scaled.jpg"
      />
      <DecorativeImage
        className="top-0 right-10 h-32 w-32 rotate-12 rounded-3xl lg:block xl:top-30"
        imageSrc="https://dcb9450325.nxcli.io/wp-content/uploads/2025/04/687c57e7dafb2ef4623c9772bc8aa348108a7425-scaled.jpg"
      />
      <DecorativeImage
        className="bottom-15 left-10 h-32 w-32 rotate-12 rounded-3xl xl:bottom-20 xl:block"
        imageSrc="https://dcb9450325.nxcli.io/wp-content/uploads/2025/04/33b6fc9341426d2d06e0f42da8d527877b079d06-scaled.jpg"
      />
      <DecorativeImage
        className="right-10 bottom-15 h-40 w-40 -rotate-12 rounded-3xl xl:bottom-20 xl:block"
        imageSrc="https://dcb9450325.nxcli.io/wp-content/uploads/2025/04/8b664f0119969c1d8ca1692f690da4a5b5b7cdcc-scaled.jpg"
      />
      <ASBRibbonText title={data.ribbonText ?? ""} className="w-fit translate-x-8" />
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="w-fit text-nowrap">{data.titleLine1}</h2>
        <h2 className="bg-secondary w-fit rounded-full px-10 pt-2 pb-4 text-nowrap text-white">{data.titleLine2}</h2>
        <p className="mt-4 max-w-3xl text-center font-mono 2xl:max-w-4xl">{data.description}</p>
      </div>
    </SectionContainer>
  );
};

export default HistoryExpandingOpportunities;
