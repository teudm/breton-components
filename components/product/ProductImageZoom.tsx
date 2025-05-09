import type { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Modal from "../../components/ui/Modal.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  id?: string;
  width: number;
  height: number;
  images: ImageObject[];
}

function ProductImageZoom({ images, width, height, id = useId() }: Props) {
  const container = `${id}-container`;

  return (
    <Modal id={id}>
      <div
        id={container}
        class={clx(
          "modal-box",
          "p-0",
          "rounded-none",
          "relative flex flex-col-reverse md:flex-row",
          "w-full md:w-[85.29%] max-w-7xl max-h-full md:max-h-[calc(100vh-5em)] h-full"
        )}
      >
        <label
          for={id}
          class="absolute w-12 h-12 flex items-center justify-center top-2 right-2 md:top-7 md:right-7 cursor-pointer"
        >
          <Icon id="icon-close" />
        </label>
        {/* Dots */}
        <div class="relative">
          <div
            class={clx(
              "md:w-[280px] w-full h-full",
              "border-t md:border-t-none md:border-r border-lines",
              "overflow-auto bg-background-dark hide-scrollbar",
              "text-center"
            )}
          >
            <ul
              class={clx(
                "carousel carousel-center",
                "sm:carousel-vertical",
                "gap-2 p-4 md:py-14",
                "max-w-full",
                "overflow-x-auto",
                "sm:overflow-y-auto"
              )}
            >
              {images.map((img, index) => (
                <li class="carousel-item w-[95px] h-[112px] md:w-[146px] md:h-[172px]">
                  <Slider.Dot index={index}>
                    <Image
                      class="group-disabled:border-lines group-disabled:border object-contain w-full h-full mix-blend-multiply"
                      width={width}
                      height={height}
                      src={img.url!}
                      alt={img.alternateName}
                    />
                  </Slider.Dot>
                </li>
              ))}
            </ul>
          </div>
          <Slider.PrevButton
            class="no-animation hidden absolute right-[calc(50%-24px)] top-2 disabled:opacity-50 w-12 h-12 md:flex items-center justify-center"
            disabled
          >
            <Icon id="seta-direita" size={32} class="-rotate-90" />
          </Slider.PrevButton>

          <Slider.NextButton
            class="no-animation hidden absolute right-[calc(50%-24px)] bottom-2 disabled:opacity-50 w-12 h-12 md:flex items-center justify-center"
            disabled={images.length < 2}
          >
            <Icon id="seta-direita" size={32} class="rotate-90" />
          </Slider.NextButton>
        </div>

        {/* Image Slider */}
        <div class="md:w-1/2 flex m-auto justify-center items-center h-full">
          <Slider class="carousel col-span-full col-start-1 row-start-1 row-span-full h-full md:mx-2.5">
            {images.map((image, index) => (
              <Slider.Item
                index={index}
                class="carousel-item justify-center items-center w-full relative h-fit my-auto"
              >
                <div class="py-16 h-fit overflow-hidden">
                  <input
                    class="hidden"
                    type="radio"
                    name={`zoom-${index}`}
                    id={`clear-zoom-${index}`}
                    defaultChecked
                  />
                  <input
                    class="hidden peer"
                    type="radio"
                    name={`zoom-${index}`}
                    id={`zoom-${index}`}
                  />
                  <Image
                    style={{ aspectRatio: `${width} / ${height}` }}
                    src={image.url!}
                    alt={image.alternateName}
                    width={width}
                    height={height}
                    class="h-auto w-full mix-blend-multiply peer-checked:scale-150 transition duration-300"
                  />
                </div>
                <div class="absolute flex items-center justify-center w-full top-[calc(100%+3px)]">
                  <label for={`zoom-${index}`} class="w-8 h-8 cursor-pointer">
                    <Icon id="icon-plus" size={32} />
                  </label>
                  <label
                    for={`clear-zoom-${index}`}
                    class="w-8 h-8 cursor-pointer"
                  >
                    <Icon id="icon-less" size={32} />
                  </label>
                </div>
              </Slider.Item>
            ))}
          </Slider>
        </div>

        <Slider.JS rootId={container} />
      </div>
    </Modal>
  );
}

export default ProductImageZoom;
