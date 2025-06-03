import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import { getPropertyValue } from "../../sdk/getProperty.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  class?: string;
  variant?: "plp" | "pdp";
}

const WIDTH = 287*2;
const HEIGHT = 287*2;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
  class: _class,
  variant = "plp",
}: Props) {
  const { url, image: images, offers, isVariantOf } = product;
  const additionalProperty = isVariantOf?.additionalProperty;
  const title =
    (additionalProperty && getPropertyValue(additionalProperty, "Nome")) ??
    isVariantOf?.name ??
    product.name;
  const [front] = images ?? [];

  const { listPrice, price, availability } = useOffer(offers);
  const inStock = availability === "https://schema.org/InStock";
  const relativeUrl = relative(url);

  const designerValue =
    additionalProperty && getPropertyValue(additionalProperty, "Designer");

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

  {
    /* Add click event to dataLayer */
  }
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [item],
      },
    },
  });

  return (
    <div {...event} class={clx("card card-compact group text-sm", _class)}>
      <figure
        class={clx("relative bg-base-200", "rounded border border-transparent")}
        style={{ aspectRatio: ASPECT_RATIO }}
      >
        {/* Product Images */}
        <a
          href={relativeUrl?.split("?")[0]}
          aria-label="view product"
          class={clx(
            "absolute top-0 left-0",
            "grid grid-cols-1 grid-rows-1",
            "w-full",
            !inStock && "opacity-70"
          )}
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class={clx(
              "object-cover",
              "rounded w-full",
              "col-span-full row-span-full mix-blend-multiply"
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </a>
        {/* Wishlist button  */}
        <div class="absolute top-2 right-2 text-[#AAA]">
          <WishlistButton item={item} variant="icon" />
        </div>

      </figure>

      <a href={relativeUrl} class={clx(variant === "plp" ? "pt-4" : "pt-3", "flex flex-col")}>
        <span class={clx("text-h5Mobile uppercase", variant === "plp" && "md:text-h5")}>{title}</span>
        {designerValue && <span class="text-legend text-ui-800">by {designerValue}</span>}
      </a>

      <div class="flex-grow" />
    </div>
  );
}

export default ProductCard;