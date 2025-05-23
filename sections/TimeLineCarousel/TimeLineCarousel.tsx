import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { TLCarouselItem } from "../../components/institutional/TimeLineCarousel/components/TLCarouselItem.tsx";
import { TimeLineCarouselProps } from "../../components/institutional/TimeLineCarousel/types.ts";
import { TLCarouselArrows } from "../../components/institutional/TimeLineCarousel/components/TLCarouselArrows.tsx";
import { TLCarouselDots } from "../../components/institutional/TimeLineCarousel/components/TLCarouselDots.tsx";

function TimeLineCarousel({
  images = [],
  preload,
  interval,
}: TimeLineCarouselProps) {
  const id = useId();

  return (
    <div
      id={id}
      class={clx(
        "flex flex-col-reverse",
        "w-full group relative"
      )}
    >

      <div id="main-banner" class="col-span-full row-span-full flex">
        <Slider class="carousel carousel-center max-w-[1920px] mx-auto ease-in-out duration-300">
          {images.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <TLCarouselItem image={image} lcp={index === 0 && preload} />
            </Slider.Item>
          ))}
        </Slider>
      </div>

      <TLCarouselArrows />

      <TLCarouselDots images={images} />

      <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default TimeLineCarousel;
