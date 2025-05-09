import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ProductImageZoom from "./ProductImageZoom.tsx";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const WIDTH = 1024;
const HEIGHT = 768;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();
  const zoomId = `${id}-zoom`;

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: {
      product: { name, isVariantOf, image: pImages },
    },
  } = props;

  // Filter images when image's alt text matches product name
  // More info at: https://community.shopify.com/c/shopify-discussions/i-can-not-add-multiple-pictures-for-my-variants/m-p/2416533
  const groupImages = isVariantOf?.image ?? pImages ?? [];
  const filtered = groupImages.filter(img =>
    name?.includes(img.alternateName || "")
  );
  const images = filtered.length > 0 ? filtered : groupImages;

  return (
    <>
      <div id={id} class="px-6 md:px-16">
        <div class="">
          <Slider class="carousel carousel-center gap-6 w-full">
            {images.map((img, index) => (
              <Slider.Item index={index} class="carousel-item w-full">
                <Image
                  class="w-full md:px-[98px] object-cover mix-blend-multiply"
                  sizes="(max-width: 640px) 100vw, 40vw"
                  style={{ aspectRatio: ASPECT_RATIO }}
                  src={img.url!}
                  alt={img.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </Slider.Item>
            ))}
          </Slider>

          <div class="flex relative gap-4 md:gap-0 justify-center md:justify-between">
            <div class="flex gap-4 items-center justify-center">
              <Slider.PrevButton
                class="no-animation disabled:opacity-50 w-12 h-12 flex items-center justify-center"
                disabled
              >
                <Icon id="seta-direita" size={32} class="rotate-180" />
              </Slider.PrevButton>

              <Slider.NextButton
                class="no-animation disabled:opacity-50 w-12 h-12 flex items-center justify-center"
                disabled={images.length < 2}
              >
                <Icon id="seta-direita" size={32} />
              </Slider.NextButton>
            </div>
            <label
              class="absolute sm:static bottom-[calc(100%+24px)] right-2 flex w-12 h-12 items-center justify-center cursor-pointer"
              for={zoomId}
            >
              <Icon id="icon-maximize" size={26} />
            </label>
          </div>
        </div>

        <Slider.JS rootId={id} />
      </div>
      <ProductImageZoom
        id={zoomId}
        images={images}
        width={700}
        height={Math.trunc((700 * HEIGHT) / WIDTH)}
      />
    </>
  );
}
