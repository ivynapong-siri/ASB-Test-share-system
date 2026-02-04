import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { formattedPaddingNumbers } from "@/server/utils/helpers";
import Image from "next/image";
interface EducationCardProps {
  index: number;
  data: SectionCardJson;
}

const EducationCard = ({ index, data }: EducationCardProps) => {
  const formattedNumbers = formattedPaddingNumbers(index);
  return (
    <div className="relative z-1 h-full min-h-[300px]">
      <div className="bg-primary-200 absolute top-0 left-4 z-20 rounded-4xl px-6 py-1 font-mono font-medium text-white">
        {formattedNumbers}
      </div>
      <div className="text-primary-400 bg-primary-gray relative top-4 z-10 flex h-full w-full flex-col overflow-hidden rounded-2xl px-10 pt-9 pb-7">
        <div
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 mix-blend-multiply",
            index == 0
              ? "top-1/2 left-1/2 h-full w-2/3"
              : index == 1
                ? "top-2/3 left-1/2 h-3/4 w-full"
                : "top-1/2 left-2/3 h-3/4 w-2/3"
          )}
        >
          <Image
            alt={data.title}
            src={data.image?.imageUrl ?? "/bg-1.svg"}
            fill
            priority
            className={cn("object-contain transition-opacity duration-300", data.image?.imageUrl ? "" : "opacity-25")}
            quality={95}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={"/blur-image.jpg"}
          />
        </div>
        <div className="relative z-10 flex h-full w-full flex-col justify-between gap-20">
          <h5 className="text-[1.75rem]/[2rem]">{data.title}</h5>
          <p className="font-mono text-sm">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
