import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import Image from "next/image";
import ASBDescription from "../custom/asb-description";

interface CardProps {
  card: SectionCardJson;
  index: number;
}

interface ContentImageSwitchProps {
  cards: SectionCardJson[];
  className?: string;
}

const Card = ({ card, index }: CardProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-between xl:max-w-[412px]",
        index % 2 === 0 ? "xl:flex-col-reverse" : "justify-start"
      )}
    >
      <div className="relative aspect-[358/442] w-full md:h-[350px] xl:aspect-[412/471] xl:h-[471px] xl:w-[412px]">
        <Image src={card.image?.imageUrl ?? ""} alt={`card-image-${index}`} fill className="rounded-4xl object-cover" />
      </div>
      <div className="mx-4 my-8 flex w-full flex-col justify-center gap-5 md:max-w-[335px] xl:mx-10 xl:mt-[51px] xl:mb-[95px]">
        <h5 className="text-primary-400 text-[1.75rem]/[2rem] font-semibold">{card.title}</h5>
        <ASBDescription description={card.description} className="text-base/[1.25rem]" />
      </div>
    </div>
  );
};

export default function ContentImageSwitch({ cards, className }: ContentImageSwitchProps) {
  return (
    <div className={cn("flex w-full gap-5 max-xl:flex-col xl:items-stretch xl:justify-center xl:pt-4", className)}>
      {cards.map((card, index) => (
        <Card card={card} index={index} key={index + 1} />
      ))}
    </div>
  );
}
