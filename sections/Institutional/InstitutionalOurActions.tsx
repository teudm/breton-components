import type { ImageWidget, Color } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useDevice } from "@deco/deco/hooks";

/**
 * @titleBy alt
 */
export interface InstutionalOurActionsItemProps {
  /** @description desktop otimized image */
  desktop: ImageWidget;

  /** @description mobile otimized image */
  mobile: ImageWidget;

  /** @description Image's alt text */
  alt: string;

  /** @description Title */
  title?: string;

  /** @description Description */
  description?: string;

  /** @description Icon */
  icon?: ImageWidget;
}

export interface InstutionalOurActionsProps {
  images?: InstutionalOurActionsItemProps[];

  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;

  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;

  /** @title Title */
  title?: string;

  /** @title Subtitle */
  subtitle?: string;

  /** @title Background Color */
  backgroundColor?: Color;
}

function InstitutionalOurActionsItem({
  image,
  lcp,
}: {
  image: InstutionalOurActionsItemProps;
  lcp?: boolean;
}) {
  const { alt, mobile, desktop, description, title, icon } = image;

  return (
    <div
      aria-label={description}
      class="relative overflow-hidden w-full my-0 flex max-md:gap-12 md:gap-10 h-full max-md:flex-col"
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={312}
          height={385}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={400}
          height={496}
        />
        <img
          class="max-md:w-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
      <div class="max-md:max-w-[100%] md:max-w-[424px] flex flex-col justify-center">
        {icon && (
          <div class="mb-6">
            <Picture>
              <img
                loading={lcp ? "eager" : "lazy"}
                src={icon}
                alt={alt}
                width={52}
                height={62}
              />
            </Picture>
          </div>
        )}

        {title && (
          <div class="flex flex-col mb-4">
            <span class="text-black text-base font-semibold font-['F37 Neuro'] uppercase leading-normal tracking-[3.84px]">
              {title}
            </span>
          </div>
        )}

        {description && (
          <div>
            <span class="text-black text-sm font-light font-['F37 Neuro'] leading-normal tracking-wide">
              {description}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function InstitutionalOurActions({
  images = [],
  preload,
  interval,
  title,
  subtitle,
  backgroundColor,
}: InstutionalOurActionsProps) {
  const id = useId();
  const device = useDevice();
  const isMobile = device === "mobile";

  return (
    <div class="w-full relative max-md:pb-[400px]">
      <div
        class="w-full md:max-w-[50%] max-md:pb-[334px] max-md:pt-12 md:py-[284px] max-md:pl-6 md:pl-16"
        style={{ background: backgroundColor }}
      >
        <div class="max-w-[222px] flex flex-col gap-4">
          {subtitle && (
            <h5 class="text-[#fcf9f7] text-[10px] font-normal font-['F37 Neuro'] uppercase leading-none tracking-widest">
              {subtitle}
            </h5>
          )}

          {title && (
            <h4 class="text-[#fcf9f7] text-[24px] font-bold font-['F37 Neuro'] leading-[32px] tracking-[0.8px] uppercase">
              {title}
            </h4>
          )}
        </div>
      </div>

      <div
        id={id}
        class={clx(
          "flex min-h-[496px]",
          "sm:grid-cols-[112px_1fr_112px] sm:min-h-min",
          "w-full group absolute",
          "max-md:left-6 md:left-1/2 max-md:top-[176px] md:top-1/2"
        )}
        style={{
          maxHeight: isMobile ? "auto" : "calc(100% - 168px)",
          height: "100%",
          transform: isMobile ? "none" : "translate(-322px,-50%)",
          maxWidth: isMobile ? "calc(100% - 48px)" : "1002px",
        }}
      >
        <div class="col-span-full row-span-full flex max-w-[100%]">
          <Slider
            id="carouselCounter"
            class="carousel carousel-center w-full max-md:gap-1"
          >
            {images.map((image, index) => {
              let nameOfClass = "";

              return (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full transition-transform duration-500 ease-in-out"
                >
                  <InstitutionalOurActionsItem
                    image={image}
                    lcp={index === 0 && preload}
                    nameOfClass={nameOfClass}
                  />
                </Slider.Item>
              );
            })}
          </Slider>
        </div>

        <div class="flex items-center justify-start z-10 col-start-1 row-start-2 absolute max-md:-left-4 md:-left-6 max-md:top-[169px] md:top-1/2 md:-translate-y-1/2">
          <Slider.PrevButton
            class="btn btn-circle btn-sm w-[48px] h-[48px] bg-white text-black"
            disabled={false}
          >
            <Icon id="chevron-left" size={32} />
          </Slider.PrevButton>
        </div>

        <div class="flex items-center justify-end z-10 col-start-3 row-start-2 absolute max-md:-right-4 md:right-0 max-md:top-[169px] md:top-1/2 md:-translate-y-1/2">
          <Slider.NextButton
            class="btn btn-circle btn-sm w-[48px] h-[48px] text-black md:bg-transparent md:border-none md:shadow-none"
            disabled={false}
          >
            <Icon id="chevron-right" size={32} />
          </Slider.NextButton>
        </div>

        <ul
          class={clx(
            "col-span-full row-start-4 z-10",
            "carousel justify-center gap-3 md:hidden"
          )}
        >
          {images.map((_, index) => (
            <li class="carousel-item items-center">
              <Slider.Dot
                index={index}
                class={clx(
                  "bg-white opacity-20 h-[1px] w-[18px] no-animation",
                  "disabled:w-10 disabled:bg-white disabled:opacity-100 transition-[width]"
                )}
              ></Slider.Dot>
            </li>
          ))}
        </ul>

        <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
    </div>
  );
}
