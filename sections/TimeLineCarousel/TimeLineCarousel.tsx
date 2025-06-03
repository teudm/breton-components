import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { TLCarouselItem } from "../../components/institutional/TimeLineCarousel/components/TLCarouselItem.tsx";
import { TimeLineCarouselProps } from "../../components/institutional/TimeLineCarousel/types.ts";
import { TLCarouselArrows } from "../../components/institutional/TimeLineCarousel/components/TLCarouselArrows.tsx";
import { TLCarouselDots } from "../../components/institutional/TimeLineCarousel/components/TLCarouselDots.tsx";
import { useScript } from "@deco/deco/hooks";

function TimeLineCarousel({
  images = [],
  preload,
  interval,
}: TimeLineCarouselProps) {
  const id = useId();

  function forceFirstTab() {
    const carousel = document.querySelector(".timelinecarousel");
    const firstDot: HTMLButtonElement | undefined | null = carousel?.querySelector(
      "button[data-dot='0']"
    );
    if (!carousel || !firstDot) return;
    
    setTimeout(() => firstDot.click(), 300);    
  }

  return (
    <>
      <div
        id={id}
        class={clx("timelinecarousel flex flex-col-reverse", "w-full group relative")}
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
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(forceFirstTab),
        }}
      />
    </>
  );
}

export default TimeLineCarousel;
