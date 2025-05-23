import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import Section from "../../components/ui/Section.tsx";
import { getPropertyValue } from "../../sdk/getProperty.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Icon from "../../components/ui/Icon.tsx";
import AddToCartButton from "../../components/product/AddToCartButton.tsx";
import Modal from "../../components/ui/Modal.tsx";
import { clx } from "../../sdk/clx.ts";
import Image from "apps/website/components/Image.tsx";
import ProductSelector from "../../components/product/ProductVariantSelector.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

function DetailsContent({ product }: { product: Product }) {
  const additionalProperty = product?.isVariantOf?.additionalProperty;

  if (!additionalProperty) return null;
  const cover = getPropertyValue(additionalProperty, "Capa");
  const name = getPropertyValue(additionalProperty, "Nome") || product.name;
  const hasCover = cover === "true";
  const item = mapProductToAnalyticsItem({ product });
  const [image] = product?.isVariantOf?.image ?? product?.image ?? [];
  const hasVariant = product?.isVariantOf?.hasVariant ?? [];

  return (
    <div class="flex flex-col justify-between p-6 md:py-16 md:pr-16 md:pl-12 h-full md:gap-12">
      <div class="flex flex-col gap-4 max-md:h-full">
        <div class="md:hidden">
          <Image
            class="w-1/2 mx-auto object-cover mix-blend-multiply"
            sizes="(max-width: 640px) 100vw, 40vw"
            style={{ aspectRatio: "150 / 176" }}
            src={image.url!}
            alt={image.alternateName}
            width={150}
            height={176}
            loading="lazy"
          />
        </div>
        <div class="hidden md:flex flex-col gap-2">
          <p class="uppercase text-caption">Seu produto do seu jeito</p>
          <h4 class="text-h4 uppercase">{name}</h4>
          <p class="text-contentMini text-ui-700 max-w-[480px]">
            Sinta-se à vontade para solicitar um orçamento deste produto
            diretamente pelo nosso site, nossos consultores vão receber seu
            pedido e entrar em contato.
          </p>
        </div>
        {hasVariant.length > 1 && (
          <div>
            <ProductSelector product={product} />
          </div>
        )}
      </div>
      <div class="flex flex-col gap-4">
        {hasCover && (
          <div class="bg-lines flex gap-4 py-2 pr-6 pl-4 text-ui-800 items-center cursor-pointer">
            <input
              type="checkbox"
              class="w-[22px] h-[22px] rounded-sm accent-primary"
              name="product-cover"
              id="product-cover"
            />
            <label for="product-cover" class="flex flex-col gap-1">
              <p class="text-contentMini">
                Este produto tem uma capa, deseja incluir?
              </p>
              <p class="text-legend max-md:hidden">
                * Incluindo a capa, a personalização de tecidos será
                desconsiderada.
              </p>
            </label>
          </div>
        )}
        <AddToCartButton
          product={product}
          seller="1"
          item={item}
          class="flex rounded-[2px] items-center justify-center gap-4 bg-black/80 hover:bg-black/75 transition duration-300 text-white uppercase text-button px-6 py-3"
          disabled={false}
        >
          <Icon id="icon-briefcase" size={24} />
          Solicitar orçamento
        </AddToCartButton>
        <span class="text-legend text-ui-500">
          Para mais opções de personalização,{" "}
          <a target="_blank" class="underline" href="https://wa.me/551140559707">
            fale com um de nossos consultores Breton.
          </a>
        </span>
      </div>
    </div>
  );
}

export default function ProductDetails({ page }: Props) {
  /**
   * Rendered when a not found is returned by any of the loaders run on this page
   */
  if (!page) return null;

  const { product } = page;
  const additionalProperty = product?.isVariantOf?.additionalProperty;

  if (!additionalProperty) return null;

  const item = mapProductToAnalyticsItem({ product });

  const cover = getPropertyValue(additionalProperty, "Capa");
  const hasCover = cover === "true";

  const hasVariant = product?.isVariantOf?.hasVariant ?? [];

  const hasPersonalization = hasCover || hasVariant.length > 1;

  return (
    <div class="flex max-md:flex-col max-md:gap-4">
      <div class="w-full md:max-w-[55%] group">
        <ImageGallerySlider page={page} />
      </div>
      <div class="hidden md:block md:w-[43.53%] bg-background-dark">
        <DetailsContent product={product} />
      </div>
      {hasPersonalization && (
        <Modal id="sku-selector">
          <div
            id="sku-selector-container"
            class={clx(
              "modal-box",
              "p-0",
              "rounded-none",
              "relative flex flex-col-reverse md:flex-row",
              "w-full md:w-[85.29%] max-w-7xl max-h-full md:max-h-[calc(100vh-5em)] h-full"
            )}
          >
            <label
              for="sku-selector"
              class="absolute w-12 h-12 flex items-center justify-center top-2 right-2 md:top-7 md:right-7 cursor-pointer"
            >
              <Icon id="icon-close" />
            </label>
            <DetailsContent product={product} />
          </div>
        </Modal>
      )}
      <div class="container md:hidden flex-col">
        {hasPersonalization ? (
          <label
            class="btn btn-ghost border border-black flex items-center justify-center gap-4 text-button uppercase"
            for="sku-selector"
          >
            <Icon id="icon-filter" size={24} />
            Personalize seu produto
          </label>
        ) : (
          <>
            <AddToCartButton
              product={product}
              seller="1"
              item={item}
              class="flex rounded-[2px] items-center justify-center gap-4 bg-black/80 hover:bg-black/75 transition duration-300 text-white uppercase text-button px-6 py-3"
              disabled={false}
            >
              <Icon id="icon-briefcase" size={24} />
              Solicitar orçamento
            </AddToCartButton>
            <span class="text-legend text-ui-500">
              Para mais opções de personalização,{" "}
              <a target="_blank" class="underline" href="https://wa.me/551140559707">
                fale com um de nossos consultores Breton.
              </a>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="680px" />;
