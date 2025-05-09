import Slider from "../../../../ui/Slider.tsx";
import { ProductSlideProps } from "../../types.ts";
import { useDevice, useScript } from "@deco/deco/hooks";
import { getProducts } from "./getProducts.tsx";
import VersatilityWishlistButton from "./VersatilityWishlistButton.tsx";

export default function BretonVersatilityProductSlide({
  title,
  products,
  index,
  id,
}: ProductSlideProps & { index: number; id: string }) {
  const device = useDevice();
  const isMobile = device === "mobile";

  const productsToShow = 5;
  const gap = 56;
  const minWidthEachCard = 176;
  const minWidthMob = productsToShow * (minWidthEachCard + gap);

  return (
    <>
      <Slider.Item
        index={index}
        class="carousel-item w-full relative items-center"
      >
        <div class="bg-base-100 w-full flex flex-col gap-[56px] md:py-[92px] max-md:pl-[56px] md:px-[120px] items-center">
          <div class="flex">
            <p class="text-h4">{title}</p>
          </div>
          <div class="overflow-x-auto w-full pb-1">
            <div
              class="flex h-full max-md:w-full"
              id={`productCard-${id}`}
              style={{ gap, minWidth: isMobile ? `${minWidthMob}px` : "auto" }}
            >
              {Array.from({ length: productsToShow }).map((_, i) => (
                <div
                  class="flex flex-col gap-3 relative min-w-[176px] max-md:w-[176px]"
                  key={i}
                >
                  <VersatilityWishlistButton id={id} />
                  <img
                    class="product-img mix-blend-multiply"
                    src="https://fakeimg.pl/800x600"
                    alt=""
                    width="800"
                    height="600"
                    style={{ aspectRatio: "calc(800 / 600)" }}
                  />
                  <div class="px-4 flex flex-col gap-1">
                    <p class="product-title text-h5Mobile leading-[16px] uppercase"></p>
                    <p class="product-author text-[#333333] text-[10px] font-normal leading-none tracking-wide"></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slider.Item>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(getProducts, products, id),
        }}
      />
    </>
  );
}
