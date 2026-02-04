"use client";

import ModalFlatCardCarousel from "@/components/carousel/modal-flat-card-carousel";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";

interface ModalFlatCardProps {
  slides: SectionCardJson[];
  className?: string;
  otherLabel: string;
  buttonName: string;
  carouselName: string;
  onClose: () => void;
  currentIndex: number;
  showStandardVector?: boolean;
  vectorChildren?: React.ReactNode;
}

const ModalFlatCard = ({
  slides,
  className,
  otherLabel,
  buttonName,
  carouselName,
  onClose,
  currentIndex,
  showStandardVector = true,
  vectorChildren,
}: ModalFlatCardProps) => {
  return (
    <>
      <div className={cn("fixed top-1/2 left-1/2 z-99 w-fit -translate-x-1/2 -translate-y-1/2", className)}>
        <ModalFlatCardCarousel
          slides={slides}
          otherLabel={otherLabel}
          buttonName={buttonName}
          carouselName={carouselName}
          onClose={() => onClose()}
          currentIndex={currentIndex}
          showStandardVector={showStandardVector}
          vectorChildren={vectorChildren}
        />
      </div>
      <div className="fixed top-0 left-0 z-50 h-full w-full bg-black/80" />
    </>
  );
};

export default ModalFlatCard;
