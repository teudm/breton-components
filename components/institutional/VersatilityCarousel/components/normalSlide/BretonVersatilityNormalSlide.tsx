import { useDevice } from "@deco/deco/hooks";
import Slider from "../../../../ui/Slider.tsx";
import { CommonSlideProps } from "../../types.ts";

export default function BretonVersatilityNormalSlide({
  slides,
  index,
}: { slides: CommonSlideProps[] } & { index: number }) {
  const device = useDevice();
  const isMobile = device === "mobile";
  
  return (
    <>
      {slides.map((slide, i) => {
        const { desktopImage, mobileImage } = slide;
        const { image, alt, width, height } = isMobile ? mobileImage : desktopImage;
        return (
          <Slider.Item
            index={index + i}
            class="carousel-item w-full md:max-w-[70%]"
          >
            <div class="block w-full my-0 h-full">
              <img
                className="h-full object-cover max-md:w-full"
                loading="lazy"
                src={image}
                alt={alt}
                width={width}
                height={height}
              />
            </div>
          </Slider.Item>
        );
      })}
      ;
    </>
  );
}
