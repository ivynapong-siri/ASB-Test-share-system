import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface BentoCardProps {
  image: string;
  numb: number;
  className?: string;
  imageClassName?: string;
}

export default function BentoCard({ image, numb, className, imageClassName }: BentoCardProps) {
  return (
    <div className={cn("relative", className)}>
      <Badge className="absolute top-0 left-8 z-10 min-w-12 -translate-y-1/2 rounded-full p-1 font-mono text-white">
        {String(numb).padStart(2, "0")}
      </Badge>
      <Image
        src={image}
        alt=""
        fill
        priority
        className="rounded-4xl object-cover"
        quality={95}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL={"/blur-image.jpg"}
      />
    </div>
  );
}
