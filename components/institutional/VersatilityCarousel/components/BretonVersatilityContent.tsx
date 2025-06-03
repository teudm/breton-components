import Slider from "../../../ui/Slider.tsx";
import { PlaceProps } from "../types.ts";
import BretonVersatilityCover from "./cover/BretonVersatilityCover.tsx";
import BretonVersatilityHistory from "./history/BretonVersatilityHistory.tsx";
import Icon from "../../../ui/Icon.tsx";
import { clx } from "../../../../sdk/clx.ts";
import BretonVersatilityNormalSlide from "./normalSlide/BretonVersatilityNormalSlide.tsx";
import BretonVersatilityProductSlide from "./productSlide/BretonVersatilityProductSlide.tsx";
import { useDevice, useScript } from "@deco/deco/hooks";

export default function BretonVersatilityContent({
  places,
  id,
}: {
  places: PlaceProps[];
  id: string;
}) {
  const device = useDevice();
  const isMobile = device === "mobile";
  const productSlideIndex = 2 + places[0].normalSlide.length;

  return (
    <div class="flex-col flex" id={id}>
      {places.map((place, index) => (
        <div
          class={`place-type-${place.type.toLowerCase()} carousel-places col-span-full row-span-full flex relative items-center justify-center`}
          id={`${id}-${index}`}
        >
          <Slider
            id="carouselCounter"
            class="carousel w-full max-md:gap-1 scroll-smooth duration-[8s] transition-transform ease-in-out md:max-h-[53.53vw] md:overflow-y-hidden md:gap-4"
          >
            <BretonVersatilityCover
              {...place.cover}
              type={place.type}
              preload
              index={0}
            />
            <BretonVersatilityHistory {...place.history} index={1} />
            <BretonVersatilityNormalSlide
              slides={place.normalSlide}
              index={2}
            />
            {place.productsSlide.active && (
              <BretonVersatilityProductSlide
                {...place.productsSlide}
                index={productSlideIndex}
                id={`${id}-${index}`}
              />
            )}
          </Slider>

          <div class="absolute top-0 w-full h-full z-10 left-0 pointer-events-none flex justify-center">
            <Slider.PrevButton
              class={clx(
                "flex items-center justify-center btn-circle btn-sm w-[48px] h-[48px]",
                "disabled:hidden pointer-events-auto flex",
                "text-[#EEEEEE] bg-white text-black",
                "max-md:top-[calc(100%-80px)] md:top-1/2",
                "max-md:left-[calc(50%-56px)] md:left-[24px]",
                "md:-translate-y-1/2 peer absolute peer/next"
              )}
            >
              <Icon id="chevron-left" size={32} />
            </Slider.PrevButton>

            <Slider.NextButton
              id={`nextButton-${id}-${index}`}
              class={clx(
                "flex items-center justify-center btn-circle btn-sm text-black pointer-events-auto ",
                "size-12",
                "bg-white ",
                "absolute right-0 max-md:top-[calc(100%-80px)] md:top-1/2",
                "md:-translate-x-[24px] md:-translate-y-1/2",
                "disabled:hidden",
                "max-md:right-[calc(50%-56px)]",
                "max-md:peer-disabled:hidden"
              )}
              disabled={false}
            >
              <Icon id="chevron-right" size={32} />
            </Slider.NextButton>

            <button
              hx-on:click={useScript((id, index) => {
                const nextButton: HTMLButtonElement | null =
                  document.querySelector(`#nextButton-${id}-${index}`);
                if (nextButton) nextButton.click()
              }, id, index)}
              class={clx(
                "btn btn-circle btn-sm text-black justify-center pointer-events-auto peer-disabled:border-none",
                "peer-disabled:size-auto",
                "peer-disabled:bg-transparent",
                "absolute",
                "peer-disabled:right-auto peer-disabled:left-auto md:peer-disabled:bottom-[65px] peer-disabled:top-auto",
                "peer-disabled:-translate-x-[24px] md:-translate-y-1/2",
                "peer-disabled:translate-x-0 peer-disabled:translate-y-0",
                "peer-disabled:[&>svg]:hidden [&>span]:hidden peer-disabled:[&>span]:flex",
                "disabled:hidden peer-disabled:w-full peer-disabled:container peer-disabled:justify-start",
                "max-md:right-[calc(50%-56px)]",
                "max-md:disabled:hidden",
                "hidden peer-disabled:flex",
                `${
                  isMobile
                    ? "peer-disabled:right-0 peer-disabled:top-1/2 peer-disabled:bottom-[24px]"
                    : ""
                }`
              )}
              disabled={false}
            >
              <Icon id="chevron-right" size={32} />
              <span class="w-[138px] h-[46px] rounded-[1px] backdrop-blur-[20px] text-button text-white border border-white flex items-center justify-center">
                {place.cover.label}
              </span>
            </button>

            <Slider.Dot
              index={0}
              class={clx(
                "transition-[width] block peer-disabled/next:hidden",
                "absolute right-6 top-6 z-10 pointer-events-auto",
                "p-3 bg-background rounded-full"
              )}
            >
              <Icon id="institutional-slide-close" />
            </Slider.Dot>
          </div>
          <Slider.JS rootId={`${id}-${index}`} />
        </div>
      ))}
    </div>
  );
}
