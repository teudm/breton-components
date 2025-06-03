import type { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "../../components/ui/SliderDesigner.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useDevice, useScript } from "@deco/deco/hooks";
import Image from "apps/website/components/Image.tsx";

/** @titleBy title */
interface ImageLink {
  title: string;
  text: string;
  image: ImageWidget;
  imageMobile: ImageWidget;
  thumb: ImageWidget;
  link?: string;
}

/**
 * @titleBy matcher
 */
export interface Banner {
  title?: string;
  imageLogo?: ImageWidget;
  images?: ImageLink[];
}

function BannerDesigner(props: Banner) {
  const device = useDevice();

  const id_slider_1 = useId();
  const id_slider_2 = useId();

  const { title, imageLogo, images } = props;

  if (!images) return null;

  const isMobile = device === "mobile";

  function dragSlide(id: string) {
    const slideSection = document.querySelector<HTMLElement>(`#${id} > div`);
    const prevArrow = document.getElementById(`${id}-prev`);
    const nextArrow = document.getElementById(`${id}-next`);
    if (!slideSection || !prevArrow || !nextArrow) return;

    const threshold = 50;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const start = (x: number) => {
      isDragging = true;
      startX = x;
      currentX = x;
    };

    const move = (x: number) => {
      if (!isDragging) return;
      currentX = x;
    };

    const end = () => {
      if (!isDragging) return;
      const diff = currentX - startX;
      if (Math.abs(diff) >= threshold) {
        (diff < 0 ? prevArrow : nextArrow).click();
      }
      isDragging = false;
      startX = 0;
      currentX = 0;
    };

    slideSection.addEventListener("mousedown", (e) => start(e.clientX));
    slideSection.addEventListener("mousemove", (e) => move(e.clientX));
    slideSection.addEventListener("mouseup", end);
    slideSection.addEventListener("mouseleave", end);

    slideSection.addEventListener("touchstart", (e) =>
      start(e.touches[0].clientX)
    );
    slideSection.addEventListener("touchmove", (e) =>
      move(e.touches[0].clientX)
    );
    slideSection.addEventListener("touchend", end);
  }

  return (
    <>
      <section
        class="BannerDesigner-slider relative container md:px-16 flex items-center md:mt-[150px] mt-[120px] flex-col"
        id="banner-designer"
      >
        <div class="w-full">
          <div class="relative">
            <img
              src={imageLogo}
              class="absolute z-10 md:top-[30px] top-[117px] md:left-0 left-[-140px] md:transform-none transform -rotate-90"
              alt={title}
            />

            <div id={id_slider_1} class="flex justify-end">
              <Slider class="carousel carousel-center gap-6 justify-end w-full aspect-[45/92] md:aspect-[17/10] overflow-hidden">
                {images?.map((img, index) => (
                  <Slider.Item
                    index={index}
                    class={clx(
                      "absolute carousel-item w-full md:max-w-[87.66%] h-full overflow-hidden gap-8 flex flex-col",
                      index === 0 && "active"
                    )}
                  >
                    <a href={img.link}>
                      <Image
                        class="w-full"
                        style={clx(
                          index === 0
                            ? "clip-path: inset(0 0 0 0);"
                            : index === 1
                            ? "clip-path: inset(0 100% 0 0);"
                            : index === images.length - 1 &&
                              "clip-path: inset(0 0 0 100%);"
                        )}
                        width={isMobile ? 360 : 1920}
                        src={isMobile ? img.imageMobile : img.image}
                        alt={img.title}
                        // Preload LCP image for better web vitals
                        preload={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </a>

                    <div class="absolute inset-0 text-center left-0 right-0 md:top-0 top-[30%] bottom-0 h-fit m-auto z-10 flex flex-col justify-center items-center md:gap-[40px] gap-[25px] md:w-[480px] w-[80%]">
                      {img?.title && (
                        <h3 class="capitalize font-normal md:text-[32px] text-[28px] text-white">
                          {img.title}
                        </h3>
                      )}
                      {img?.text && (
                        <p class="font-light md:text-[15px] text-[14px] text-white">
                          {img.text}
                        </p>
                      )}
                      {img?.link && (
                        <a
                          href={img?.link}
                          class="flex justify-center items-center w-[162px] h-[46px] uppercase font-medium text-[11px] text-white backdrop-blur-1xl border-white border tracking-widest backdrop-blur-[10px]"
                        >
                          ver produtos
                        </a>
                      )}
                    </div>
                  </Slider.Item>
                ))}
              </Slider>

              <Slider.PrevButton
                class="z-10 flex no-animation absolute md:left-[-40px] left-[15px] md:top-1/2 top-[35%] md:text-black text-white"
                disabled={images?.length < 2}
                id="banner-designer-prev"
              >
                <Icon id="chevron-right" class="rotate-180" />
              </Slider.PrevButton>

              <Slider.NextButton
                class="z-10 flex no-animation absolute md:right-[-40px] right-[15px] md:top-1/2 top-[35%] md:text-black text-white"
                disabled={images?.length < 2}
                id="banner-designer-next"
              >
                <Icon id="chevron-right" />
              </Slider.NextButton>
            </div>

            <div
              id={id_slider_2}
              class={`absolute z-10 md:top-[225px] top-[-30px] md:w-[22.73%] w-[55.56%] h-auto md:aspect-[280/360] aspect-[200/256] md:right-[auto] right-[15px] overflow-hidden`}
            >
              <Slider class={`carousel carousel-center gap-6 w-full h-full`}>
                {images?.map((img, index) => (
                  <Slider.Item
                    index={index}
                    class={clx(
                      "carousel-item w-full gap-8 flex flex-col",
                      index === 0 && "active"
                    )}
                  >
                    <a href={img.link}>
                      <Image
                        class="md:w-full"
                        style={clx(
                          index === 0
                            ? "clip-path: inset(0 0 0 0);"
                            : index === 1
                            ? "clip-path: inset(0 100% 0 0);"
                            : index === images.length - 1 &&
                              "clip-path: inset(0 0 0 100%);"
                        )}
                        src={img.thumb}
                        alt={img.title}
                        width={isMobile ? 200 : 280}
                        height={isMobile ? 256 : 360}
                        // Preload LCP image for better web vitals
                        preload={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </a>
                  </Slider.Item>
                ))}
              </Slider>
            </div>
          </div>

          <Slider.JS
            rootId={id_slider_1}
            syncWithId={id_slider_2}
            infinite={false}
            itemsToShow={1}
          />
          <Slider.JS
            rootId={id_slider_2}
            syncWithId={id_slider_1}
            infinite={false}
            itemsToShow={1}
          />
        </div>
      </section>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(dragSlide, "banner-designer"),
        }}
      />
    </>
  );
}

export default BannerDesigner;
