import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;

  /** @description mobile otimized image */
  mobile: ImageWidget;

  /** @description Image's alt text */
  alt: string;

  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title: string;
    /** @description Button label */
    label: string;
  };
}

export interface Props {
  images?: Banner[];

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

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const { alt, mobile, desktop, action } = image;
  const params = { promotion_name: image.alt };

  const selectPromotionEvent = useSendEvent({
    on: "click",
    event: { name: "select_promotion", params },
  });

  const viewPromotionEvent = useSendEvent({
    on: "view",
    event: { name: "view_promotion", params },
  });

  return (
    <a
      {...selectPromotionEvent}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative block overflow-hidden w-full my-0 md:mb-4"
    >
      <Picture preload={lcp} {...viewPromotionEvent}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={360}
          height={800}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1360}
          height={800}
        />
        <img
          class="w-full object-cover md:group-hover:scale-110 duration-3000 ease-in-out"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
      {action && (
        <div
          class={clx(
            "absolute left-0 bottom-0",
            "px-4 pb-16 md:px-[141px] md:pb-[104px]",
            "flex flex-col",
            "h-fit w-full justify-end items-center",
            "bg-carousel-gradient",
          )}
        >
          <span class="mb-8 md:mb-10 text-h2Mobile md:text-h1 text-white text-center">
            {action.title}
          </span>
          <button
            class="btn btn-neutral btn-outline uppercase text-button w-fit px-[23px] font-medium"
            aria-label={action.label}
          >
            {action.label}
          </button>
        </div>
      )}
    </a>
  );
}

function Carousel({ images = [], preload, interval }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class={clx(
        "grid",
        "grid-rows-[1fr_32px_1fr_64px]",
        "grid-cols-[32px_1fr_32px] min-h-[660px]",
        "sm:grid-cols-[112px_1fr_112px] sm:min-h-min",
        "w-full group",
      )}
    >
      <div id="main-banner" class="col-span-full row-span-full flex">
        <Slider class="carousel carousel-center w-full gap-6">
          {images.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem image={image} lcp={index === 0 && preload} />
            </Slider.Item>
          ))}
        </Slider>
      </div>

      <div class="flex items-center justify-start mx-4 z-10 col-start-1 row-start-2">
        <Slider.PrevButton
          class="btn btn-neutral btn-ghost btn-circle btn-sm w-[48px] h-[48px] text-[#EEEEEE]"
          disabled={false}
        >
          <Icon id="chevron-left" size={32} />
        </Slider.PrevButton>
      </div>

      <div class="flex items-center justify-end mx-4 z-10 col-start-3 row-start-2">
        <Slider.NextButton
          class="btn btn-neutral btn-ghost btn-circle btn-sm w-[48px] h-[48px] text-[#EEEEEE]"
          disabled={false}
        >
          <Icon id="chevron-right" size={32} />
        </Slider.NextButton>
      </div>

      <ul
        class={clx(
          "col-span-full row-start-4 z-10",
          "carousel justify-center gap-3",
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

      <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default Carousel;
