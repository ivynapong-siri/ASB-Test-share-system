import TwoRowCarousel from "@/components/carousel/two-row-carousel";
import { GalleriesJson } from "@/server/serializers/news-group-serializer";

interface NewsDetailImageSlideShowSectionProps {
  data: GalleriesJson[];
}

export default function NewsDetailImageSlideShowSection({ data }: NewsDetailImageSlideShowSectionProps) {
  return <TwoRowCarousel cards={data ?? []} carouselName="news-detail-image-slide" />;
}
