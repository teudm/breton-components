import Slider from "../../../../ui/Slider.tsx";
import { useDevice } from "@deco/deco/hooks";
import { CommonSlideProps, CoverSlideProps } from "../../types.ts";
import BretonVersatilityCoverItem from "./BretonVersatilityCoverItem.tsx";

export default function BretonVersatilityCover({
  desktopImage,
  mobileImage,
  title,
  type,
  label,
  preload,
  index,
}: CoverSlideProps & CommonSlideProps & { index: number }) {
  const device = useDevice();
  const isMobile = device === "mobile";

  return (
    <Slider.Item
      index={index}
      class="carousel-item w-full relative"
      style={{ maxWidth: isMobile ? "100%" : "auto" }}
    >
      <BretonVersatilityCoverItem
        mobileImage={mobileImage}
        desktopImage={desktopImage}
        lcp={index === 0 && preload}
      />
      <div
        class="absolute left-0 bottom-0 w-full py-[65px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%)",
        }}
      >
        <div class="container m-auto">
          <p class="text-h2 text-white">{title}</p>

          <p class="text-white text-sm font-light leading-normal tracking-wide mt-2 md:mb-[78px] max-md:mb-[32px]">
            {type}
          </p>
        </div>
      </div>
    </Slider.Item>
  );
}
