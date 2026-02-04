import { SwiperOptions } from "swiper/types";

export const activeBreakPoints: SwiperOptions["breakpoints"] = {
  320: { slidesPerView: 1.2 },
  420: { slidesPerView: 2 },
  640: { slidesPerView: 2.5 },
  768: { slidesPerView: 4 },
  1024: { slidesPerView: 3.3 },
  1280: { slidesPerView: 4 },
  1536: { slidesPerView: 4.8 },
};

export const activeOtherFacilitiesBreakPoints: SwiperOptions["breakpoints"] = {
  320: { slidesPerView: 1.1 },
  640: { slidesPerView: 1.1 },
  768: { slidesPerView: 1.1 },
  1024: { slidesPerView: 2.5 },
  1280: { slidesPerView: 3.0 },
  1536: { slidesPerView: 3.0 },
};
