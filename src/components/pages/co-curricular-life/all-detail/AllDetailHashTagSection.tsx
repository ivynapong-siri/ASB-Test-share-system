import { HashtagJson, NewsJson } from "@/server/serializers/pages/news-serializer";

import { SectionContainer } from "@/components/custom/section-container";
import Image from "next/image";
import Link from "next/link";

interface AllDetailHashTagSectionProps {
  data: NewsJson;
}

export default function AllDetailHashTagSection({ data }: AllDetailHashTagSectionProps) {
  return (
    <SectionContainer className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-505/338">
        <Image
          src={data.image2?.imageUrl ?? ""}
          alt="hash-tag-image"
          fill
          className="rounded-4xl object-cover"
          priority
        />
      </div>
      <div className="flex items-center border-y border-neutral-200 py-8 md:px-16 md:py-24">
        <div className="flex flex-wrap gap-1">
          {data.hashtags &&
            data.hashtags.map((hashTag: HashtagJson) => (
              <Link
                key={hashTag.id}
                className="hover:text-secondary text-primary-100 font-mono underline transition-colors duration-300"
                href={hashTag.url}
              >
                {hashTag.title}
              </Link>
            ))}
        </div>
      </div>
    </SectionContainer>
  );
}
