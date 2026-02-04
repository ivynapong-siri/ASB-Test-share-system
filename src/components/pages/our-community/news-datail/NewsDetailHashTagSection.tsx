import { HashtagJson, NewsJson } from "@/server/serializers/pages/news-serializer";

import { SectionContainer } from "@/components/custom/section-container";
import Image from "next/image";
import Link from "next/link";

interface NewsDetailHashTagSectionProps {
  data: NewsJson;
}

export default function NewsDetailHashTagSection({ data }: NewsDetailHashTagSectionProps) {
  return data.image2?.imageUrl && data.hashtags ? (
    <SectionContainer className="grid gap-8 md:grid-cols-2">
      {data.image2?.imageUrl && (
        <div className="relative aspect-505/338">
          <Image
            src={data.image2?.imageUrl ?? "/mock-image.jpg"}
            alt="hash-tag-image"
            fill
            className="rounded-4xl object-cover"
            priority
          />
        </div>
      )}

      {data.hashtags && (
        <div className="flex items-center border-y border-neutral-200 py-8 md:px-16 md:py-24">
          <div className="flex flex-wrap gap-x-1">
            {data.hashtags.map((hashTag: HashtagJson) => (
              <Link
                key={hashTag.id}
                className="text-primary-100 hover:text-secondary font-mono underline transition-colors duration-300"
                href={hashTag.url}
              >
                {hashTag.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </SectionContainer>
  ) : null;
}
