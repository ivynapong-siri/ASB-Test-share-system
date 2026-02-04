import { GalleriesJson } from "@/server/serializers/news-group-serializer";

import TwoRowCarousel from "@/components/carousel/two-row-carousel";

interface AllDetailImageSlideShowSectionProps {
  data: GalleriesJson[];
}

export default function AllDetailImageSlideShowSection({ data }: AllDetailImageSlideShowSectionProps) {
  return <TwoRowCarousel cards={data ?? []} carouselName="all-detail-image-slide" />;
}
