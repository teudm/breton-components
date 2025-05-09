import { ProductDetailsPage } from "apps/commerce/types.ts";
import { Swiper } from "npm:swiper";
import { useScript } from "@deco/deco/hooks";
import { Head } from "$fresh/runtime.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const handleSwiper = () => {
  const swiper = new Swiper("#product-swiper", {
    loop: false,
    spaceBetween: 16,
    slidesPerView: 1.02,
    centeredSlides: true,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  console.log(swiper);
}

export default function ProductSwiper({ page }: Props) {
  /**
   * Rendered when a not found is returned by any of the loaders run on this page
   */
  if (!page) return null;

  const { product } = page;

  const additionalProperty = product?.isVariantOf?.additionalProperty;

  if (!additionalProperty) return null;

  const sliderImages = additionalProperty
    .find(item => item.name === "Slider PDP")
    ?.value?.split(";");

  if (!sliderImages) return null;

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />

        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
      </Head>
      <div id="product-swiper" class="relative overflow-hidden">
        <div class="swiper-wrapper">
          {sliderImages.map((image, index) => (
            <div class="swiper-slide" key={index}>
              <img src={image} alt="" class="h-full w-full object-cover aspect-[161/100]" />
            </div>
          ))}
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(handleSwiper) }}
      />
    </>
  );
}
