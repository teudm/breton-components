import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useDevice } from "@deco/deco/hooks";

/**
 * @titleBy alt
 */
export interface InstitutionalBanner {
  /** @description desktop otimized image */
  desktop: ImageWidget;

  /** @description mobile otimized image */
  mobile: ImageWidget;

  /** @description Image's alt text */
  alt: string;

  /** @description when user clicks on the image, go to this link */
  href?: string;

  /** @description Description */
  description?: string;
}

export interface InstutionalCarouselProps {
  images?: InstitutionalBanner[];

  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;

  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function InstutionalBannerItem({
  image,
  lcp,
  nameOfClass,
}: {
  image: InstitutionalBanner;
  lcp?: boolean;
  nameOfClass?: string;
}) {
  
  const { alt, mobile, desktop, href, description } = image;

  return (
    <a
      href={href ?? "#"}
      aria-label={description}
      class="relative block overflow-hidden w-full my-0 h-fit"
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={360}
          height={560}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1360}
          height={727}
        />
        <img
          className={`w-full object-cover ${nameOfClass}`}
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
      {description && (
        <div
          class={clx(
            "absolute left-0 bottom-0",
            "max-md:px-6 md:px-[141px] pb-[42px]",
            "flex flex-col",
            "h-fit w-full justify-end items-center"
          )}
        >
          <span class="text-center p-4 bg-[#ffffff8f] backdrop-blur-[10px] max-w-[360px] text-[10px] font-normal tracking-[0.8px] leading-[16px]">
            {description}
          </span>
        </div>
      )}
    </a>
  );
}

export default function InstitutionalCarousel({
  images = [],
  preload,
  interval,
}: InstutionalCarouselProps) {

  const id = useId();
  const device = useDevice();
  const isMobile = device === "mobile";

  return (
    <div
      id={id}
      class={clx(
        "grid",
        "grid-rows-[1fr_32px_1fr_64px]",
        "grid-cols-[0px_1fr_0px] min-h-[560px]",
        "sm:grid-cols-[0px_1fr_0px] sm:min-h-min",
        "w-full group"
      )}
    >
      <div class="col-span-full row-span-full flex">
        <Slider id="carouselCounter" class="carousel carousel-center w-full max-md:gap-1">
          {images.map((image, index) => {
            let nameOfClass = "";

            return (
              <Slider.Item
                index={index}
                class="carousel-item w-full transition-transform duration-500 ease-in-out"
                style={{ maxWidth: isMobile ? "calc(100% - 12px)" : "auto" }}
              >
                <InstutionalBannerItem
                  image={image}
                  lcp={index === 0 && preload}
                  nameOfClass={nameOfClass}
                />
              </Slider.Item>
            );
          })}
        </Slider>
      </div>

      <div class="flex items-center justify-start mx-4 z-10 col-start-1 row-start-2 max-md:hidden">
        <Slider.PrevButton
          class="btn btn-circle btn-sm w-[48px] h-[48px] text-[#EEEEEE] bg-white text-black"
          disabled={false}
        >
          <Icon id="chevron-left" size={32} />
        </Slider.PrevButton>
      </div>

      <div class="flex items-center justify-end mx-4 z-10 col-start-3 row-start-2 max-md:hidden">
        <Slider.NextButton
          class="btn btn-circle btn-sm w-[48px] h-[48px] text-[#EEEEEE] bg-white text-black"
          disabled={false}
        >
          <Icon id="chevron-right" size={32} />
        </Slider.NextButton>
      </div>
      
      <ul
        class={clx(
          "col-span-full row-start-4 z-10",
          "carousel justify-center gap-3 md:hidden",
        )}
      >
        {images.map((_, index) => (
          <li class="carousel-item items-center">
            <Slider.Dot
              index={index}
              class={clx(
                "bg-white opacity-20 h-[1px] w-[18px] no-animation",
                "disabled:w-10 disabled:bg-white disabled:opacity-100 transition-[width]",
              )}
            >
            </Slider.Dot>
          </li>
        ))}
      </ul>

      <Slider.JS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}