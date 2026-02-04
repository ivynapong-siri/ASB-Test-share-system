import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

interface ImageCardProps {
  image: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  assetComponent?: ReactNode;
}

export default function ImageCard({ image, alt = "", className, imageClassName, assetComponent }: ImageCardProps) {
  return (
    <div className={cn("relative h-80 w-full", className)}>
      {assetComponent}
      <Image
        src={image}
        alt={alt}
        fill
        className={cn("z-10 rounded-4xl object-cover", imageClassName)}
        priority
        quality={95}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL={"/blur-image.jpg"}
      />
      <div className="left-0-0 border-primary-300/50 absolute top-0 h-[98%] w-[98%] -rotate-4 rounded-4xl border lg:-rotate-2" />
    </div>
  );
}
