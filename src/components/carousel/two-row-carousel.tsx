import { getMinSectionCardJsonLoop } from "@/client/utils/helper";
import { GalleriesJson } from "@/server/serializers/news-group-serializer";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";
import ImagesAllDetailCarousel from "./images-all-detail-carousel";

interface TwoRowCarouselProps {
  cards: GalleriesJson[];
  carouselName: string;
}

const TwoRowCarousel = ({ cards, carouselName }: TwoRowCarouselProps) => {
  const middleIndex = Math.ceil(cards.length / 2);
  let topCards = cards.slice(0, middleIndex);
  let bottomCards = cards.slice(middleIndex);

  if (topCards.length < 6) {
    topCards = getMinSectionCardJsonLoop({ cards: topCards }) as GalleriesJson[];
  }

  if (bottomCards.length < 6) {
    bottomCards = getMinSectionCardJsonLoop({ cards: bottomCards }) as GalleriesJson[];
  }

  return (
    <section className="w-full overflow-x-hidden py-20">
      <ImagesAllDetailCarousel
        slides={topCards}
        carouselName={carouselName}
        slideName="top-all-details"
        imageClassName="aspect-[560/300] h-full"
        sliderClassName="overflow-visible"
        containerClassName="my-4 max-md:h-[150px]"
        centeredSlides
      />
      <ImagesAllDetailCarousel
        slides={bottomCards}
        carouselName={carouselName}
        slideName="top-all-details"
        imageClassName="aspect-[560/300] h-full"
        sliderClassName="overflow-visible"
        containerClassName="max-md:hidden"
        centeredSlides
        translate={-288}
      />
      <ImagesAllDetailCarousel
        slides={bottomCards}
        carouselName={carouselName}
        slideName="top-all-details"
        imageClassName="aspect-[560/300] h-full"
        sliderClassName="overflow-visible"
        containerClassName="md:hidden h-[150px]"
        centeredSlides
        translate={-148}
      />
      <div className="mx-auto mt-4 flex w-full justify-center gap-2 md:mt-14 lg:gap-4">
        <div className="relative w-auto">
          <div className={`flex justify-center ${carouselName}-swiper-button-prev`}>
            <NavigationRoundedButton navigationName={carouselName} direction="prev" />
          </div>
        </div>
        <div className="relative w-auto">
          <div className={`flex justify-center ${carouselName}-swiper-button-next`}>
            <NavigationRoundedButton navigationName={carouselName} direction="next" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoRowCarousel;
